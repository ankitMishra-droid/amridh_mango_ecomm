import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import BulkBooking from './pages/BulkBooking';
import CorporateGifting from './pages/CorporateGifting';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import TrackOrder from './pages/TrackOrder';
import Checkout from './pages/Checkout';
import { FaWhatsapp } from 'react-icons/fa';
import Events from './pages/Events';
import PrivacyPolicy from './pages/Privacypolicy';
import TermsOfService from './pages/Termsofservice';
import { GuestRoute, AuthRoute, CustomerRoute, AdminRoute } from './components/RouteGuards';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-orange-50/20">
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <main className={`flex-grow ${isAdminRoute ? '' : 'pt-16 lg:pt-20'}`}>
        <Routes>
          <Route path="/" element={<CustomerRoute><Home /></CustomerRoute>} />
          <Route path="/shop" element={<CustomerRoute><Shop /></CustomerRoute>} />
          <Route path="/product/:id" element={<CustomerRoute><ProductDetail /></CustomerRoute>} />
          <Route path="/cart" element={<CustomerRoute><Cart /></CustomerRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
          <Route path="/admin/user_admin" element={<GuestRoute><AdminLogin /></GuestRoute>} />
          <Route path="/admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>} />
          <Route path="/about" element={<CustomerRoute><About /></CustomerRoute>} />
          <Route path="/bulk-booking" element={<CustomerRoute><BulkBooking /></CustomerRoute>} />
          <Route path="/corporate-gifting" element={<CustomerRoute><CorporateGifting /></CustomerRoute>} />
          <Route path="/contact" element={<CustomerRoute><Contact /></CustomerRoute>} />
          <Route path="/wishlist" element={<CustomerRoute><Wishlist /></CustomerRoute>} />
          <Route path="/track-order" element={<CustomerRoute><TrackOrder /></CustomerRoute>} />
          <Route path="/checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
          <Route path="/events" element={<CustomerRoute><Events /></CustomerRoute>} />
          <Route path="/privacy-policy" element={<CustomerRoute><PrivacyPolicy /></CustomerRoute>} />
          <Route path="/terms-of-service" element={<CustomerRoute><TermsOfService /></CustomerRoute>} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && (
        <Link
          to="https://wa.me/917021489372"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <FaWhatsapp size={28} />
        </Link>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <AppContent />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}
