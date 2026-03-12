import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import BulkBooking from './pages/BulkBooking';
import CorporateGifting from './pages/CorporateGifting';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import TrackOrder from './pages/TrackOrder';
import Checkout from './pages/Checkout';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Events from './pages/Events';
import PrivacyPolicy from './pages/Privacypolicy';
import Privacypolicy from './pages/Privacypolicy';
import ShippingPolicy from './pages/Shippingpolicy';
import Shippingpolicy from './pages/Shippingpolicy';
import TermsOfService from './pages/Termsofservice';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-orange-50/20">
              <Navbar />
              {/* ensures any navigation resets scroll position */}
              <ScrollToTop />
              <main className="flex-grow pt-16 lg:pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/bulk-booking" element={<BulkBooking />} />
                  <Route path="/corporate-gifting" element={<CorporateGifting />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/privacy-policy" element={<Privacypolicy />} />
                  <Route path="/shipping-policy" element={<Shippingpolicy />} />
                  <Route path="/terms-services" element={<TermsOfService />} />
                </Routes>
              </main>
              <Footer />
              <Link
                to="https://wa.me/917021489372"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
              >
                <FaWhatsapp size={28} />
              </Link>
              <Toaster position="bottom-right" />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
