import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { language, isRTL } = useLanguage();

  const msg = language === 'ar'
    ? 'مرحباً استوديو ماما سيتا! 🌸 أود الاستفسار عن كلاسات واشتراكات استوديو شبين الكوم.'
    : 'Hello MamaCita Studio! I would like to ask about classes and membership at your Shebin El-Kom studio.';

  const whatsappUrl = `https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <div
      className={`fixed bottom-6 ${isRTL ? 'left-6 flex-row-reverse' : 'right-6'} z-40 flex items-center gap-3`}
      id="floating-whatsapp-widget"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C060B] border border-[#E5C158]/40 shadow-2xl text-xs text-white backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>
              {language === 'ar' ? 'لديكِ سؤال؟ تحدثي مباشرة مع الاستوديو' : 'Questions? Chat with Studio Desk'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'ar' ? 'تحدثي على الواتساب مع استوديو ماما سيتا' : 'Chat on WhatsApp with MamaCita Studio'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 cursor-pointer transition-colors"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <MessageCircle className="w-7 h-7 relative z-10 transition-transform group-hover:rotate-12" />
      </motion.a>
    </div>
  );
};
