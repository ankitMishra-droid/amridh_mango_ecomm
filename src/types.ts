export interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  wholesale_price?: number;
  stock: number;
  description?: string;
  image_url?: string;
  sku?: string;
  status?: 'Available' | 'Coming Soon' | 'Sold Out';
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'wholesale';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number | string;
  user_id: string | number;
  user_name?: string;
  total: number;
  status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered' | string;
  created_at: string;
  items: CartItem[];
  shippingData?: any;
  paymentMethod?: string;
  paymentStatus?: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount_percent: number;
}
