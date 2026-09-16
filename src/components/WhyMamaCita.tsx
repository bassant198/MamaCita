import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Flame, Users, Music2, ArrowUpRight } from 'lucide-react';
import { STUDIO_PERKS } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface WhyMamaCitaProps {
  onOpenBooking: () => void;
}

export const WhyMamaCita: React.FC<WhyMamaCitaProps> = ({ onOpenBooking }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].why;

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#E5C158]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#E5C158]" />,
    Music: <Music2 className="w-6 h-6 text-[#E5C158]" />,
    HeartHandshake: <Heart className="w-6 h-6 text-[#E5C158]" />,
    Users: <Users className="w-6 h-6 text-[#E5C158]" />,
    Flame: <Flame className="w-6 h-6 text-[#E5C158]" />,
  };

  const perkTranslations = [
    { title: t.card1Title, desc: t.card1Desc },
    { title: t.card2Title, desc: t.card2Desc },
    { title: t.card3Title, desc: t.card3Desc },
    { title: t.card4Title, desc: t.card4Desc },
    { title: t.card5Title, desc: t.card5Desc },
    { title: t.card6Title, desc: t.card6Desc },
  ];

  return (
    <section className="relative py-24 bg-[#FAF5EE] text-[#2C0710] overflow-hidden" id="why-mamacita">
      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #78132B 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#78132B]/10 border border-[#78132B]/20 text-[#78132B] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#B38E22]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C060B] leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#2C0710]/75 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Feature Blocks with Elevated Tactility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STUDIO_PERKS.map((perk, idx) => {
            const localized = perkTranslations[idx] || { title: perk.title, desc: perk.description };
            return (
              <motion.div
                key={perk.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative p-7 rounded-2xl bg-white border border-[#EADBC8] shadow-lg shadow-[#78132B]/5 hover:shadow-xl hover:shadow-[#78132B]/10 hover:border-[#B38E22]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2C0710] flex items-center justify-center mb-5 shadow-md shadow-[#2C0710]/20 group-hover:scale-105 transition-transform duration-300">
                    {iconMap[perk.icon] || <Sparkles className="w-6 h-6 text-[#E5C158]" />}
                  </div>

                  <h3 className="font-serif-title text-xl font-bold text-[#1C060B] group-hover:text-[#78132B] transition-colors">
                    {localized.title}
                  </h3>

                  <p className="text-sm text-[#2C0710]/75 mt-2.5 leading-relaxed font-normal">
                    {localized.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#F5EBE1] flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#B38E22]">
                    0{idx + 1} // {language === 'ar' ? 'تميز' : 'Excellence'}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#78132B] group-hover:bg-[#78132B] group-hover:text-[#FAF5EE] transition-colors">
                    <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner in Ivory Section */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2C0710] to-[#5C0E20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-serif-title text-2xl font-bold">
              {language === 'ar' ? 'مستعدة لتجربة الفارق بنفسكِ؟' : 'Ready to feel the difference yourself?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF5EE]/80">
              {language === 'ar'
                ? 'احجزي حصتكِ التجريبية أو زوري الاستوديو في شبين الكوم للتعرف على المكان بنفسكِ.'
                : 'Book a discovery session or visit our Shebin El-Kom studio for a private walkthrough.'}
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
