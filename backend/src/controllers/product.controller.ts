import { Request, Response } from 'express';
import { Product } from '../models/Product.js';

export class ProductController {
  public static async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search, category, stockFilter } = req.query;
      
      const query: any = {};
      if (search) {
        const searchRegex = { $regex: search as string, $options: 'i' };
        query.$or = [
          { name: searchRegex },
          { sku: searchRegex }
        ];
      }
      if (category && category !== 'All') {
        query.category = category;
      }
      if (stockFilter) {
        if (stockFilter === 'inStock') query.stock = { $gt: 0 };
        else if (stockFilter === 'outOfStock') query.stock = 0;
        else if (stockFilter === 'lowStock') query.stock = { $gt: 0, $lt: 10 };
      }

      const options = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        sort: { createdAt: -1 }
      };

      // Ensure paginate is available on Product model
      const result = await (Product as any).paginate(query, options);

      // Return array if frontend expects array directly (for backward compatibility), or paginated object
      // Let's return the docs directly if the frontend is simple, but we should return the paginated result
      // The frontend currently expects an array in Shop.tsx: fetch('/api/products').then(data => setProducts(data))
      // So for backward compatibility on standard endpoint:
      if (!req.query.paginate) {
          const allProducts = await Product.find(query).sort({ createdAt: -1 });
          res.json(allProducts.map(p => ({
            id: p._id,
            name: p.name,
            category: p.category,
            description: p.description,
            price: p.price,
            stock: p.stock,
            sku: p.sku,
            image_url: p.image_url,
            images: p.images,
            status: p.status
          })));
          return;
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  public static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, category, description, price, stock, sku, image_url, images = [], status } = req.body;
      const product = new Product({ name, category, description, price, stock, sku, image_url, images, status });
      await product.save();
      res.json({ id: product._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  public static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, category, description, price, stock, sku, image_url, images = [], status } = req.body;
      await Product.findByIdAndUpdate(req.params.id, { name, category, description, price, stock, sku, image_url, images, status });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  public static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}
