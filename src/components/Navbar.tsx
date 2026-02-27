import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProductOpen, setIsProductOpen] = React.useState(false);
  const navigate = useNavigate();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const productCategories = [
    { name: 'Mango Jam', path: '/shop?cat=Jam' },
    { name: 'Mango Cubes', path: '/shop?cat=Cubes' },
    { name: 'Mango Juice', path: '/shop?cat=Beverages' },
    { name: 'Mango Pulp', path: '/shop?cat=Pulp' },
    { name: 'Mango Pickle', path: '/shop?cat=Pickles' },
    { name: 'Papad', path: '/shop?cat=Papad' },
  ];

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-orange-500 fill-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                Amridh Mango
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium text-sm">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-orange-600 font-medium text-sm">About Us</Link>
            
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsProductOpen(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 font-medium text-sm"
              >
                <span>Mango Product</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <div 
                onMouseLeave={() => setIsProductOpen(false)}
                className={cn(
                  "absolute top-full left-0 w-48 bg-white border border-orange-50 shadow-xl rounded-2xl py-2 transition-all duration-200 transform origin-top",
                  isProductOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                )}
              >
                {productCategories.map((cat) => (
                  <Link 
                    key={cat.name}
                    to={cat.path}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setIsProductOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/bulk-booking" className="text-gray-600 hover:text-orange-600 font-medium text-sm">Bulk Booking</Link>
            <Link to="/corporate-gifting" className="text-gray-600 hover:text-orange-600 font-medium text-sm">Corporate Gifting</Link>
            <Link to="/contact" className="text-gray-600 hover:text-orange-600 font-medium text-sm">Contact Us</Link>
            
            <div className="h-6 w-px bg-gray-200 mx-2" />

            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-orange-600">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-orange-600">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </Link>
                  <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-orange-100 px-4 pt-2 pb-6 space-y-2">
          <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>About Us</Link>
          <div className="py-2">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Mango Products</p>
            <div className="grid grid-cols-2 gap-2">
              {productCategories.map(cat => (
                <Link key={cat.name} to={cat.path} className="text-sm text-gray-600 py-1" onClick={() => setIsOpen(false)}>{cat.name}</Link>
              ))}
            </div>
          </div>
          <Link to="/bulk-booking" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Bulk Booking</Link>
          <Link to="/corporate-gifting" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Corporate Gifting</Link>
          <Link to="/contact" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Contact Us</Link>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <Link to="/cart" className="text-gray-600" onClick={() => setIsOpen(false)}>Cart ({cartCount})</Link>
            {user ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-600">Logout</button>
            ) : (
              <Link to="/login" className="text-orange-600 font-bold" onClick={() => setIsOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
