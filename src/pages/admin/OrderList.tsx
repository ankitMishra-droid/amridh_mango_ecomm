import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateOrderStatus } from '../../store/adminSlice';
import { formatPrice } from '../../lib/utils';
import { Clock, PackageCheck, Truck, CheckCircle } from 'lucide-react';

export default function OrderList() {
  const { orders, status } = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();

  if (status === 'loading') {
    return <div className="p-8">Loading orders...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Placed': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Packed': return <PackageCheck className="h-5 w-5 text-blue-500" />;
      case 'Shipped': return <Truck className="h-5 w-5 text-purple-500" />;
      case 'Delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Order Management</h1>
        <p className="text-gray-500 mt-1">Track and update customer order statuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-3xl border border-gray-200">
            No orders found yet.
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-black text-lg">Order #{order.id}</p>
                  <p className="text-sm text-gray-500 font-medium">{order.user_name || 'Customer'}</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  {getStatusIcon(order.status)}
                  <select 
                    value={order.status}
                    onChange={(e) => dispatch(updateOrderStatus({ orderId: order.id, status: e.target.value }))}
                    className="text-sm font-bold bg-transparent border-none focus:ring-0 cursor-pointer outline-none text-gray-700"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="space-y-3 mb-6">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate pr-4">{item.quantity}x {item.name}</span>
                      <span className="font-bold whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(order.created_at || Date.now()).toLocaleDateString()}</p>
                <p className="font-black text-xl text-orange-600">{formatPrice(order.total)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
