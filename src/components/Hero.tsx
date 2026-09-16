import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Flame, Star, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreClasses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreClasses }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].hero;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden" id="hero">
      {/* Dynamic Ambient Background Glows & Spatial Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#78132B]/25 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#5C0E20]/30 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-[#E5C158]/10 rounded-full blur-[100px]" />
        {/* Subtle mesh grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFF 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Elegantly Blended Official Logo Background Watermark (Eye-Comfort & Luxury Studio Vibe) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none z-0">
        <div
          className="relative w-[540px] sm:w-[720px] lg:w-[900px] aspect-square rounded-full flex items-center justify-center opacity-[0.09] lg:opacity-[0.12] transition-opacity duration-1000"
          style={{
            maskImage:
              'radial-gradient(circle at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 55%, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 55%, transparent 72%)',
          }}
        >
          <img
            src="/assets/mamacita-logo.png"
            alt="MamaCita Studio Watermark Emblem"
            aria-hidden="true"
            className="w-full h-full object-contain filter contrast-125 brightness-95 mix-blend-screen scale-105"
          />
        </div>

        {/* Ambient Dark & Burgundy Vignette Overlays to guarantee high text contrast and eye comfort */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120407]/90 via-transparent to-[#120407]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120407]/85 via-transparent to-[#120407]/85" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 space-y-7 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#E5C158]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E5C158]">
                {t.badge}
              </span>
            </div>

            {/* Main Powerful Headline */}
            <h1 className="font-serif-title text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12]">
              {t.title1}{' '}
              <br />
              <span className="italic font-normal gold-gradient-text">
                {t.titleHighlight}
              </span>
            </h1>

            {/* Short Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#FAF5EE]/80 max-w-xl font-normal leading-relaxed">
              {t.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-[#E5C158] via-[#F3D784] to-[#D4AF37] text-[#2C0710] font-bold text-base shadow-xl shadow-[#E5C158]/20 hover:shadow-[#E5C158]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>

              <button
                onClick={onExploreClasses}
                className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-[#FAF5EE] font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-sm"
              >
                <Compass className="w-5 h-5 text-[#E5C158]" />
                <span>{t.ctaSecondary}</span>
              </button>
            </div>

            {/* Quick Proof Metrics / Stat Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-title text-[#E5C158]">
                  100%
                </div>
                <div className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider font-medium mt-0.5">
                  {language === 'ar' ? 'سيدات فقط' : 'Female Only'}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-title text-white">
                  18+
                </div>
                <div className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider font-medium mt-0.5">
                  {language === 'ar' ? 'أسلوب رقص ولياقة' : 'Dance & Fitness Styles'}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-title text-[#E5C158]">
                  5+
                </div>
                <div className="text-xs text-[#FAF5EE]/70 uppercase tracking-wider font-medium mt-0.5">
                  {language === 'ar' ? 'مدربات معتمدات' : 'Certified Coaches'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D-Inspired Layered Hero Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Perspective floating stage container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-[#78132B]/40 via-[#2C0710]/80 to-[#160408] border border-[#E5C158]/30 shadow-2xl shadow-black/80 backdrop-blur-xl">
              {/* Inner Frame with Main Dancer Photo */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=85"
                  alt="MamaCita Dance & Fitness Studio Experience"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient darkening at bottom for readable badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160408] via-transparent to-black/20" />

                {/* Subtle gold border rim */}
                <div className="absolute inset-0 border border-[#E5C158]/20 rounded-2xl pointer-events-none" />

                {/* Floating Bottom Card: Shebin Studio Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#1C060B]/90 border border-[#E5C158]/30 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#E5C158] font-bold uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 fill-[#E5C158]" />
                        <span>{t.liveVibeTitle}</span>
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        {t.liveVibeSub}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#E5C158]/20 text-[#E5C158] text-[11px] font-bold">
                      {language === 'ar' ? 'طاقة حية' : 'Live Vibe'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating 3D Badge 1: Top Corner - Privacy Guarantee */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-5 ${isRTL ? '-left-5 sm:-left-8' : '-right-5 sm:-right-8'} p-3.5 rounded-2xl bg-[#2C0710]/95 border border-[#E5C158]/40 shadow-2xl backdrop-blur-xl flex items-center gap-3 z-20`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#E5C158]">
                    {t.safetyBadge}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {t.privacyBadge}
                  </div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 2: Bottom Corner - Community Rating */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-5 ${isRTL ? '-right-5 sm:-right-8' : '-left-5 sm:-left-8'} p-3.5 rounded-2xl bg-[#2C0710]/95 border border-[#E5C158]/40 shadow-2xl backdrop-blur-xl flex items-center gap-3 z-20`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <span>5.0</span>
                    <span className="text-[#E5C158]">★★★★★</span>
                  </div>
                  <div className="text-[11px] text-[#FAF5EE]/70 font-medium">
                    {t.activeMembers}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
