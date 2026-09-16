import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, EyeOff, Camera, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const SafeSpaceSanctuary: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].safeSpace;

  const privacyPillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#E5C158]" />,
      title: t.pillar1Title,
      desc: t.pillar1Desc,
    },
    {
      icon: <Lock className="w-6 h-6 text-[#E5C158]" />,
      title: t.pillar2Title,
      desc: t.pillar2Desc,
    },
    {
      icon: <EyeOff className="w-6 h-6 text-[#E5C158]" />,
      title: t.pillar3Title,
      desc: t.pillar3Desc,
    },
    {
      icon: <Camera className="w-6 h-6 text-[#E5C158]" />,
      title: t.pillar4Title,
      desc: t.pillar4Desc,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#1C060B] via-[#2A0711] to-[#1C060B] text-[#FAF5EE] overflow-hidden" id="safe-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t.title}
            </h2>

            <p className="text-base text-[#FAF5EE]/85 leading-relaxed">
              {t.p1}
            </p>

            <p className="text-sm text-[#FAF5EE]/75 leading-relaxed">
              {t.p2}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#E5C158] flex-shrink-0" />
              <span className="text-xs text-[#FAF5EE]/90">
                {t.familyTrust}
              </span>
            </div>
          </div>

          {/* Right 4 Privacy Feature Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {privacyPillars.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#160408]/90 border border-white/10 hover:border-[#E5C158]/40 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2C0710] border border-[#E5C158]/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif-title text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FAF5EE]/75 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
