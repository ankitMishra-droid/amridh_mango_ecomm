import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Info } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { user } = useAuth();

  const displayPrice = user?.role === 'wholesale' ? product.wholesale_price : product.price;

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Out of stock!');
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-50 hover:shadow-xl transition-all group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.stock < 20 && product.stock > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Low Stock
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-xs font-bold ml-1">4.9</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-xl font-black text-gray-900">{formatPrice(displayPrice)}</p>
            {user?.role === 'wholesale' && (
              <p className="text-[10px] text-orange-600 font-bold uppercase">Wholesale Price</p>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={cn(
              "p-3 rounded-xl transition-all",
              product.stock > 0 
                ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
