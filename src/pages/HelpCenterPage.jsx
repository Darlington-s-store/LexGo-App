import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HelpCenterPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'How is study streak calculated?', a: 'Your study streak increments by 1 for every day you log in and read at least one legal case or complete a practice quiz.' },
    { q: 'Can I bookmark cases to study offline?', a: 'Yes! Inside each case study view, tap the bookmark icon on the top right. Bookmarked cases are cached automatically.' },
    { q: 'How does the AI Companion answer work?', a: 'Our Companion analyzes legal documents, briefs, and common law precedents to draft instant explanations of concepts.' },
    { q: 'How do I download academic records?', a: 'Head to the Academic Record section and click the Export PDF option at the top of the statistics chart.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-lexgo-dark">Help & Support Center</h2>
        <p className="text-sm text-gray-500">Find quick guides and answers to frequently asked questions</p>
      </div>

      <div className="space-y-3 max-w-2xl bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0 pt-3 first:pt-0">
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-lexgo-dark py-2 cursor-pointer hover:opacity-85 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isOpen && (
                <div className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HelpCenterPage;
