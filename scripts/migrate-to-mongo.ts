import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../backend/src/config/env.js';
import { connectDB } from '../backend/src/db/database.js';
import { Product } from '../backend/src/models/Product.js';

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret
});

const migrate = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const productsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'products.json'), 'utf-8'));

    for (const prod of productsData) {
      console.log(`Processing product: ${prod.name}`);
      let uploadedUrl = '';
      const localImagePath = path.join(process.cwd(), 'public', prod.image_url);
      
      if (fs.existsSync(localImagePath)) {
        console.log(`Uploading image ${localImagePath} to Cloudinary...`);
        const result = await cloudinary.uploader.upload(localImagePath, {
          folder: 'amirdh_mango'
        });
        uploadedUrl = result.secure_url;
        console.log(`Uploaded to Cloudinary: ${uploadedUrl}`);
      } else {
        console.log(`Local image not found: ${localImagePath}`);
      }

      // Generate a random SKU
      const sku = 'SKU-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const newProduct = new Product({
        name: prod.name,
        category: prod.category,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        sku: sku,
        image_url: uploadedUrl,
        images: uploadedUrl ? [uploadedUrl] : []
      });

      await newProduct.save();
      console.log(`Saved product ${prod.name} to MongoDB.\n`);
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
