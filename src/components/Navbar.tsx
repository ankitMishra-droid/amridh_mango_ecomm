import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, LogOut, Menu, X, Leaf, ChevronDown, Heart, Truck, Home, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../lib/utils';
import logo from '../assets/logos/amirdh-logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProductOpen, setIsProductOpen] = React.useState(false);
  const navigate = useNavigate();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const productCategories = [
    // { name: 'Mango Jam', path: '/shop?cat=Jam' },
    { name: 'Mango Cubes', path: '/shop?cat=Cubes' },
    { name: 'Mango Juice', path: '/shop?cat=Beverages' },
    { name: 'Mango Pulp', path: '/shop?cat=Pulp' },
    { name: 'Mango Pickle', path: '/shop?cat=Pickles' },
    // { name: 'Papad', path: '/shop?cat=Papad' },
  ];

  return (
    <>
      {/* Desktop Header - Full Width Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden lg:block w-full bg-white/80 backdrop-blur-xl border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            {/* <div className="bg-orange-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform"> */}
              {/* <Leaf className="h-5 w-5 text-white fill-white" /> */}
            {/* </div> */}
            {/* <span className="text-xl font-black tracking-tighter text-gray-900">
              AMRIDH
            </span> */}
            <img src={logo} alt="Amridh Logo" width={120} height={40} className="object-contain" />
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest transition-colors">Home</Link>

            <Link to="/about" className="text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest transition-colors">About Us</Link>

            <div className="relative group">
              <button
                onMouseEnter={() => setIsProductOpen(true)}
                className="flex items-center space-x-1 text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
              >
                <span>Products</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              <AnimatePresence>
                {isProductOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    onMouseLeave={() => setIsProductOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white/95 backdrop-blur-md border border-orange-50 shadow-2xl rounded-2xl py-2 overflow-hidden"
                  >
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        className="block px-4 py-2 text-xs font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        onClick={() => setIsProductOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/bulk-booking" className="text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest transition-colors">Bulk</Link>
            <Link to="/corporate-gifting" className="text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest transition-colors">Gifting</Link>
            <Link to="/track-order" className="text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 transition-colors">
              <Truck className="h-3 w-3" />
              <span>Track</span>
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-orange-600 font-bold text-[10px] uppercase tracking-widest transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Link to="/wishlist" className="relative p-2 text-gray-500 hover:text-orange-600 transition-colors">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-orange-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-orange-600 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-600 text-white px-8 py-2.5 rounded-full font-bold hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 text-[10px] uppercase tracking-widest"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Header - Full Width Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden w-full bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <div className="px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Amridh Logo" className="h-10 w-24" />
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-orange-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-orange-600 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-orange-500 fill-orange-500" />
                  <span className="text-xl font-bold">Amridh Menu</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/about" className="p-4 bg-orange-50 rounded-2xl text-orange-700 font-bold text-center" onClick={() => setIsOpen(false)}>About Us</Link>
                  <Link to="/contact" className="p-4 bg-orange-50 rounded-2xl text-orange-700 font-bold text-center" onClick={() => setIsOpen(false)}>Contact</Link>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mango Products</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {productCategories.map(cat => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        className="p-3 border border-gray-100 rounded-xl text-sm text-gray-600 hover:bg-orange-50 hover:border-orange-200 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/bulk-booking" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl" onClick={() => setIsOpen(false)}>
                    <span className="font-medium">Bulk Booking</span>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                  <Link to="/track-order" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl" onClick={() => setIsOpen(false)}>
                    <span className="font-medium">Track Order</span>
                    <Truck className="h-4 w-4" />
                  </Link>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-2">
                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-tighter">{user.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                        className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full py-4 bg-orange-600 text-white text-center font-bold rounded-2xl shadow-lg shadow-orange-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login / Register
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
