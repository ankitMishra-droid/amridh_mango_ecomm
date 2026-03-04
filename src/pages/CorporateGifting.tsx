import React from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Award, CheckCircle, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CorporateGifting() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your corporate gifting inquiry has been submitted! We will contact you shortly.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549465220-1d8c9d9c6703?auto=format&fit=crop&q=80&w=1920" 
            alt="Gift Box" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6"
          >
            Premium <span className="text-orange-500">Corporate</span> Gifting
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Elevate your corporate relationships with the gift of health and luxury. 
            Customized mango gift boxes for employees, clients, and partners.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                Make a Lasting <br />
                <span className="text-orange-600">Impression.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our corporate gifting solutions are designed to reflect your brand's commitment to quality. 
                From premium Alphonso boxes to curated mango assortments, we handle everything from 
                customization to doorstep delivery.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Customized Branding & Logo Printing",
                "Personalized Messages & Greeting Cards",
                "Pan-India Doorstep Delivery",
                "Premium Eco-friendly Packaging",
                "Bulk Discounts & Flexible Orders"
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                  <span className="text-lg font-bold text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <div className="bg-orange-50 p-8 rounded-3xl">
                <Gift className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Employee Rewards</h3>
                <p className="text-gray-600">Perfect for festivals, milestones, and appreciation programs.</p>
              </div> */}
              <div className="bg-yellow-50 p-8 rounded-3xl">
                <Heart className="h-10 w-10 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Client Relations</h3>
                <p className="text-gray-600">Strengthen partnerships with the finest taste of India.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            <h2 className="text-3xl font-black text-gray-900 mb-10">Gifting Inquiry</h2>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name</label>
                  <input type="text" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Company Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input type="email" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <input type="tel" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Number of Boxes</label>
                  <input type="number" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. 100" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea rows={4} className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Tell us about your requirements..."></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white py-6 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
