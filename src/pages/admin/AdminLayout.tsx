import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAdminData } from '../../store/adminSlice';

import AdminNavbar from './AdminNavbar';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import OrderList from './OrderList';
import UserManagement from './UserManagement';
import AdminProfile from './AdminProfile';

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (user?.role === 'admin' && status === 'idle') {
      dispatch(fetchAdminData());
    }
  }, [user, status, dispatch]);

  if (user?.role !== 'admin') {
    return <div className="p-20 text-center text-2xl font-bold">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      
      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="profile" element={<AdminProfile />} />
        </Routes>
      </main>
    </div>
  );
}
