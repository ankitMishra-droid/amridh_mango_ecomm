import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Home, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logos/amirdh-logo.png';
import { AnimatePresence, motion } from 'motion/react';

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center gap-4">
                <img src={logo} alt="Amirdh Logo" className="h-8 object-contain" />
                <span className="font-black text-gray-900 hidden sm:block border-l pl-4 border-gray-200">Admin Panel</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4 items-center">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Link 
                to="/" 
                className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Store
              </Link>
              <div className="border-l border-gray-200 h-6 mx-2"></div>
              <div className="flex items-center gap-3">
                <Link to="/admin/profile" className="flex items-center gap-3 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer group">
                  <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs group-hover:bg-orange-200 transition-colors">
                    {user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{user?.name || 'Admin'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-lg z-40"
          >
            <div className="pt-2 pb-4 space-y-1 px-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block pl-3 pr-4 py-3 rounded-xl text-base font-bold ${
                      isActive
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
              
              <div className="border-t border-gray-100 mt-4 pt-4">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block pl-3 pr-4 py-3 rounded-xl text-base font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-3" />
                    Return to Store
                  </div>
                </Link>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full text-left block pl-3 pr-4 py-3 rounded-xl text-base font-bold text-red-500 hover:bg-red-50"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
