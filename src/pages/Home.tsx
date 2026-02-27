import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Truck, ShieldCheck, Leaf, Gift, ChevronLeft, ChevronRight, Star, Quote, Zap, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1920",
    title: "The King of Fruits, Delivered.",
    subtitle: "Premium Ratnagiri Alphonso mangoes, hand-picked for perfection.",
    accent: "Alphonso"
  },
  {
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1920",
    title: "Saffron Sweetness in Every Bite.",
    subtitle: "Authentic Kesar mangoes from the sun-drenched orchards of Gujarat.",
    accent: "Kesar"
  },
  {
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=1920",
    title: "Summer's Best Kept Secret.",
    subtitle: "Discover our exclusive collection of organic mango treats and preserves.",
    accent: "Organic"
  }
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Wholesale Partner",
    text: "The quality of Alphonso mangoes from Amridh is unmatched. My customers keep coming back for more. The wholesale pricing is very competitive.",
    avatar: "https://i.pravatar.cc/150?u=rajesh"
  },
  {
    name: "Ananya Sharma",
    role: "Retail Customer",
    text: "I've never tasted mango pulp so fresh! It feels like I'm eating the fruit directly. The packaging was excellent and delivery was on time.",
    avatar: "https://i.pravatar.cc/150?u=ananya"
  },
  {
    name: "Vikram Singh",
    role: "Corporate Client",
    text: "We ordered 50 gift boxes for our employees. The presentation was premium and the feedback from our team was fantastic. Highly recommended for gifting.",
    avatar: "https://i.pravatar.cc/150?u=vikram"
  }
];

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)));

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const nextTestimonial = () => setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Slider */}
      <section className="relative h-[85vh] overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-6">
                {HERO_SLIDES[currentSlide].accent} Collection
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/shop" 
                  className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all flex items-center group shadow-xl shadow-orange-900/20"
                >
                  Explore Shop
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/bulk-booking" 
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Bulk Orders
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 right-10 flex space-x-4 z-20">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-10 flex space-x-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentSlide === i ? "w-8 bg-orange-500" : "w-4 bg-white/30"
              )}
            />
          ))}
        </div>
      </section>

      {/* Our Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide a comprehensive range of mango-related services tailored for every need.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Globe, 
              title: "Pan-India Delivery", 
              desc: "We ship our fresh harvests to every corner of India with temperature-controlled logistics.",
              color: "bg-blue-50 text-blue-600"
            },
            { 
              icon: Zap, 
              title: "Express Wholesale", 
              desc: "Dedicated supply chain for retailers and distributors with guaranteed fresh inventory.",
              color: "bg-yellow-50 text-yellow-600"
            },
            { 
              icon: Heart, 
              title: "Custom Gifting", 
              desc: "Personalized corporate and wedding gift boxes featuring our finest mango assortments.",
              color: "bg-red-50 text-red-600"
            }
          ].map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6", s.color)}>
                <s.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Seasonal Favorites</h2>
            <p className="text-gray-600">Our most popular picks this week.</p>
          </div>
          <Link to="/shop" className="text-orange-600 font-bold flex items-center hover:underline">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="bg-orange-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">What Our Lovers Say</h2>
            <div className="flex justify-center space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="bg-white p-12 md:p-16 rounded-[3rem] shadow-xl text-center relative"
              >
                <Quote className="absolute top-10 left-10 h-12 w-12 text-orange-100" />
                <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-10 italic leading-relaxed">
                  "{TESTIMONIALS[currentTestimonial].text}"
                </p>
                <div className="flex flex-col items-center">
                  <img 
                    src={TESTIMONIALS[currentTestimonial].avatar} 
                    alt={TESTIMONIALS[currentTestimonial].name}
                    className="w-20 h-20 rounded-full border-4 border-orange-100 mb-4"
                  />
                  <h4 className="text-xl font-bold text-gray-900">{TESTIMONIALS[currentTestimonial].name}</h4>
                  <p className="text-orange-600 font-bold text-sm uppercase tracking-wider">{TESTIMONIALS[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-12">
              <button onClick={prevTestimonial} className="p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-orange-600 transition-all">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-12">
              <button onClick={nextTestimonial} className="p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-orange-600 transition-all">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Mango Club Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full translate-x-32 -translate-y-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-x-32 translate-y-32 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-orange-500 font-black uppercase tracking-widest text-sm mb-6 block">Exclusive Community</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8">Join the Mango Club</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Be the first to know about seasonal harvests, limited varieties, and exclusive member-only discounts. 
              Get <span className="text-orange-500 font-bold">10% OFF</span> your first order today!
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="px-8 py-5 rounded-2xl text-gray-900 w-full sm:w-96 focus:ring-4 focus:ring-orange-500/50 outline-none text-lg"
              />
              <button className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/40">
                Subscribe Now
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
