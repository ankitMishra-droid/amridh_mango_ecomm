import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { formatPrice } from '../lib/utils';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    if (user) {
      fetch(`/api/orders/user/${user.id}`)
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Placed': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Packed': return <Package className="h-5 w-5 text-orange-500" />;
      case 'Shipped': return <Truck className="h-5 w-5 text-purple-500" />;
      case 'Delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-sm mb-12">
        <h1 className="text-3xl font-black mb-2">Hello, {user?.name}!</h1>
        <p className="text-gray-600">Manage your orders and account settings.</p>
        <div className="mt-6 flex gap-4">
          <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            {user?.role} Account
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">My Orders</h2>
      <div className="space-y-6">
        {orders.length > 0 ? orders.map(order => (
          <div key={order.id} className="bg-white p-8 rounded-3xl border border-orange-50 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID: #{order.id}</p>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-6 py-2 rounded-full">
                {getStatusIcon(order.status)}
                <span className="font-bold">{order.status}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl">
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-gray-50 rounded-3xl">
            <p className="text-gray-500">No orders placed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
