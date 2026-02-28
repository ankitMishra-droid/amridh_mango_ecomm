import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, Clock, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden bg-orange-50">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,165,0,0.5)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
          >
            Get in <span className="text-orange-600">Touch</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our mangoes or your order? 
            We're here to help you experience the best of summer.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Mon-Sat from 9am to 6pm.</p>
              <a href="tel:+919876543210" className="text-orange-600 font-bold text-lg hover:underline">+91 98765 43210</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">We'll respond within 24 hours.</p>
              <a href="mailto:hello@amridhmango.com" className="text-blue-600 font-bold text-lg hover:underline">hello@amridhmango.com</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our main orchards and office.</p>
              <p className="text-emerald-600 font-bold text-lg">Ratnagiri, Maharashtra, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full translate-x-32 -translate-y-32 blur-3xl" />
            <h2 className="text-3xl font-black text-gray-900 mb-10">Send a Message</h2>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input type="text" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input type="email" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subject</label>
                <input type="text" required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea rows={6} required className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Write your message here..."></textarea>
              </div>
              <button type="submit" className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-orange-900/20">
                <Send className="h-6 w-6" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-200 h-[400px] rounded-[3rem] overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <p className="text-xl font-bold text-gray-900">Google Maps Integration Placeholder</p>
              <p className="text-gray-500">Ratnagiri Orchards, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
