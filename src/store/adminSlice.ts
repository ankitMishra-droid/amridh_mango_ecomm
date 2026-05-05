import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, Order } from '../types';
import toast from 'react-hot-toast';

export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'customer';
  name?: string;
  phone?: string;
  createdAt: string;
}

interface AdminState {
  products: Product[];
  orders: Order[];
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminState = {
  products: [],
  orders: [],
  users: [],
  status: 'idle',
  error: null,
};

export const fetchAdminData = createAsyncThunk(
  'admin/fetchAdminData',
  async (_, { rejectWithValue }) => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders', { headers: { 'Authorization': `Bearer ${localStorage.getItem('mango_token')}` } }),
        fetch('/api/users', { headers: { 'Authorization': `Bearer ${localStorage.getItem('mango_token')}` } })
      ]);
      
      const products = await productsRes.json();
      const ordersData = await ordersRes.json();
      const orders = Array.isArray(ordersData) ? ordersData : [];
      
      const usersData = await usersRes.json();
      const users = Array.isArray(usersData) ? usersData : [];
      
      return { products, orders, users };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveProduct = createAsyncThunk(
  'admin/saveProduct',
  async ({ id, data, isAdding }: { id?: number | string, data: any, isAdding: boolean }, { rejectWithValue }) => {
    try {
      const method = isAdding ? 'POST' : 'PUT';
      const url = isAdding ? '/api/products' : `/api/products/${id}`;
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mango_token')}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to save product');
      const responseData = await res.json();
      return isAdding ? { id: responseData.id, ...data } : { id, ...data };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('mango_token')}` }
      });
      if (!res.ok) throw new Error('Failed to delete product');
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status }: { orderId: number, status: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mango_token')}`
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      return { orderId, status };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }: { userId: string, role: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mango_token')}`
        },
        body: JSON.stringify({ role })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update role');
      }
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'admin/updateUserInfo',
  async ({ userId, data }: { userId: string, data: any }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mango_token')}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update user info');
      }
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.orders = action.payload.orders;
        state.users = action.payload.users;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        const product = action.payload;
        const index = state.products.findIndex(p => p.id === product.id);
        if (index >= 0) {
          state.products[index] = product;
        } else {
          state.products.push(product);
        }
        toast.success('Product saved successfully');
      })
      .addCase(saveProduct.rejected, (state, action) => {
        toast.error('Error saving product');
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
        toast.success('Product deleted');
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
          order.status = status as any;
        }
        toast.success('Status updated');
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(u => u._id === updatedUser._id);
        if (index >= 0) state.users[index] = updatedUser;
        toast.success('User role updated');
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        toast.error((action.payload as string) || 'Error updating user role');
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(u => u._id === updatedUser._id);
        if (index >= 0) state.users[index] = updatedUser;
        toast.success('User info updated');
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        toast.error((action.payload as string) || 'Error updating user info');
      });
  }
});

export default adminSlice.reducer;
