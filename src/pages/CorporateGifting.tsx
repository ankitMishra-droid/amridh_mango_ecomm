import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CorporateGifting() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your corporate gifting inquiry has been submitted! We will contact you shortly.');
    (e.target as HTMLFormElement).reset();
  };

  const whyChooseItems = [
    { title: "Premium Quality", desc: "Carefully handpicked from trusted orchards in Ratnagiri and Devgad to ensure superior taste, freshness, and authenticity." },
    { title: "Healthy & Delicious", desc: "Naturally rich in vitamins, antioxidants, and nutrients, mangoes are a wholesome and delightful treat." },
    { title: "Perfect for Every Occasion", desc: "An ideal gift for birthdays, anniversaries, festivals, weddings, and corporate gifting." },
    { title: "Memorable & Unique", desc: "Stand out from ordinary gifts with a seasonal, premium, and naturally sweet experience." },
    { title: "Elegant Gift Packaging", desc: "Beautifully packed mango boxes designed perfectly for personal and corporate gifting." },
  ];

  const howItWorksItems = [
    { title: "Fill the Gifting Form", desc: "Enter recipient details, select your mango variety or gift package, and add a personalized message." },
    { title: "Choose Your Delivery Date", desc: "Schedule delivery so your gift arrives at the perfect moment." },
    { title: "Add a Personal Touch", desc: "Include a heartfelt message to make your gift even more special." },
    { title: "Make Payment Securely", desc: "Complete your order using our safe and easy online payment system." },
  ];

  return (
    <div className="pb-24">

      {/* ── Hero ── */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6"
          >
            Premium <span className="text-orange-500">Corporate</span> Gifting
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A Premium Gift of Sweetness from Ratnagiri &amp; Devgad
          </p>
        </div>
      </section>

      {/* ── Main content wrapper ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-column: copy + form ── */}
        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — copy */}
            <div className="space-y-10">

              {/* Intro */}
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                  Make a Lasting <br />
                  <span className="text-orange-600">Impression.</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Delight your loved ones with the unmatched taste and freshness of premium Alphonso mangoes.
                  Sourced directly from the finest orchards of Ratnagiri and Devgad, these mangoes—fondly known
                  as Hapus—are celebrated for their rich aroma, vibrant golden color, and irresistible sweetness.
                  <br /><br />
                  Whether you're looking for a thoughtful corporate gift, a festive surprise, or a special gesture
                  for family and friends, Alphonso mango gifting is a memorable and meaningful choice.
                  <br /><br />
                  A beautifully packed box of handpicked Alphonso or Kesar mangoes and mango products is more
                  than just a gift—it's a gesture of warmth, appreciation, and indulgence that leaves a lasting
                  impression.
                  <br /><br />
                  Celebrate every occasion with the King of Fruits and share the joy of authentic mango goodness.
                </p>
              </div>

              {/* Why Choose */}
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  Why Choose Amirdh Alphonso Mangoes &amp; Mango Products as a Gift?
                </h3>
                <ul className="space-y-5">
                  {whyChooseItems.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-base font-bold text-gray-700">{item.title}: </span>
                        <span className="text-base text-gray-600">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client relations card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-8 rounded-3xl">
                  <Heart className="h-10 w-10 text-yellow-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Client Relations</h3>
                  <p className="text-gray-600">Strengthen partnerships with the finest taste of India.</p>
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-3xl font-black text-gray-900 mb-10">Gifting Inquiry</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Company Name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <input type="tel" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Number of Boxes</label>
                  <input type="number" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. 100" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Tell us about your requirements..." />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl">
                  Send Inquiry
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* ── How It Works — full width below ── */}
        <section className="pb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksItems.map((item, i) => (
              <div key={i} className="bg-orange-50 rounded-3xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  {/* <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" /> */}
                </div>
                <p className="text-base font-bold text-gray-700">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}