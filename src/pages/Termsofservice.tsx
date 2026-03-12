import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight, FileText, ShoppingBag, CreditCard, RefreshCw,
  AlertTriangle, Scale, Globe, Mail, Phone
} from 'lucide-react';

const sections = [
  {
    id: 'acceptance',
    icon: FileText,
    title: 'Acceptance of Terms',
    content: [
      {
        subtitle: 'Agreement',
        text: 'By accessing or using the Amridh website and purchasing our products, you confirm that you are at least 18 years of age, have read and understood these Terms of Service, and agree to be bound by them. If you do not agree with any part of these terms, please do not use our services.',
      },
      {
        subtitle: 'Changes to Terms',
        text: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes your acceptance of the updated terms. We recommend reviewing this page periodically.',
      },
    ],
  },
  {
    id: 'products-orders',
    icon: ShoppingBag,
    title: 'Products & Orders',
    content: [
      {
        subtitle: 'Product Descriptions',
        text: 'We strive to provide accurate descriptions and images of our products. However, we do not guarantee that product descriptions, images, pricing, or other content on our website are error-free. We reserve the right to correct any errors and to cancel orders placed based on incorrect information.',
      },
      {
        subtitle: 'Availability',
        text: 'All products are subject to availability. We reserve the right to limit quantities of any products offered. Product availability may change without notice, especially during peak mango seasons.',
      },
      {
        subtitle: 'Order Acceptance',
        text: 'Placing an order on our website constitutes an offer to purchase. We reserve the right to accept or decline your order for any reason, including but not limited to product unavailability, errors in pricing, or suspected fraudulent activity. Order confirmation via email does not guarantee final acceptance.',
      },
      {
        subtitle: 'Fresh Produce',
        text: 'Alphonso mangoes and other fresh produce are natural products subject to seasonal variation. Color, size, and taste may vary between batches. This does not constitute a defect and does not qualify for a return unless the product is damaged or spoiled upon delivery.',
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
        text: 'All prices listed on our website are in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without notice. Wholesale prices are available only to verified wholesale account holders.',
      },
      {
        subtitle: 'Payment Methods',
        text: 'We accept major credit/debit cards, UPI payments, net banking, and other payment methods as listed at checkout. All transactions are processed through secure, encrypted payment gateways.',
      },
      {
        subtitle: 'Coupon Codes',
        text: 'Discount coupons are subject to their specific terms and expiry dates. Only one coupon may be used per order. Coupons cannot be combined with other offers unless explicitly stated. Amridh reserves the right to revoke or modify coupon terms at any time.',
      },
      {
        subtitle: 'Failed Payments',
        text: 'If your payment fails, your order will not be confirmed. Please retry with a valid payment method. In the rare case of a double charge, contact us within 48 hours and we will issue a full refund.',
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
        text: 'We accept return or refund requests for damaged, spoiled, or incorrect products only. Claims must be raised within 24 hours of delivery with photographic evidence. Due to the perishable nature of our products, we are unable to accept returns for change of mind.',
      },
      {
        subtitle: 'Refund Process',
        text: 'Approved refunds will be credited to the original payment method within 5–7 business days. For cash-on-delivery orders, refunds will be processed via bank transfer or store credit.',
      },
      {
        subtitle: 'Non-Returnable Items',
        text: 'Opened food products, items damaged due to improper storage after delivery, and products purchased during clearance sales are not eligible for returns or refunds.',
      },
    ],
  },
  {
    id: 'prohibited',
    icon: AlertTriangle,
    title: 'Prohibited Activities',
    content: [
      {
        subtitle: 'Misuse of Platform',
        text: 'You agree not to misuse our platform in any way, including: using automated scripts to scrape or collect data; attempting to gain unauthorized access to our systems; submitting false or fraudulent orders; impersonating another person or entity; or using our website for any illegal purpose.',
      },
      {
        subtitle: 'Intellectual Property',
        text: 'All content on this website — including text, images, logos, product photographs, and brand identity — is owned by or licensed to Amridh and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit written permission.',
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
        text: 'To the maximum extent permitted by law, Amridh shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount paid by you for the specific product that is the subject of the claim.',
      },
      {
        subtitle: 'Force Majeure',
        text: 'Amridh is not liable for any failure to perform obligations due to circumstances beyond our reasonable control, including natural disasters, floods, droughts affecting crop yield, government restrictions, or other acts of God.',
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
        text: 'These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.',
      },
      {
        subtitle: 'Dispute Resolution',
        text: 'Before initiating legal action, we encourage you to contact us to resolve any disputes amicably. We are committed to finding fair solutions for our customers.',
      },
    ],
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = React.useState<string>('acceptance');

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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Terms of Service</h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed">
              Please read these terms carefully before using our website or purchasing our products. They govern your relationship with Amridh.
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
                Welcome to <strong className="text-gray-900">Amridh</strong>. These Terms of Service ("Terms") govern your use of our website located at <strong className="text-orange-600">amridh.com</strong> and the purchase of our products. By accessing our website or placing an order, you agree to these Terms in full.
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
                If you have questions about these Terms of Service, please reach out to us.
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