import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Lock, FileText, Eye } from 'lucide-react';

const LegalPage = ({ type, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: "Privacy Policy",
          icon: <Shield className="text-indigo-400" size={32} />,
          lastUpdated: "October 12, 2026",
          sections: [
            {
              title: "1. Information We Collect",
              content: "We collect information you provide directly to us, such as when you create an account, participate in a meeting, or communicate with us. This includes audio and video data processed during meetings to generate summaries and action items."
            },
            {
              title: "2. How We Use Your Information",
              content: "We use the information we collect to provide, maintain, and improve our services, including to process your meeting recordings and generate AI-driven insights. We do not sell your personal data to third parties."
            },
            {
              title: "3. AI Processing & Memory",
              content: "Nexora uses advanced AI models to analyze meeting content. This data is used solely to build your team's persistent memory and is encrypted at rest and in transit. You have full control over what data is stored and can delete it at any time."
            },
            {
              title: "4. Data Security",
              content: "We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is restricted to authorized personnel only."
            }
          ]
        };
      case 'terms':
        return {
          title: "Terms of Service",
          icon: <FileText className="text-purple-400" size={32} />,
          lastUpdated: "October 12, 2026",
          sections: [
            {
              title: "1. Acceptance of Terms",
              content: "By accessing or using Nexora, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service."
            },
            {
              title: "2. Use License",
              content: "Permission is granted to temporarily use Nexora for personal or commercial team collaboration. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials."
            },
            {
              title: "3. Subscription & Billing",
              content: "Certain parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Billing cycles are set either on a monthly or annual basis."
            },
            {
              title: "4. Limitation of Liability",
              content: "In no event shall Nexora or its suppliers be liable for any damages arising out of the use or inability to use the materials on Nexora's website."
            }
          ]
        };
      case 'cookies':
        return {
          title: "Cookie Policy",
          icon: <Eye className="text-emerald-400" size={32} />,
          lastUpdated: "October 12, 2026",
          sections: [
            {
              title: "1. What are Cookies?",
              content: "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site."
            },
            {
              title: "2. How We Use Cookies",
              content: "We use cookies to understand how you use our service, to keep you logged in, and to remember your preferences. We use both session cookies and persistent cookies."
            },
            {
              title: "3. Types of Cookies",
              content: "Essential cookies are necessary for the website to function. Analytics cookies help us understand how visitors interact with the website. Functional cookies allow the website to provide enhanced functionality."
            }
          ]
        };
      case 'trust':
        return {
          title: "Trust Center",
          icon: <Lock className="text-blue-400" size={32} />,
          lastUpdated: "October 12, 2026",
          sections: [
            {
              title: "Security Infrastructure",
              content: "Nexora is built on world-class cloud infrastructure. We utilize AWS and Google Cloud Platform, inheriting their robust security and compliance certifications (SOC2, ISO 27001)."
            },
            {
              title: "Encryption",
              content: "All data is encrypted using AES-256 at rest and TLS 1.2+ in transit. We use industry-standard key management practices to ensure your meeting data remains private."
            },
            {
              title: "Compliance",
              content: "We are committed to GDPR and CCPA compliance. We provide tools for users to export or delete their data, ensuring you maintain full sovereignty over your team's information."
            }
          ]
        };
      default:
        return { title: "Legal", sections: [] };
    }
  };

  const data = getContent();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070E] text-slate-900 dark:text-white pt-20 pb-32 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to home
        </button>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-16 border-b border-black/5 dark:border-white/5"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10 shadow-sm dark:shadow-inner transition-colors">
              {data.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white">{data.title}</h1>
              <p className="text-slate-500 dark:text-gray-500 font-medium">Last updated: {data.lastUpdated}</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-12">
          {data.sections.map((section, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{section.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-20 p-8 rounded-3xl bg-indigo-500/5 dark:bg-indigo-500/5 border border-indigo-500/10 text-center">
            <p className="text-slate-600 dark:text-gray-400">
                Have questions about our legal terms? <br />
                Reach out to our legal team at <span className="text-indigo-600 dark:text-indigo-400 font-bold">legal@nexora.ai</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
