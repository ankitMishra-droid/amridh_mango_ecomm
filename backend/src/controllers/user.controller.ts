import { Request, Response } from 'express';
import { User } from '../models/User.js';

export class UserController {
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search } = req.query;
      
      const query: any = {};
      if (search) {
        const searchRegex = { $regex: search as string, $options: 'i' };
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { phone: searchRegex }
        ];
        
        if (/^[0-9a-fA-F]{24}$/.test(search as string)) {
          query.$or.push({ _id: search });
        }
      }

      if (!req.query.paginate) {
        const users = await User.find(query).select('-password -reset_token -reset_expires_at').sort({ createdAt: -1 });
        res.json(users);
        return;
      }

      const options = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        sort: { createdAt: -1 },
        select: '-password -reset_token -reset_expires_at'
      };

      const result = await (User as any).paginate(query, options);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  public static async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;
      
      const existing = await User.findOne({ email });
      if (existing) {
        res.status(400).json({ error: 'Email already in use' });
        return;
      }

      const user = new User({
        name,
        email,
        phone,
        password, // Should be hashed by the model's pre-save hook
        role: 'admin'
      });

      await user.save();
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create admin user' });
    }
  }

  public static async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      
      if (!['admin', 'customer'].includes(role)) {
        res.status(400).json({ error: 'Invalid role' });
        return;
      }

      const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user role' });
    }
  }

  public static async updateUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      // Ensure we don't duplicate email if someone else has it
      if (email) {
        const existing = await User.findOne({ email, _id: { $ne: id } });
        if (existing) {
          res.status(400).json({ error: 'Email already in use by another user' });
          return;
        }
      }

      const user = await User.findByIdAndUpdate(
        id, 
        { name, email, phone }, 
        { new: true, runValidators: true }
      ).select('-password');
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user info' });
    }
  }

  // Profile endpoints for the logged-in user
  public static async updateOwnProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { name, email, phone, password } = req.body;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const updateData: any = { name, email, phone };
      if (password && password.trim().length >= 6) {
        updateData.password = password; // Pre-save hook will hash this if needed
      }

      if (email) {
        const existing = await User.findOne({ email, _id: { $ne: userId } });
        if (existing) {
          res.status(400).json({ error: 'Email already in use by another user' });
          return;
        }
      }

      const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  public static async addAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await User.findById(userId).select('-password');
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const addressData = req.body;
      
      // If this is the first address, make it default
      if (!user.addresses || user.addresses.length === 0) {
        addressData.isDefault = true;
      } else if (addressData.isDefault) {
        // If this is set as default, unset others
        user.addresses.forEach(a => a.isDefault = false);
      }

      if (!user.addresses) user.addresses = [];
      user.addresses.push(addressData);

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add address' });
    }
  }

  public static async updateAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { addressId } = req.params;
      
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await User.findById(userId).select('-password');
      if (!user || !user.addresses) {
        res.status(404).json({ error: 'User or addresses not found' });
        return;
      }

      const addressIndex = user.addresses.findIndex(a => a._id?.toString() === addressId);
      if (addressIndex === -1) {
        res.status(404).json({ error: 'Address not found' });
        return;
      }

      const addressData = req.body;
      
      if (addressData.isDefault) {
        user.addresses.forEach(a => a.isDefault = false);
      }

      // Update fields
      const oldAddress = user.addresses[addressIndex];
      user.addresses[addressIndex] = {
        ...oldAddress.toObject(),
        ...addressData,
        _id: oldAddress._id // preserve ID
      } as any;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update address' });
    }
  }

  public static async deleteAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { addressId } = req.params;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await User.findById(userId).select('-password');
      if (!user || !user.addresses) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const addressIndex = user.addresses.findIndex(a => a._id?.toString() === addressId);
      if (addressIndex === -1) {
        res.status(404).json({ error: 'Address not found' });
        return;
      }

      const wasDefault = user.addresses[addressIndex].isDefault;
      user.addresses.splice(addressIndex, 1);

      // If we deleted the default address, make the first remaining one default
      if (wasDefault && user.addresses.length > 0) {
        user.addresses[0].isDefault = true;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete address' });
    }
  }

  public static async setDefaultAddress(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { addressId } = req.params;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await User.findById(userId).select('-password');
      if (!user || !user.addresses) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      let found = false;
      user.addresses.forEach(a => {
        if (a._id?.toString() === addressId) {
          a.isDefault = true;
          found = true;
        } else {
          a.isDefault = false;
        }
      });

      if (!found) {
        res.status(404).json({ error: 'Address not found' });
        return;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to set default address' });
    }
  }
}
