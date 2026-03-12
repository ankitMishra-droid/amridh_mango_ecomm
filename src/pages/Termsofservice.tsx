import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight, FileText, ShoppingBag, CreditCard, RefreshCw,
  AlertTriangle, Scale, Globe, Mail, Phone
} from 'lucide-react';

const sections = [
  {
    id: 'eligibility',
    icon: FileText,
    title: 'Eligibility',
    content: [
      {
        subtitle: 'Age Requirement',
        text: 'By using our services or purchasing products from us, you confirm that you are at least 18 years old, or you are using our services under the supervision of a parent or legal guardian.',
      },
    ],
  },
  {
    id: 'products-availability',
    icon: ShoppingBag,
    title: 'Products & Availability',
    content: [
      {
        subtitle: 'Product Descriptions',
        text: 'We strive to ensure that all product descriptions, images, and prices are accurate. We reserve the right to modify or discontinue products at any time without prior notice.',
      },
      {
        subtitle: 'Seasonal Availability',
        text: 'As mangoes are seasonal agricultural products, availability may vary depending on harvest conditions and supply.',
      },
      {
        subtitle: 'Order Confirmation',
        text: 'Once an order is placed, you will receive confirmation via email, SMS, or messaging platforms such as WhatsApp. We reserve the right to cancel or refuse any order due to product unavailability, incorrect pricing, or suspected fraudulent activity.',
      },
      {
        subtitle: 'Quality & Freshness',
        text: 'Our mangoes and mango products are packed with care to maintain freshness and quality. Since fresh fruit is perishable, minor variations in size, color, and taste may occur due to natural farming conditions. Customers are encouraged to check the package immediately upon delivery.',
      },
    ],
  },
  {
    id: 'pricing-payment',
    icon: CreditCard,
    title: 'Pricing & Payment',
    content: [
      {
        subtitle: 'Pricing',
        text: 'All prices are listed in Indian Rupees (INR) unless stated otherwise. Prices may change without prior notice.',
      },
      {
        subtitle: 'Payment Methods',
        text: 'Payments must be made through the available payment methods such as online payment gateways, UPI, bank transfer, or cash on delivery where applicable.',
      },
      {
        subtitle: 'Order Processing',
        text: 'Orders will only be processed after successful payment confirmation.',
      },
    ],
  },
  {
    id: 'shipping-delivery',
    icon: RefreshCw,
    title: 'Shipping & Delivery',
    content: [
      {
        subtitle: 'Delivery Timelines',
        text: 'Delivery timelines may vary depending on your location and product availability. While we aim to deliver products within the estimated timeframe, delays may occur due to logistics issues, weather conditions, or other unforeseen circumstances.',
      },
      {
        subtitle: 'Delivery Address',
        text: 'Customers must ensure the delivery address and contact details provided are accurate.',
      },
    ],
  },
  {
    id: 'returns-refunds',
    icon: RefreshCw,
    title: 'Returns & Refunds',
    content: [
      {
        subtitle: 'Eligibility',
        text: 'Due to the perishable nature of mangoes, returns may not be accepted unless the product is damaged or spoiled upon delivery. Customers must report any issues within 24 hours of delivery with clear photos or proof.',
      },
      {
        subtitle: 'Refund Process',
        text: 'Refunds or replacements will be evaluated on a case-by-case basis.',
      },
    ],
  },
  {
    id: 'prohibited',
    icon: AlertTriangle,
    title: 'Intellectual Property',
    content: [
      {
        subtitle: 'Ownership',
        text: 'All content on our website including logos, images, product descriptions, and branding related to Amridh Mango and Mango Products are the intellectual property of the company and may not be used without permission.',
      },
    ],
  },
  {
    id: 'liability',
    icon: Scale,
    title: 'Limitation of Liability',
    content: [
      {
        subtitle: 'Disclaimer',
        text: 'We are not liable for delays caused by courier services or natural events, damage caused due to improper storage after delivery, or allergic reactions or misuse of products. Customers should store products according to recommended guidelines.',
      },
      {
        subtitle: 'Privacy',
        text: 'Your personal information is handled in accordance with our Privacy Policy.',
      },
    ],
  },
  {
    id: 'governing-law',
    icon: Globe,
    title: 'Governing Law',
    content: [
      {
        subtitle: 'Jurisdiction',
        text: 'These Terms and Conditions shall be governed by the laws of India, and any disputes shall be subject to the jurisdiction of courts in Maharashtra, India.',
      },
      {
        subtitle: 'Changes to Terms',
        text: 'We reserve the right to update or modify these Terms and Conditions at any time. Updates will be posted on this page with the revised date.',
      },
    ],
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = React.useState<string>('eligibility');

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-orange-400/10 rounded-full blur-2xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-black uppercase tracking-widest text-sm">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Terms & Conditions</h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed">
              Please read these terms carefully before using our website or purchasing our products. They govern your relationship with Amridh Mango and Mango Products.
            </p>
            <p className="text-white/40 text-sm mt-4 font-medium">Last updated: January 1, 2025</p>
          </motion.div>
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

              <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
                <p className="text-xs font-black uppercase tracking-wider text-orange-600 mb-2">Need Help?</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">Our support team is happy to clarify any terms.</p>
                <a href="mailto:support@amridh.com" className="flex items-center gap-2 text-orange-600 text-xs font-bold hover:underline">
                  <Mail className="h-3.5 w-3.5" /> support@amridh.com
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
            {/* Intro */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-[2rem] p-8">
              <p className="text-gray-700 leading-relaxed">
                Welcome to <strong className="text-gray-900">Amridh Mango and Mango Products</strong>. These Terms and Conditions govern your use of our website, services, and the purchase of our products including fresh mangoes, pulp, pickles, juices, and other related items. By accessing our website or placing an order, you agree to comply with and be bound by these Terms and Conditions.
              </p>
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
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-orange-500 block mb-0.5">
                        Section {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    {section.content.map((item, i) => (
                      <div key={i} className="border-l-4 border-orange-200 pl-5">
                        <h3 className="font-black text-gray-900 mb-2">{item.subtitle}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );
            })}

            {/* Contact */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 text-white">
              <h2 className="text-2xl font-black mb-3">Contact Us</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                For any questions or concerns regarding these Terms and Conditions, please reach out to us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:legal@amridh.com" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl font-bold text-white transition-colors">
                  <Mail className="h-5 w-5 text-orange-400" /> legal@amridh.com
                </a>
                <a href="tel:+917021489372" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl font-bold text-white transition-colors">
                  <Phone className="h-5 w-5 text-orange-400" /> +91 70214 89372
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}