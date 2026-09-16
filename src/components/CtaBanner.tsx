import React from 'react';
import { ArrowRight, MessageCircle, Heart, Flame } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBooking }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].ctaBanner;

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#120307] via-[#2A060F] to-[#160408] text-white overflow-hidden" id="cta-banner">
      {/* Dynamic Gold & Burgundy Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#78132B]/30 rounded-full blur-[140px]" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E5C158]/15 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <Flame className="w-4 h-4 fill-[#E5C158]" />
          <span>{t.badge}</span>
        </div>

        <h2 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          {t.title1} <br />
          <span className="gold-gradient-text italic">{t.titleHighlight}</span>
        </h2>

        <p className="text-base sm:text-xl text-[#FAF5EE]/85 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.subtitle}
        </p>

        {/* Dual Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#E5C158] via-[#F3D784] to-[#D4AF37] text-[#2C0710] font-bold text-base shadow-2xl shadow-[#E5C158]/25 hover:shadow-[#E5C158]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>{t.btnBook}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <a
            href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
              language === 'ar'
                ? 'مرحباً ماما سيتا! 🌸 أنا جاهزة للانضمام للاستوديو في شبين الكوم.'
                : 'Hello MamaCita! I am ready to join the studio in Shebin El-Kom.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-[#FAF5EE] font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>{t.btnWhatsApp}</span>
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#FAF5EE]/70">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#E5C158]" /> {t.femaleOnly}
          </span>
          <span>•</span>
          <span>{t.noExpNeeded}</span>
          <span>•</span>
          <span>{t.location}</span>
        </div>
      </div>
    </section>
  );
};
