import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS, STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].faq;

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-24 bg-[#120307] text-[#FAF5EE] overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#FAF5EE]/75">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const qText = language === 'ar' && faq.arabicQuestion ? faq.arabicQuestion : faq.question;
            const aText = language === 'ar' && faq.arabicAnswer ? faq.arabicAnswer : faq.answer;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#1C060B] border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className={`w-full p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <span className="font-serif-title text-base sm:text-lg font-bold text-white leading-snug">
                    {qText}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#E5C158] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#E5C158] text-[#2C0710]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 sm:px-6 pb-6 pt-3 text-xs sm:text-sm text-[#FAF5EE]/85 leading-relaxed border-t border-white/5 ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {aText}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt for more questions */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={`text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
            <h4 className="font-semibold text-white text-sm">
              {t.stillHaveQuestions}
            </h4>
            <p className="text-xs text-[#FAF5EE]/70">
              {t.whatsappHelp}
            </p>
          </div>
          <a
            href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
              language === 'ar'
                ? 'مرحباً استوديو ماماسيتا! 🌸 لدي استفسار إضافي حول الكلاسات والاشتراكات في شبين الكوم.'
                : 'Hello MamaCita! I have an additional question about your classes in Shebin El-Kom.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#20ba59] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.askWhatsApp}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
