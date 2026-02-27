import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Users, MapPin, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1920" 
            alt="Mango Orchard" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Our Mango <span className="text-orange-500">Legacy</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From the fertile red soil of Ratnagiri to your dining table, 
            we bring three generations of expertise in cultivating India's finest mangoes.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Rooted in Tradition, <br />
              <span className="text-orange-600">Driven by Quality.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Amridh Mango started as a small family orchard in the Konkan region. Today, we stand as a symbol of 
              purity and authentic taste. Our mission is simple: to ensure that every mango lover experiences 
              the true, unadulterated flavor of Indian summer.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We don't just sell fruits; we share a heritage. Every Alphonso, Kesar, and Dasheri is hand-picked 
              at the peak of its ripeness, ensuring the perfect balance of sweetness and aroma.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-4xl font-black text-orange-600">30+</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Years of Expertise</p>
              </div>
              <div>
                <p className="text-4xl font-black text-orange-600">500+</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Acres of Orchards</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1000" 
              alt="Harvesting" 
              className="rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-orange-50 max-w-xs">
              <Heart className="h-10 w-10 text-red-500 mb-4" />
              <p className="text-gray-900 font-bold">"We treat our trees like family, and it shows in every harvest."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-600">Our core values define every step of our journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: "100% Organic", desc: "No artificial ripening or harmful pesticides. Just nature's goodness." },
              { icon: Award, title: "Premium Quality", desc: "Rigorous quality checks ensure only the best fruits reach your doorstep." },
              { icon: Users, title: "Fair Trade", desc: "We support local farmers and ensure they get the best value for their hard work." }
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-orange-50 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <v.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-orange-600 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-6">Visit Our Orchards</h2>
            <p className="text-xl text-orange-50 mb-8 leading-relaxed">
              Experience the magic of the mango season firsthand. We organize orchard tours during 
              the peak harvest months of April and May.
            </p>
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6" />
              <span className="text-lg font-bold">Ratnagiri, Maharashtra, India</span>
            </div>
          </div>
          <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all shadow-xl">
            Book a Tour
          </button>
        </div>
      </section>
    </div>
  );
}
