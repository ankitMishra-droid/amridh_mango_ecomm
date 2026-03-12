import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight, Truck, Clock, MapPin, Package,
  RefreshCw, AlertTriangle, CheckCircle, Mail, Phone, Leaf
} from 'lucide-react';

const sections = [
  {
    id: 'processing-time',
    icon: Clock,
    title: 'Order Processing',
    content: [
      {
        subtitle: 'Processing Timeline',
        text: 'All orders are processed within 1–2 business days (Monday to Saturday, excluding public holidays) after payment confirmation. You will receive an order confirmation email immediately after placing your order, and a shipping confirmation with tracking details once your order is dispatched.',
      },
      {
        subtitle: 'Fresh Produce Orders',
        text: 'Orders containing fresh Alphonso mangoes are processed and dispatched on specific days to ensure maximum freshness during transit. Fresh mango orders placed before 12:00 PM are typically dispatched the same day during the season (April–June). Off-season orders may have longer processing times.',
      },
      {
        subtitle: 'Order Cutoff Times',
        text: 'For same-day processing, orders must be placed before 12:00 PM IST on business days. Orders placed after the cutoff or on weekends/holidays will be processed on the next business day.',
      },
    ],
  },
  {
    id: 'delivery-zones',
    icon: MapPin,
    title: 'Delivery Zones & Timelines',
    content: [
      {
        subtitle: 'Pan-India Delivery',
        text: 'We deliver across India. Delivery timelines vary by location and product type.',
      },
      {
        subtitle: 'Metro Cities',
        text: 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata — Standard delivery in 2–4 business days.',
      },
      {
        subtitle: 'Tier 2 & Tier 3 Cities',
        text: 'Delivery typically takes 4–6 business days. Remote or difficult-to-access areas may require additional time.',
      },
      {
        subtitle: 'North-East & Remote Areas',
        text: 'Delivery to North-Eastern states, Andaman & Nicobar, Lakshadweep, and other remote areas may take 7–10 business days and may incur additional shipping charges.',
      },
      {
        subtitle: 'International Shipping',
        text: 'Currently, we ship processed products (pulp, jam, pickle, cubes) internationally to select countries. Fresh mangoes are available for international shipping only during peak season (April–June) and subject to phytosanitary regulations. Please contact us for international order inquiries.',
      },
    ],
  },
  {
    id: 'shipping-charges',
    icon: Package,
    title: 'Shipping Charges',
    content: [
      {
        subtitle: 'Free Shipping',
        text: 'We offer free standard shipping on all orders above ₹999 within India (excluding remote areas). This is our way of saying thank you for choosing Amridh.',
      },
      {
        subtitle: 'Standard Shipping',
        text: 'For orders below ₹999, a flat shipping fee of ₹99 is applicable for most locations. Shipping charges are calculated at checkout based on your delivery address and order weight.',
      },
      {
        subtitle: 'Express Delivery',
        text: 'Express delivery (1–2 business days) is available for select metro cities at an additional charge of ₹149. This option is available at checkout if your pin code is eligible.',
      },
      {
        subtitle: 'Wholesale Orders',
        text: 'Bulk and wholesale orders have custom shipping rates based on order volume, weight, and destination. Our wholesale team will provide a shipping quote upon order confirmation.',
      },
      {
        subtitle: 'Remote Area Surcharge',
        text: 'A surcharge of ₹75–₹200 may apply for deliveries to remote, hilly, or difficult-to-access areas. This will be clearly shown at checkout.',
      },
    ],
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Packaging & Freshness',
    content: [
      {
        subtitle: 'Fresh Mango Packaging',
        text: 'Fresh Alphonso mangoes are packed in specially designed ventilated wooden or cardboard boxes with individual fruit cushioning to prevent bruising during transit. Each box is labeled with handling instructions for delivery partners.',
      },
      {
        subtitle: 'Processed Products',
        text: 'Pulp, jams, pickles, and other processed products are packed in food-grade, tamper-evident packaging. Products are sealed and boxed with protective cushioning material to prevent damage.',
      },
      {
        subtitle: 'Temperature Control',
        text: 'For fresh mangoes and temperature-sensitive products, we use insulated packaging with ice gel packs during peak summer months to maintain optimal temperature during transit.',
      },
      {
        subtitle: 'Eco-Friendly Initiative',
        text: 'We are committed to sustainable packaging. Our packaging materials are progressively being replaced with recyclable and biodegradable alternatives as part of our environmental responsibility commitment.',
      },
    ],
  },
  {
    id: 'tracking',
    icon: Truck,
    title: 'Tracking Your Order',
    content: [
      {
        subtitle: 'Tracking Details',
        text: 'Once your order is shipped, you will receive an SMS and email with your tracking number and a link to track your shipment in real time. You can also track your order from your account dashboard under "My Orders".',
      },
      {
        subtitle: 'Delivery Attempts',
        text: 'Our delivery partners will attempt delivery twice. If you are unavailable, they will leave a delivery attempt notice and reschedule for the next business day. After two failed attempts, your order will be held at the nearest hub for 3 days before being returned.',
      },
      {
        subtitle: 'Delivery Instructions',
        text: 'You can add delivery instructions (e.g., leave at gate, call before delivery) while placing your order. We will do our best to communicate these to our delivery partners.',
      },
    ],
  },
  {
    id: 'damaged-lost',
    icon: AlertTriangle,
    title: 'Damaged or Lost Shipments',
    content: [
      {
        subtitle: 'Damaged Goods',
        text: 'If your order arrives damaged, please take photographs immediately and contact us within 24 hours of delivery at support@amridh.com or call us. We will arrange a replacement or full refund at no additional cost to you.',
      },
      {
        subtitle: 'Lost Shipments',
        text: 'If your tracking shows the order as delivered but you have not received it, please check with neighbors and building security first. If still unresolved, contact us within 48 hours. We will file a claim with the courier and arrange a replacement or refund.',
      },
      {
        subtitle: 'Delays',
        text: 'While we strive to deliver within the stated timelines, delays may occur due to weather conditions, courier backlogs, or other unforeseen circumstances. We will proactively notify you of significant delays and work to resolve them quickly.',
      },
    ],
  },
  {
    id: 'returns-shipping',
    icon: RefreshCw,
    title: 'Returns & Exchange Shipping',
    content: [
      {
        subtitle: 'Return Shipping',
        text: 'For eligible returns (damaged or incorrect products), we will arrange a reverse pickup at no cost to you. For other return requests, the customer is responsible for return shipping costs.',
      },
      {
        subtitle: 'Exchange Process',
        text: 'Product exchanges are processed once the returned item is received and inspected. Replacement orders are shipped within 1–2 business days of approval.',
      },
    ],
  },
];

