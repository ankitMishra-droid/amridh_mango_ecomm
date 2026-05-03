import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAdminData } from '../../store/adminSlice';

import Dashboard from './Dashboard';
import ProductList from './ProductList';
import OrderList from './OrderList';
import UserManagement from './UserManagement';

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

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block relative z-10">
        <div className="p-6">
          <h2 className="text-xl font-black text-gray-900">Seller Central</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="users" element={<UserManagement />} />
        </Routes>
      </main>
    </div>
  );
}
