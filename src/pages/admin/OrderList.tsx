import React, { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateOrderStatus } from '../../store/adminSlice';
import { formatPrice } from '../../lib/utils';
import { Clock, PackageCheck, Truck, CheckCircle, Search, Filter, Eye, X, MapPin, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderList() {
  const { orders, status } = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        (order.id || order._id)?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user_name || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  if (status === 'loading') {
    return <div className="p-8">Loading orders...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Placed': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Packed': return <PackageCheck className="h-4 w-4 text-blue-500" />;
      case 'Shipped': return <Truck className="h-4 w-4 text-purple-500" />;
      case 'Delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Placed': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Packed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Order Management</h1>
        <p className="text-gray-500 mt-1">Track, process, and update customer order statuses.</p>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-wrap">
        <div className="flex flex-1 max-w-md items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID & Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items Summary</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => (
                  <tr key={order.id || order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 truncate max-w-[120px]">#{order.id || order._id}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{new Date(order.created_at || order.createdAt || Date.now()).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{order.user_name || 'Guest User'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{order.items?.length || 0} item(s)</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[150px]">
                        {order.items?.map((i: any) => i.name).join(', ')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-orange-600">{formatPrice(order.total)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select 
                          value={order.status}
                          onChange={(e) => dispatch(updateOrderStatus({ orderId: order.id || order._id, status: e.target.value }))}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none transition-colors ${getStatusColor(order.status)}`}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                        title="View Order Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Order Details</h2>
                  <p className="text-sm text-gray-500">#{selectedOrder.id || selectedOrder._id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <h3 className="font-bold text-gray-900">Shipping Information</h3>
                    </div>
                    {selectedOrder.shippingData ? (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-bold text-gray-800">{selectedOrder.shippingData.firstName} {selectedOrder.shippingData.lastName}</p>
                        <p>{selectedOrder.shippingData.address}</p>
                        <p>{selectedOrder.shippingData.city}, {selectedOrder.shippingData.state} {selectedOrder.shippingData.zipCode}</p>
                        <p>{selectedOrder.shippingData.phone}</p>
                        <p>{selectedOrder.shippingData.email}</p>
                      </div>
                    ) : selectedOrder.user_id?.email ? (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-bold text-gray-800">{selectedOrder.user_id.name || selectedOrder.user_name}</p>
                        <p>{selectedOrder.user_id.email}</p>
                        <p>{selectedOrder.user_id.phone}</p>
                        <p className="text-gray-400 italic mt-2">Detailed address not provided.</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No shipping data available.</p>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <h3 className="font-bold text-gray-900">Payment & Status</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Method:</span>
                        <span className="font-bold uppercase">{selectedOrder.paymentMethod || 'Razorpay'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Status:</span>
                        <span className={`font-bold uppercase ${selectedOrder.paymentStatus === 'Completed' ? 'text-green-600' : selectedOrder.paymentStatus === 'Pending' ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {selectedOrder.paymentStatus || 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-bold">{new Date(selectedOrder.created_at || selectedOrder.createdAt || Date.now()).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-500">Status:</span>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(selectedOrder.status)}
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-4">Ordered Items</h3>
                <div className="space-y-3 mb-6">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <PackageCheck className="h-6 w-6 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{formatPrice(item.price)} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-black text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center p-5 bg-orange-50 rounded-2xl border border-orange-100">
                  <span className="font-bold text-orange-900">Total Amount</span>
                  <span className="font-black text-2xl text-orange-600">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
