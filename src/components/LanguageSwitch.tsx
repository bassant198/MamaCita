import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface LanguageSwitchProps {
  variant?: 'navbar' | 'drawer' | 'pill';
  className?: string;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ variant = 'navbar', className = '' }) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center p-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === 'ar'
              ? 'bg-[#E5C158] text-[#2C0710] shadow-md'
              : 'text-white/70 hover:text-white'
          }`}
        >
          عربي
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-[#E5C158] text-[#2C0710] shadow-md'
              : 'text-white/70 hover:text-white'
          }`}
        >
          English
        </button>
      </div>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 ${className}`}>
        <div className="flex items-center gap-2.5 text-sm text-[#FAF5EE]">
          <Globe className="w-4 h-4 text-[#E5C158]" />
          <span className="font-semibold">
            {language === 'ar' ? 'لغة الموقع / Language' : 'Site Language / اللغة'}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === 'ar' ? 'bg-[#E5C158] text-[#2C0710]' : 'text-white/60 hover:text-white'
            }`}
          >
            عربي
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === 'en' ? 'bg-[#E5C158] text-[#2C0710]' : 'text-white/60 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  // Default navbar toggle button: sleek & eye-catching
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
      aria-label="Toggle Language Arabic / English"
      className={`relative group px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-[#E5C158]/30 hover:border-[#E5C158] transition-all duration-300 flex items-center gap-2 text-xs font-bold text-[#FAF5EE] cursor-pointer shadow-sm ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-[#E5C158] group-hover:rotate-45 transition-transform duration-300" />
      <span className="gold-gradient-text tracking-wide uppercase">
        {language === 'ar' ? 'English' : 'عربي'}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158] animate-pulse" />
    </button>
  );
};
