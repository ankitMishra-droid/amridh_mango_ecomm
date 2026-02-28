import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle, ChevronRight, MapPin, Phone, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link to="/shop" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all">
          Go to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] shadow-2xl p-12 border border-orange-50"
        >
          <div className="inline-flex p-6 rounded-full bg-green-100 mb-8">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Your order has been placed successfully. We've sent a confirmation email to <strong>{formData.email}</strong>.
          </p>
          <div className="bg-orange-50 p-6 rounded-3xl mb-10 border border-orange-100">
            <p className="text-orange-800 font-bold text-lg mb-2">Order ID: #AM-{(Math.random() * 100000).toFixed(0)}</p>
            <p className="text-orange-600 text-sm font-medium uppercase tracking-widest">Estimated Delivery: 3-5 Business Days</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/track-order" className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20">
              Track Order
            </Link>
            <Link to="/" className="bg-white text-gray-900 border-2 border-gray-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Checkout Form */}
        <div className="flex-grow lg:w-2/3">
          <div className="flex items-center space-x-4 mb-10">
            <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 flex-grow rounded-full ${step >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2rem] shadow-xl p-8 border border-orange-50"
              >
                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-orange-600" />
                  <span>Shipping Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Full Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">State</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-10 bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2rem] shadow-xl p-8 border border-orange-50"
              >
                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                  <span>Payment Method</span>
                </h2>
                
                <div className="space-y-4 mb-10">
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'cod' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-orange-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'cod' && <div className="h-3 w-3 rounded-full bg-orange-600" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-500">Pay when your mangoes arrive</p>
                      </div>
                    </div>
                    <Truck className="h-6 w-6 text-orange-600" />
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('online')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'online' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'online' ? 'border-orange-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'online' && <div className="h-3 w-3 rounded-full bg-orange-600" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Online Payment</p>
                        <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking</p>
                      </div>
                    </div>
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-900 py-5 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="flex-[2] bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-6 w-6" />
                        <span>Place Order (₹{total.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-orange-50 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-16 w-16 rounded-xl object-cover border border-gray-100"
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.quantity} x ₹{item.price.toLocaleString()}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="text-orange-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-3 text-xs text-gray-500 bg-gray-50 p-4 rounded-2xl">
              <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p>Your transaction is secure and encrypted. We respect your privacy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
