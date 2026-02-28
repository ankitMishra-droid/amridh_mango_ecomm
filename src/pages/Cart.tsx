import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);

  const applyCoupon = async () => {
    try {
      const res = await fetch(`/api/coupons/${couponCode}`);
      if (res.ok) {
        const data = await res.json();
        setDiscount(data.discount_percent);
        toast.success(`Coupon applied! ${data.discount_percent}% off`);
      } else {
        toast.error('Invalid coupon code');
      }
    } catch (e) {
      toast.error('Error applying coupon');
    }
  };

  const finalTotal = total * (1 - discount / 100);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some delicious mangoes to get started!</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-6 bg-white p-6 rounded-3xl border border-orange-50 shadow-sm">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-2xl"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-orange-600 font-bold">{formatPrice(user?.role === 'wholesale' ? item.wholesale_price : item.price)}</p>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-orange-600">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-orange-600">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-600">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-orange-50 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Discount ({discount}%)</span>
                  <span>-{formatPrice(total * (discount / 100))}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-xl font-black">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <button 
                onClick={applyCoupon}
                className="w-full py-3 rounded-2xl border-2 border-orange-600 text-orange-600 font-bold hover:bg-orange-50 transition-colors"
              >
                Apply Coupon
              </button>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all flex items-center justify-center group"
            >
              Checkout
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
