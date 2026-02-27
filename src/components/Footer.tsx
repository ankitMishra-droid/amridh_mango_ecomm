import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-orange-500 fill-orange-500" />
              <span className="text-2xl font-bold text-white">Amridh Mango</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Bringing the world's finest organic mangoes directly from our orchards to your table. 
              Sustainability and quality in every bite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Shop All</Link></li>
              <li><Link to="/wholesale" className="hover:text-orange-500 transition-colors">Wholesale</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Categories</h4>
            <ul className="space-y-4">
              <li><Link to="/shop?cat=Fresh" className="hover:text-orange-500 transition-colors">Fresh Mangoes</Link></li>
              <li><Link to="/shop?cat=Pickle" className="hover:text-orange-500 transition-colors">Mango Pickles</Link></li>
              <li><Link to="/shop?cat=Pulp" className="hover:text-orange-500 transition-colors">Mango Pulp</Link></li>
              <li><Link to="/shop?cat=Gifts" className="hover:text-orange-500 transition-colors">Gift Boxes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
                <span>Ratnagiri Orchards, Maharashtra, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <span>+91 93208 52653</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <span>hello@amridhmango.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Amridh Mango. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
