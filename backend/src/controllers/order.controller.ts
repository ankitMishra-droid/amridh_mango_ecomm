import { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export class OrderController {
  public static async createOrder(req: any, res: Response): Promise<void> {
    try {
      const { items, shippingData, paymentMethod } = req.body;
      const userId = req.user.id;
      const total = items.reduce((s: number, i: any) => s + i.quantity * i.price, 0);
      
      const user = await User.findById(userId);

      const order = new Order({
        user_id: userId,
        total,
        items,
        user_name: user?.name,
        shippingData,
        paymentMethod
      });

      await order.save();

      for (const item of items) {
        await Product.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
      }

      res.json({ id: order._id, total });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  public static async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders.map(o => ({
        id: o._id,
        user_id: o.user_id,
        total: o.total,
        status: o.status,
        items: o.items,
        user_name: o.user_name
      })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  public static async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;
      await Order.findByIdAndUpdate(req.params.id, { status });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order status' });
    }
  }
}
