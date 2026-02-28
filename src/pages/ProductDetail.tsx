import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, Leaf, ChevronRight, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Product) => p.id === Number(id));
        if (found) {
          setProduct(found);
          // Filter related products by category, excluding current product
          const related = data.filter((p: Product) => p.category === found.category && p.id !== found.id).slice(0, 4);
          setRelatedProducts(related);
        }
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link to="/shop" className="text-orange-600 font-bold hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const displayPrice = user?.role === 'wholesale' ? product.wholesale_price : product.price;

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (product.stock <= 0) {
      toast.error('Out of stock!');
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/shop" className="hover:text-orange-600">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-100 shadow-2xl"
          >
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-white text-gray-900 px-8 py-3 rounded-full font-black text-xl uppercase tracking-widest">Sold Out</span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="text-orange-600 font-black uppercase tracking-widest text-sm mb-2 block">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  <span className="ml-2 text-gray-600 font-bold">4.9 (120 Reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <span className={product.stock > 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-baseline space-x-4">
                <p className="text-4xl font-black text-gray-900">{formatPrice(displayPrice)}</p>
                {user?.role === 'wholesale' && (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Wholesale Price</span>
                )}
              </div>
            </div>

            <div className="prose prose-orange max-w-none mb-10">
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Experience the authentic taste of summer with our premium {product.name}. 
                Sourced directly from our certified organic orchards, each fruit is hand-picked 
                to ensure the highest quality, sweetness, and aroma. Perfect for direct consumption, 
                desserts, or as a healthy snack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl">
                <Leaf className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-bold text-gray-700">100% Organic</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl">
                <Truck className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-bold text-gray-700">Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl">
                <ShieldCheck className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-bold text-gray-700">Quality Check</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-orange-900/20 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-6 w-6" />
                <span>Add to Cart</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`flex-1 border-2 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${isInWishlist(product.id) ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-900 hover:bg-gray-50'}`}
              >
                <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Related Suggestions</h2>
                <p className="text-gray-600">Customers who bought this also liked these.</p>
              </div>
              <Link to="/shop" className="text-orange-600 font-bold flex items-center hover:underline">
                View All <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
