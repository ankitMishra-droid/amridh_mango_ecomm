import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Truck, ShieldCheck, Leaf, Gift, ChevronLeft, ChevronRight, Star, Quote, Zap, Heart, Globe, Sun, CrossIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';

const HERO_SLIDES = [
  {
    image: "/images/Banner1.png",
    productImg: "/images/Banner-Img-1.png", // Pulp can/jar
    title: "Enjoy the rich aroma and golden sweetness of real Alphonso Mango Pulp",
    subtitle: "Experience the pure essence of Ratnagiri's finest mangoes in every spoonful.",
    accent: "Premium Pulp",
    bgColor: "from-yellow-400 via-orange-500 to-orange-600"
  },
  {
    image: "/images/bnnr-image-2.png",
    productImg: "/images/Banner-Img-2.png", // Fresh mangoes
    title: "Saffron Sweetness in Every Bite of Authentic Kesar Mangoes",
    subtitle: "Hand-picked from the sun-drenched orchards of Gujarat for your delight.",
    accent: "Fresh Harvest",
    bgColor: "from-orange-400 via-orange-500 to-yellow-500"
  },
  {
    image: "/images/image.png",
    productImg: "/images/Banner-Img-3.png ", // Juice
    title: "Refreshing Natural Mango Juice for the Perfect Summer Cool-down",
    subtitle: "100% natural, cold-pressed juice with no added preservatives.",
    accent: "Pure Juice",
    bgColor: "from-yellow-300 via-yellow-500 to-orange-500"
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
    // allow a different backend host in production (e.g. Netlify env var)
    // simply fetch via `/api`; Netlify will rewrite to the function.
    const base = process.env.REACT_APP_API_URL || '';
    const url = base ? `${base}/api/products` : '/api/products';

    console.debug('fetching home products from', url);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setProducts(data.slice(0, 4)))
      .catch(err => {
        console.error('home products fetch failed', err);
      });

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 8000);

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const nextTestimonial = () => setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Slider - Redesigned for Background Images & Mobile Perfection */}
      <section className="relative h-[90vh] lg:h-[90vh] flex items-center overflow-hidden">
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
              alt="" 
              className="w-full h-full object-center object-center"
              referrerPolicy="no-referrer"
            />
            {/* Sunburst Effect from the image */}
            {/* <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg,transparent_0deg_15deg,rgba(255,255,255,0.05)_15deg_30deg)]" />
            </div> */}
            {/* Perfection color overlay - Darker on right for text readability on desktop */}
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Product Image (Now on left for desktop) */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-start">
            <motion.div
              key={`product-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="relative z-10 w-96 h-full rounded overflow-hidden">
                <img 
                  src={HERO_SLIDES[currentSlide].productImg} 
                  alt="Product" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl" 
              />
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/30 rounded-full blur-3xl" 
              />
            </motion.div>
          </div>

          {/* Right Side: Text Content (Primary on Mobile, Right on Desktop) */}
          <div className="w-full lg:w-1/2 text-center lg:text-right flex flex-col items-center lg:items-end">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="inline-block bg-orange-500 text-white text-[10px] md:text-xs font-bold px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-4 md:mb-6">
                {HERO_SLIDES[currentSlide].accent}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-black text-white leading-tight mb-6 md:mb-8 drop-shadow-2xl italic">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mr-0 drop-shadow-md">
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                <Link 
                  to="/shop" 
                  className="bg-orange-600 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-orange-700 transition-all flex items-center group shadow-2xl"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/bulk-booking" 
                  className="hidden md:block bg-white/10 backdrop-blur-md text-white border-2 border-white/50 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-all"
                >
                  Bulk Inquiry
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
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide a comprehensive range of mango-related services tailored for every need.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              icon: Globe, 
              title: "Superior Taste", 
              desc: "Ratnagiri mango pulp is celebrated for its rich sweetness and unique flavor profile, ideal for various culinary creations.",
              color: "bg-blue-50 text-blue-600"
            },
            { 
              icon: Sun, 
              title: "Natural Color", 
              desc: "The pulp boasts a vibrant yellow-orange color from the ripe mangoes, enhancing the visual appeal of any dish.",
              color: "bg-yellow-50 text-yellow-600"
            },
            { 
              icon: Heart, 
              title: "Rich Nutritional Profile", 
              desc: "acked with vitamins and minerals, Ratnagiri mango pulp is a nutritious choice for health-conscious consumers.",
              color: "bg-red-50 text-red-600"
            },
            { 
              icon: CrossIcon, 
              title: "No Artificial Additives", 
              desc: "Enjoy 100% pure mango pulp, free from artificial preservatives, colors, or flavors for a wholesome experience.",
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
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center md:text-left">Seasonal Favorites</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {['Fresh Mangoes', 'Pickles', 'Pulp', 'Jam', 'Cubes', 'Beverages'].map(cat => (
                <Link 
                  key={cat}
                  to={`/shop?cat=${cat}`}
                  className="text-xs font-bold px-4 py-2 rounded-full border border-orange-100 text-gray-600 hover:bg-orange-600 hover:text-white transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/shop" className="text-orange-600 font-bold flex items-center hover:underline whitespace-nowrap">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} redirectToShop />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-900/20 w-full"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
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
              <button onClick={prevTestimonial} className="p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-orange-600 transition-all cursor-pointer">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-12">
              <button onClick={nextTestimonial} className="p-4 rounded-full bg-white shadow-lg text-gray-400 hover:text-orange-600 transition-all cursor-pointer">
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
                className="px-8 py-5 rounded-2xl border border-orange-500 focus:ring-4 focus:ring-orange-500/50 text-white outline-none text-lg"
              />
              <button className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/40 cursor-pointer">
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
