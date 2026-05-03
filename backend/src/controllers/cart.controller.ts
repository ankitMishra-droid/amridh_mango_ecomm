import { Request, Response } from 'express';
import { Cart } from '../models/Cart.js';

export class CartController {
  public static async getCart(req: any, res: Response): Promise<void> {
    try {
      const items = await Cart.find({ user_id: req.user.id }).populate('product_id');
      res.json(items.map((i: any) => ({
        id: i.product_id._id,
        quantity: i.quantity,
        name: i.product_id.name,
        price: i.product_id.price,
        image_url: i.product_id.image_url
      })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  }

  public static async addToCart(req: any, res: Response): Promise<void> {
    try {
      const { productId, quantity } = req.body;
      await Cart.findOneAndUpdate(
        { user_id: req.user.id, product_id: productId },
        { quantity },
        { upsert: true, new: true }
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add to cart' });
    }
  }

  public static async removeFromCart(req: any, res: Response): Promise<void> {
    try {
      await Cart.findOneAndDelete({ user_id: req.user.id, product_id: req.params.productId });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove from cart' });
    }
  }
}
