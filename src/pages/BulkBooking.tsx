import React from 'react';
import { motion } from 'motion/react';
import { Package, Truck, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BulkBooking() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your bulk inquiry has been submitted! We will contact you shortly.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden bg-orange-600">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg,transparent_0deg_10deg,rgba(255,255,255,0.1)_10deg_20deg)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Bulk Booking & <span className="text-yellow-300">Wholesale</span>
          </motion.h1>
          <p className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed">
            Partner with Amirdh Mango for premium quality mangoes in bulk. 
            Ideal for retailers, distributors, and large-scale events.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Why Partner With Us?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We offer direct-from-orchard supply with guaranteed freshness and competitive wholesale pricing. 
                Our logistics network ensures timely delivery across all major cities in India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Package, title: "Custom Packaging", desc: "Tailored packaging solutions for your specific retail needs." },
                { icon: Truck, title: "Priority Shipping", desc: "Dedicated logistics for bulk orders to ensure maximum freshness." },
                { icon: ShieldCheck, title: "Quality Assurance", desc: "Every batch undergoes rigorous quality checks before dispatch." },
                { icon: Phone, title: "24/7 Support", desc: "Dedicated account managers for our wholesale partners." }
              ].map((item, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5 text-orange-600" />
                  <span>wholesale@Amirdhmango.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <span>Ratnagiri Orchards, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-orange-50">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Bulk Inquiry Form</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Mango Retailers Ltd" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Quantity (in Kgs/Boxes)</label>
                <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. 500 Kgs" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Requirements</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Tell us more about your needs..."></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
