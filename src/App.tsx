import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-orange-50/20">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<About />} />
                <Route path="/bulk-booking" element={<div className="py-20 text-center"><h1>Bulk Booking Page Coming Soon</h1></div>} />
                <Route path="/corporate-gifting" element={<div className="py-20 text-center"><h1>Corporate Gifting Page Coming Soon</h1></div>} />
                <Route path="/contact" element={<div className="py-20 text-center"><h1>Contact Us Page Coming Soon</h1></div>} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
