import React from 'react';
import { BrandLogo } from './BrandLogo';
import { STUDIO_INFO } from '../data/studioData';
import { MapPin, Phone, MessageCircle, Instagram, Heart, ArrowUp, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import { LanguageSwitch } from './LanguageSwitch';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const danceLinks = language === 'ar' ? [
    'رقص شرقي (كلاسيكي وطبلة)',
    'لاتيني وسالسا فيوجن',
    'كي بوب كوريوغرافي',
    'صعيدي بالعصاية فلكلوري',
    'رقص خليجي استعراضي',
    'هيب هوب وأوربان دانس',
  ] : [
    'Belly Dance (Sharqi)',
    'Latin Fusion (Salsa/Bachata)',
    'K-Pop Choreography',
    'Saidi Assaya Folkloric',
    'Khaliji Dance',
    'Hip Hop & Urban',
  ];

  const fitnessLinks = language === 'ar' ? [
    'زومبا فيتنس فييستا',
    'مات بيلاتس ونحت الكور',
    'كيك بوكسينغ للسيدات',
    'نحت الجزء السفلي والأرداف',
    'تاباتا وهيت حرق دهون',
    'فينيازا يوجا فلو',
  ] : [
    'Zumba Fitness Party',
    'Mat Pilates & Core',
    'Women Kickboxing',
    'Glutes & Legs Sculpt',
    'Tabata HIIT Burn',
    'Vinyasa Yoga Flow',
  ];

  return (
    <footer className="relative bg-[#0C0205] text-[#FAF5EE] pt-20 pb-12 border-t border-[#E5C158]/20 overflow-hidden" id="footer">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-[#78132B]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo size="lg" />
            <p className="text-xs sm:text-sm text-[#FAF5EE]/75 leading-relaxed max-w-sm">
              {t.aboutDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 flex items-center justify-center text-white hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/40 flex items-center justify-center text-white hover:text-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <LanguageSwitch variant="pill" />

              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-full bg-[#E5C158] text-[#2C0710] text-xs font-bold hover:bg-[#F3D784] transition-colors cursor-pointer"
              >
                {t.bookSession}
              </button>
            </div>
          </div>

          {/* Dance Styles Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-title font-bold text-base text-white border-b border-white/10 pb-2">
              {t.danceStyles}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF5EE]/70">
              {danceLinks.map((item) => (
                <li key={item}>
                  <a href="#classes" className="hover:text-[#E5C158] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Fitness Styles Col */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-title font-bold text-base text-white border-b border-white/10 pb-2">
              {t.fitnessStyles}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF5EE]/70">
              {fitnessLinks.map((item) => (
                <li key={item}>
                  <a href="#classes" className="hover:text-[#E5C158] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Visit & Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-title font-bold text-base text-white border-b border-white/10 pb-2">
              {t.studioInfo}
            </h4>
            <div className="space-y-3 text-xs text-[#FAF5EE]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5C158] flex-shrink-0 mt-0.5" />
                <span>{language === 'ar' ? STUDIO_INFO.addressArabic : STUDIO_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5C158] flex-shrink-0" />
                <span dir="ltr">{STUDIO_INFO.phoneFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <span>WhatsApp: {STUDIO_INFO.whatsappFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1 border-t border-white/10">
                <PhoneCall className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>
                  {language === 'ar' ? 'شكاوى الإدارة:' : 'Complaints:'}{' '}
                  <a
                    href={`tel:${STUDIO_INFO.complaintsPhone}`}
                    className="font-mono text-white hover:text-[#E5C158] font-bold"
                    dir="ltr"
                  >
                    {STUDIO_INFO.complaintsPhone}
                  </a>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#E5C158] font-semibold">
                ✓ {t.femaleOnlyBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} MamaCita Dance & Fitness Studio. {t.rights}</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the women of Shebin El-Kom
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
