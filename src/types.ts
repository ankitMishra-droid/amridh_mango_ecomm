export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  wholesale_price: number;
  stock: number;
  description: string;
  image_url: string;
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
  id: number;
  user_id: number;
  user_name?: string;
  total: number;
  status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered';
  created_at: string;
  items: CartItem[];
}

export interface Coupon {
  id: number;
  code: string;
  discount_percent: number;
}
