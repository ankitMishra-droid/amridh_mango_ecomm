import React from 'react';
import { useAppSelector } from '../../store';
import { TrendingUp, ShoppingBag, Package, Users } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export default function Dashboard() {
  const { products, orders, status } = useAppSelector(state => state.admin);

  if (status === 'loading') {
    return <div className="p-8">Loading dashboard metrics...</div>;
  }

  const stats = [
    { label: 'Total Revenue', value: formatPrice(orders.reduce((acc, o) => acc + o.total, 0)), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-orange-600' },
    { label: 'Low Stock Items', value: products.filter(p => p.stock < 20).length, icon: Users, color: 'text-red-600' },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <s.icon className={`h-8 w-8 ${s.color} mb-4`} />
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{s.label}</p>
            <p className="text-3xl font-black mt-1 text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
