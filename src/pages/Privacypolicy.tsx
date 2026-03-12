import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Shield, Eye, Lock, Database, Bell, UserCheck, Mail, Phone } from 'lucide-react';

const sections = [
  {
    id: 'information-we-collect',
    icon: Database,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We may collect personal information including your name, phone number, email address, billing and shipping address, and payment details. Payment information is processed securely through third-party payment providers.',
      },
      {
        subtitle: 'Non-Personal Information',
        text: 'We also collect non-personal information such as browser type and device information, IP address, and website usage data including pages visited and time spent on our site.',
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Order Processing & Communication',
        text: 'We use your personal information to process and deliver orders, and to communicate with you about your orders or inquiries.',
      },
      {
        subtitle: 'Service Improvement',
        text: 'We use collected data to improve our products and services, and to send updates, promotions, or marketing communications — only if you opt in.',
      },
      {
        subtitle: 'Security',
        text: 'We use your information to ensure the security of our platform and to prevent fraudulent activity.',
      },
    ],
  },
  {
    id: 'information-sharing',
    icon: UserCheck,
    title: 'Sharing of Information',
    content: [
      {
        subtitle: 'We Do Not Sell Your Data',
        text: 'Amridh Mango and Mango Products does not sell or rent your personal information to any third parties.',
      },
      {
        subtitle: 'Service Partners',
        text: 'We may share information with delivery and logistics partners to ship orders, payment gateways for secure transaction processing, and service providers who help operate our website or business. These partners are required to keep your information confidential.',
      },
    ],
  },
  {
    id: 'data-security',
    icon: Lock,
    title: 'Data Security',
    content: [
      {
        subtitle: 'Protection Measures',
        text: 'We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, misuse, or disclosure.',
      },
      {
        subtitle: 'Limitations',
        text: 'However, no online transmission or storage system can be guaranteed to be completely secure. We encourage you to take appropriate precautions when sharing information online.',
      },
    ],
  },
  {
    id: 'your-rights',
    icon: Shield,
    title: 'Your Privacy Rights',
    content: [
      {
        subtitle: 'Access & Correction',
        text: 'You may request access to the personal information we hold about you, and request correction or deletion of your personal data.',
      },
      {
        subtitle: 'Opt-Out',
        text: 'You may opt out of marketing communications at any time. To exercise any of these rights, please contact us using the details below.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: Bell,
    title: 'Cookies & Tracking Technologies',
    content: [
      {
        subtitle: 'Cookie Usage',
        text: 'Our website may use cookies and similar technologies to enhance user experience, analyze website traffic, and improve functionality.',
      },
      {
        subtitle: 'Managing Cookies',
        text: 'You can disable cookies in your browser settings if you prefer. Note that disabling certain cookies may affect the functionality of our website.',
      },
    ],
  },
  {
    id: 'third-party',
    icon: Database,
    title: 'Third-Party Links & Updates',
    content: [
      {
        subtitle: 'Third-Party Links',
        text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those external sites.',
      },
      {
        subtitle: 'Changes to This Privacy Policy',
        text: 'We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.',
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = React.useState<string>('information-we-collect');

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-300/20 rounded-full blur-2xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-white/80 font-black uppercase tracking-widest text-sm">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Privacy Policy</h1>
            <p className="text-white/80 text-base max-w-xl leading-relaxed">
              Amridh Mango and Mango Products values your privacy and is committed to protecting the personal information you share with us.
            </p>
            <p className="text-white/60 text-sm mt-4 font-medium">Last updated: January 1, 2025</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sticky Sidebar Navigation */}
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

              {/* Contact box */}
              <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
                <p className="text-xs font-black uppercase tracking-wider text-orange-600 mb-2">Questions?</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">Contact our privacy team for any concerns.</p>
                <a href="mailto:hello@amridhmango.com" className="flex items-center gap-2 text-orange-600 text-xs font-bold hover:underline">
                  <Mail className="h-3.5 w-3.5" /> hello@amridhmango.com
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
            {/* Intro box */}
            <div className="bg-orange-50 border-2 border-orange-100 rounded-[2rem] p-8">
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy explains how <strong className="text-gray-900">Amridh Mango and Mango Products</strong> ("we", "us", or "our") collects, uses, discloses, and safeguards your information when you visit our website, purchase our products, or interact with our services. By using our website or purchasing our products, you agree to this Privacy Policy.
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
                  <div className="flex items-center gap-4 p-8 pb-0">
                    <div className="bg-orange-100 rounded-2xl p-3">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                  </div>
                  <div className="p-8 space-y-6">
                    {section.content.map((item, i) => (
                      <div key={i}>
                        <h3 className="font-black text-gray-900 mb-2">{item.subtitle}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );
            })}

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-100 rounded-[2rem] p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-3">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a href="mailto:hello@amridhmango.com" className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm font-bold text-gray-900 hover:shadow-md transition-shadow">
                  <Mail className="h-5 w-5 text-orange-600" /> hello@amridhmango.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm font-bold text-gray-900 hover:shadow-md transition-shadow">
                  <Phone className="h-5 w-5 text-orange-600" /> +91 98765 43210
                </a>
                <a href="https://wa.me/917021489372" className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm font-bold text-gray-900 hover:shadow-md transition-shadow">
                  <Phone className="h-5 w-5 text-orange-600" /> WhatsApp: +91 70214 89372
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-4">📍 Ratnagiri, Maharashtra, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}