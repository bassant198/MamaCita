import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Award, Users, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { PRIVATE_BELLY_DANCE_PROGRAMS, STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface PrivateSessionsProps {
  onOpenBooking?: () => void;
}

export const PrivateSessions: React.FC<PrivateSessionsProps> = () => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].privatePrograms;
  const isAr = language === 'ar';

  const handleProgramWhatsApp = (programId: string, programName: string, price: number, cta: string) => {
    const msg = isAr
      ? `مرحباً استوديو ماماسيتا! 🌸%0A%0Aأود الاستفسار والتسجيل في *${programName}* (${price} جنيه مصري - ١٢ حصة).%0Aأرجو تزويدي بمواعيد البدء وكيفية تأكيد الحجز في استوديو شبين الكوم.`
      : `Hello MamaCita Studio! 🌸%0A%0AI would like to inquire about joining the *${programName}* (${price} EGP - 12 sessions).%0APlease provide available schedule slots and registration details in Shebin El-Kom studio.`;

    window.open(`https://wa.me/${STUDIO_INFO.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-24 bg-[#140307] text-[#FAF5EE] overflow-hidden" id="private-programs">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#E5C158]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#78132B]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#FAF5EE]/75 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E5C158]">
            {t.tagline}
          </div>
        </div>

        {/* 3 Distinct Belly Dance Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRIVATE_BELLY_DANCE_PROGRAMS.map((program, idx) => {
            const isBridal = program.id === 'bridal-belly-dance';
            const isPro = program.id === 'professional-belly-dance';
            const isGroup = program.id === 'beginner-group-belly-dance';

            const title = isAr && program.arabicName ? program.arabicName : program.name;
            const sessions = isAr && program.arabicSessionsCount ? program.arabicSessionsCount : program.sessionsCount;
            const badge = isAr && program.arabicTypeBadge ? program.arabicTypeBadge : program.typeBadge;
            const description = isAr && program.arabicDescription ? program.arabicDescription : program.description;
            const benefits = isAr && program.arabicBenefits ? program.arabicBenefits : program.benefits;
            const ctaText = isAr && program.arabicCtaText ? program.arabicCtaText : program.ctaText;
            const tagline = isAr && program.arabicTagline ? program.arabicTagline : program.tagline;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                  isBridal
                    ? 'bg-gradient-to-b from-[#2A0812] to-[#1C050B] border-[#E5C158]/50 shadow-2xl shadow-[#78132B]/30'
                    : isPro
                    ? 'bg-gradient-to-b from-[#22060E] to-[#160408] border-[#E5C158]/70 shadow-2xl shadow-[#E5C158]/10'
                    : 'bg-[#1C060B] border-white/15 hover:border-[#E5C158]/40 shadow-xl'
                }`}
              >
                {/* Top Badge & Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isBridal
                        ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/40'
                        : isPro
                        ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710]'
                        : 'bg-white/10 text-white/90 border border-white/20'
                    }`}>
                      {isBridal && <Crown className="w-3 h-3 text-[#E5C158]" />}
                      {isPro && <Award className="w-3 h-3 text-[#2C0710]" />}
                      {isGroup && <Users className="w-3 h-3 text-white/90" />}
                      <span>{badge}</span>
                    </span>

                    {/* Price in EGP */}
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#E5C158]">
                          {program.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-white/70">
                          {program.currency}
                        </span>
                      </div>
                      {isGroup && (
                        <span className="text-[10px] text-white/50 block">
                          {isAr ? 'للمشتركة' : 'per person'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Program Title */}
                  <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                    {title}
                  </h3>

                  {/* Sessions Count & Duration */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#E5C158] mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {sessions}
                    </span>
                    {program.duration && (
                      <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                        {isAr && program.arabicDuration ? program.arabicDuration : program.duration}
                      </span>
                    )}
                  </div>

                  {/* Tagline quote */}
                  <p className="text-xs italic text-white/60 mb-4 pb-3 border-b border-white/10">
                    "{tagline}"
                  </p>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-[#FAF5EE]/80 leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* Key Program Pillars / Highlights */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                      {isAr ? 'أهم محاور ومزايا البرنامج:' : 'Key Program Highlights:'}
                    </div>
                    {benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-[#E5C158] flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specific CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleProgramWhatsApp(program.id, title, program.price, ctaText)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] ${
                      isPro
                        ? 'bg-gradient-to-r from-[#E5C158] via-[#F3DE8A] to-[#D4AF37] text-[#2C0710] shadow-[#E5C158]/20 hover:shadow-lg'
                        : isBridal
                        ? 'bg-[#78132B] text-white hover:bg-[#8F1A34] border border-[#E5C158]/40'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {isBridal && <Heart className="w-3.5 h-3.5 fill-current" />}
                    {isPro && <Award className="w-3.5 h-3.5" />}
                    {isGroup && <Users className="w-3.5 h-3.5" />}
                    <span>{ctaText}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust & Privacy Guarantee */}
        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-xs text-white/60">
            {isAr
              ? 'جميع الكورسات تُقام في استوديو مغلق بخصوصية تامة ١٠٠٪ وبإشراف نسائي كامل في شبين الكوم • للحجز تواصلي معنا على واتساب 01036595205'
              : 'All programs take place in 100% private, women-only studios with complete discretion in Shebin El-Kom • To register, WhatsApp us at 01036595205'}
          </p>
        </div>
      </div>
    </section>
  );
};
