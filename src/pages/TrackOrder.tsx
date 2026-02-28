import React, { useState } from 'react';
import { Package, Search, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        id: orderId,
        status: 'In Transit',
        estimatedDelivery: 'March 5, 2026',
        currentLocation: 'Mumbai Distribution Center',
        history: [
          { status: 'Order Placed', date: 'Feb 28, 2026, 10:00 AM', completed: true },
          { status: 'Packed & Ready', date: 'Feb 28, 2026, 02:30 PM', completed: true },
          { status: 'Shipped', date: 'March 1, 2026, 09:00 AM', completed: true },
          { status: 'In Transit', date: 'March 1, 2026, 04:15 PM', completed: false },
          { status: 'Out for Delivery', date: 'Pending', completed: false },
          { status: 'Delivered', date: 'Pending', completed: false },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 rounded-full bg-orange-100 mb-6">
          <Truck className="h-10 w-10 text-orange-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Enter your order ID to get real-time updates on your mango delivery. 
          You can find the order ID in your confirmation email.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-orange-50">
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g., #AM-12345)" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none text-lg"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {trackingData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-50"
          >
            <div className="bg-orange-600 p-8 text-white">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-orange-100 text-sm font-bold uppercase tracking-widest mb-1">Order Status</p>
                  <h2 className="text-3xl font-black">{trackingData.status}</h2>
                </div>
                <div className="text-right">
                  <p className="text-orange-100 text-sm font-bold uppercase tracking-widest mb-1">Estimated Delivery</p>
                  <p className="text-2xl font-bold">{trackingData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center space-x-4 mb-10 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="p-3 rounded-full bg-white shadow-sm">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Current Location</p>
                  <p className="text-gray-900 font-bold">{trackingData.currentLocation}</p>
                </div>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[1.35rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {trackingData.history.map((step: any, index: number) => (
                  <div key={index} className="flex items-start space-x-6 relative z-10">
                    <div className={`p-2 rounded-full ${step.completed ? 'bg-orange-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                      {step.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className={`font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