const highlights = [
  { icon: Truck, label: 'Pan-India Delivery', desc: 'We deliver to every corner of India' },
  { icon: Clock, label: '1–2 Day Processing', desc: 'Fast dispatch on all orders' },
  { icon: Package, label: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: CheckCircle, label: 'Tracked Shipments', desc: 'Real-time order tracking' },
  { icon: Leaf, label: 'Fresh Guaranteed', desc: 'Temperature-controlled packaging' },
  { icon: RefreshCw, label: 'Easy Returns', desc: 'Hassle-free for damaged goods' },
];

export default function ShippingPolicy() {
  const [activeSection, setActiveSection] = React.useState<string>('processing-time');

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Shipping Policy</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-300/20 rounded-full blur-2xl" />
        {/* Decorative truck */}
        <div className="absolute right-8 bottom-0 opacity-10">
          <Truck className="h-48 w-48 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-white/80 font-black uppercase tracking-widest text-sm">Delivery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Shipping Policy</h1>
            <p className="text-white/80 text-base max-w-xl leading-relaxed">
              From our orchards to your doorstep — we ensure your Amridh products arrive fresh, safe, and on time.
            </p>
            <p className="text-white/60 text-sm mt-4 font-medium">Last updated: January 1, 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-2xl"
                >
                  <div className="bg-orange-100 rounded-xl p-2.5 mb-3">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <p className="font-black text-gray-900 text-xs leading-tight mb-1">{item.label}</p>
                  <p className="text-gray-500 text-xs leading-tight">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sticky Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-24 bg-white rounded-[2rem] shadow-lg p-6 border border-gray-100">
              <p className="text-xs font-black uppercase tracking-widest text-orange-600 mb-4">Contents</p>
              <nav className="flex flex-col gap-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        activeSection === section.id
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {section.title}
                    </a>
                  );
                })}
              </nav>

              {/* Delivery Estimate Tool */}
              <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
                <p className="text-xs font-black uppercase tracking-wider text-orange-600 mb-2">Track Order</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">Already ordered? Track your shipment.</p>
                <Link
                  to="/track-order"
                  className="block text-center bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Track My Order
                </Link>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs font-black uppercase tracking-wider text-gray-600 mb-2">Support</p>
                <a href="mailto:support@amridh.com" className="flex items-center gap-2 text-orange-600 text-xs font-bold hover:underline mb-2">
                  <Mail className="h-3.5 w-3.5" /> support@amridh.com
                </a>
                <a href="tel:+917021489372" className="flex items-center gap-2 text-orange-600 text-xs font-bold hover:underline">
                  <Phone className="h-3.5 w-3.5" /> +91 70214 89372
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-10"
          >
            {/* Delivery Timeline Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-4 p-8 pb-6 border-b border-gray-50">
                <div className="bg-orange-100 rounded-2xl p-3">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Delivery Timeline at a Glance</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-50">
                        <th className="text-left px-4 py-3 rounded-l-xl text-sm font-black text-gray-900">Zone</th>
                        <th className="text-left px-4 py-3 text-sm font-black text-gray-900">Locations</th>
                        <th className="text-left px-4 py-3 text-sm font-black text-gray-900">Delivery Time</th>
                        <th className="text-left px-4 py-3 rounded-r-xl text-sm font-black text-gray-900">Shipping Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { zone: 'Metro', locations: 'Mumbai, Delhi, Bangalore +', time: '2–4 Business Days', cost: 'Free above ₹999' },
                        { zone: 'Tier 2', locations: 'Major state capitals', time: '4–6 Business Days', cost: '₹99 below ₹999' },
                        { zone: 'Tier 3', locations: 'Smaller cities & towns', time: '5–7 Business Days', cost: '₹99 + surcharge' },
                        { zone: 'Remote', locations: 'NE states, Islands', time: '7–10 Business Days', cost: '₹200 surcharge' },
                        { zone: 'International', locations: 'Select countries', time: '10–15 Business Days', cost: 'Calculated at checkout' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-orange-50/50 transition-colors">
                          <td className="px-4 py-4">
                            <span className="bg-orange-100 text-orange-700 text-xs font-black px-3 py-1 rounded-full">
                              {row.zone}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-600 text-sm font-medium">{row.locations}</td>
                          <td className="px-4 py-4 text-gray-900 text-sm font-bold">{row.time}</td>
                          <td className="px-4 py-4 text-gray-600 text-sm font-medium">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-8 pb-6 border-b border-gray-50">
                    <div className="bg-orange-100 rounded-2xl p-3">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                  </div>
                  <div className="p-8 space-y-6">
                    {section.content.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5" />
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 mb-1.5">{item.subtitle}</h3>
                          <p className="text-gray-600 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );
            })}

            {/* Contact */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-100 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-black text-gray-900">Shipping Support</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Have questions about your delivery or need help tracking your order? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:support@amridh.com" className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm font-bold text-gray-900 hover:shadow-md transition-shadow">
                  <Mail className="h-5 w-5 text-orange-600" /> support@amridh.com
                </a>
                <a href="tel:+917021489372" className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm font-bold text-gray-900 hover:shadow-md transition-shadow">
                  <Phone className="h-5 w-5 text-orange-600" /> +91 70214 89372
                </a>
                <Link to="/track-order" className="flex items-center gap-3 bg-orange-600 hover:bg-orange-700 px-6 py-4 rounded-2xl font-bold text-white transition-colors">
                  <Truck className="h-5 w-5" /> Track Order
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}