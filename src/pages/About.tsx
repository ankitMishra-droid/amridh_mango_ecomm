import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Users, MapPin, Heart, CheckCircle, Gift, Star, Calendar, MessageSquare, CreditCard } from 'lucide-react';

export default function About() {
  const whyChooseItems = [
    { title: "Premium Quality", desc: "Carefully handpicked from trusted orchards in Ratnagiri and Devgad to ensure superior taste, freshness, and authenticity." },
    { title: "Healthy & Delicious", desc: "Naturally rich in vitamins, antioxidants, and nutrients, mangoes are a wholesome and delightful treat." },
    { title: "Perfect for Every Occasion", desc: "An ideal gift for birthdays, anniversaries, festivals, weddings, and corporate gifting." },
    { title: "Memorable & Unique", desc: "Stand out from ordinary gifts with a seasonal, premium, and naturally sweet experience." },
    { title: "Elegant Gift Packaging", desc: "Beautifully packed mango boxes designed perfectly for personal and corporate gifting." },
  ];

  const howItWorksItems = [
    { icon: Gift, title: "Fill the Gifting Form", desc: "Enter recipient details, select your mango variety or gift package, and add a personalized message." },
    { icon: Calendar, title: "Choose Your Delivery Date", desc: "Schedule delivery so your gift arrives at the perfect moment." },
    { icon: MessageSquare, title: "Add a Personal Touch", desc: "Include a heartfelt message to make your gift even more special." },
    { icon: CreditCard, title: "Make Payment Securely", desc: "Complete your order using our safe and easy online payment system." },
  ];

  const corporateIdealItems = [
    "Client appreciation gifts",
    "Employee rewards",
    "Festival gifting (Diwali, New Year, etc.)",
    "Special celebrations",
  ];

  return (
    <div className="pb-24">

      {/* ── Hero ── */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Our Story
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From the Orchards of Ratnagiri &amp; Devgad to Your Home — Rooted in Tradition, Driven by Quality.
          </p>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Intro — full width */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900 leading-tight mb-8">
            Rooted in Tradition, <span className="text-orange-600">Driven by Quality.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Every mango has a story, and ours begins in the sun-kissed orchards of Ratnagiri and Devgad, the heartland of the world's finest Alphonso mangoes. <strong className="text-gray-800">Amridh Mango</strong> started as a small family orchard in the Konkan region. Today, we stand as a symbol of purity and authentic taste. Our mission is simple: to ensure that every mango lover experiences the true, unadulterated flavor of Indian summer.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We don't just sell fruits; we share a heritage. Every Alphonso, Kesar, and Dasheri is hand-picked at the peak of its ripeness, ensuring the perfect balance of sweetness and aroma. For generations, farmers in this region have nurtured mango trees with care, patience, and deep respect for nature. The unique coastal climate, rich soil, and traditional farming practices give Alphonso (Hapus) mangoes their unmatched sweetness, aroma, and vibrant golden color.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our journey began with a simple vision — to bring the authentic taste of farm-fresh Alphonso mangoes directly to people who truly appreciate quality and purity.
          </p>
        </div>

        {/* Three story pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-10">
            {/* Rooted in Tradition */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Rooted in Tradition</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We work closely with trusted local farmers who have been growing mangoes for decades. Each mango is handpicked at the right stage of maturity, naturally ripened, and carefully sorted to ensure only the finest fruits reach you. By sourcing directly from the orchards, we not only ensure freshness and authenticity, but also support the farming communities who dedicate their lives to growing the King of Fruits.
              </p>
            </div>

            {/* Beyond Fresh Mangoes */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Beyond Fresh Mangoes</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our love for Alphonso mangoes inspired us to create a range of premium mango products that capture the same authentic flavor. From fresh mangoes to delicious mango-based delights, every product is crafted with the same commitment to quality, taste, and natural goodness. Whether it's a box of fresh Alphonso mangoes or a mango product made from the finest pulp, our goal is simple — to deliver the true taste of Konkan to your home.
              </p>
            </div>

            {/* Sharing Sweetness */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Sharing Sweetness</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                For us, mangoes are more than just fruit — they are a symbol of joy, celebration, and togetherness. Whether you're enjoying them with family, gifting them to loved ones, or sharing them with clients and colleagues, we want every box to carry the sweetness of the season and the warmth of our orchards.
              </p>
            </div>
          </div>

          {/* Image + stats */}
          <div className="space-y-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1000"
                alt="Harvesting"
                className="rounded-[3rem] shadow-2xl w-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-50 max-w-xs hidden md:block">
                <Heart className="h-8 w-8 text-red-500 mb-3" />
                <p className="text-gray-900 font-bold text-sm">"We treat our trees like family, and it shows in every harvest."</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="bg-orange-50 p-6 rounded-2xl text-center">
                <p className="text-4xl font-black text-orange-600">10+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Years of Expertise</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl text-center">
                <p className="text-4xl font-black text-orange-600">200+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Acres of Orchards</p>
              </div>
            </div>
          </div>
        </div>

        {/* From Our Orchards to Your Table — closing tagline */}
        <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">From Our Orchards to Your Table</h3>
          <p className="text-orange-400 text-lg font-semibold tracking-wide">Authentic. Fresh. Naturally Sweet — Amridh Products</p>
        </div>
      </section>

      {/* ── Values Section ── */}
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
              { icon: Users, title: "Fair Trade", desc: "We support local farmers and ensure they get the best value for their hard work." },
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

      {/* ── Why Choose Alphonso Mangoes ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-10 leading-tight">
              Why Choose Amirdh Alphonso Mangoes &amp; <br />
              <span className="text-orange-600">Amridh Products as a Gift?</span>
            </h2>
            <ul className="space-y-6">
              {whyChooseItems.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-bold text-gray-700">{item.title}: </span>
                    <span className="text-base text-gray-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Perfect for Corporate Gifting card */}
          <div className="bg-orange-50 rounded-[2.5rem] p-10 space-y-6 h-full">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Gift className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Perfect for Corporate Gifting</h3>
            <p className="text-gray-600 leading-relaxed">
              Looking for a unique corporate gift for your clients or employees? Premium Alphonso mango boxes
              and Mango products make a thoughtful and refreshing alternative to traditional gifts. They express
              gratitude, appreciation, and care while offering a healthy and luxurious experience.
            </p>
            <div>
              <p className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Ideal for:</p>
              <ul className="space-y-3">
                {corporateIdealItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-700 font-semibold pt-2">
              Make your brand memorable with a gift everyone truly enjoys.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to send the perfect mango gift.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksItems.map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <item.icon className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit Our Orchards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all shadow-xl whitespace-nowrap">
            Book a Tour
          </button>
        </div>
      </section>

    </div>
  );
}