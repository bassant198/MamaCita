import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ALL_CLASSES } from '../data/studioData';
import { ClassItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface FeaturedClassesProps {
  onSelectClass: (classItem: ClassItem) => void;
}

export const FeaturedClasses: React.FC<FeaturedClassesProps> = ({ onSelectClass }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].featured;

  // Grab signature popular classes
  const featuredIds = ['belly-dance', 'latin-dance', 'zumba', 'pilates', 'kickboxing', 'power-mix'];
  const featuredList = ALL_CLASSES.filter(c => featuredIds.includes(c.id));
  const [activeTabId, setActiveTabId] = useState<string>(featuredList[0]?.id || 'belly-dance');

  const currentClass = featuredList.find(c => c.id === activeTabId) || featuredList[0];
  const displayTitle = language === 'ar' && currentClass.arabicTitle ? currentClass.arabicTitle : currentClass.title;

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#160408] via-[#24060E] to-[#160408] text-[#FAF5EE] overflow-hidden" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#FAF5EE]/75">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {featuredList.map((item) => {
            const itemLabel = language === 'ar' && item.arabicTitle ? item.arabicTitle : item.title;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTabId(item.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeTabId === item.id
                    ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] shadow-lg shadow-[#E5C158]/20 scale-105'
                    : 'bg-white/5 border border-white/10 text-[#FAF5EE]/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {itemLabel}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Interactive Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentClass.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#1A040A]/90 border border-[#E5C158]/25 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
          >
            {/* Left Photo & Visual Aura */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={currentClass.imageUrl}
                  alt={currentClass.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160408] via-transparent to-black/20" />

                {/* Floating energy pulse indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5C158] animate-ping" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    {currentClass.intensity} {t.intensityTag}
                  </span>
                </div>

                {/* Simulated Audio Rhythmic Beat Wave */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-end gap-1 h-6">
                      <span className="w-1 bg-[#E5C158] rounded-full h-3 animate-pulse" />
                      <span className="w-1 bg-[#E5C158] rounded-full h-5 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1 bg-[#E5C158] rounded-full h-6 animate-pulse" style={{ animationDelay: '0.4s' }} />
                      <span className="w-1 bg-[#E5C158] rounded-full h-4 animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 bg-[#E5C158] rounded-full h-2 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                    <div className="text-xs text-white/90">
                      <span className="text-[10px] uppercase text-[#E5C158] block font-bold">{t.tempoLabel}</span>
                      <span className="font-medium truncate">{currentClass.musicVibe}</span>
                    </div>
                  </div>
                  <span className="text-xs text-white/70 font-semibold hidden sm:inline">
                    🔥 {currentClass.caloriesBurn}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Details & Booking Action */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                  <span>{currentClass.category === 'dance' ? (language === 'ar' ? 'كلاس رقص' : 'Dance Category') : (language === 'ar' ? 'كلاس لياقة' : 'Fitness Category')}</span>
                  <span>•</span>
                  <span>{currentClass.duration}</span>
                </div>
                <h3 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mt-1">
                  {displayTitle}
                </h3>
                <p className="text-sm text-[#E5C158] font-medium mt-1 italic">
                  "{currentClass.tagline}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#FAF5EE]/80 leading-relaxed">
                {currentClass.description}
              </p>

              {/* Stat Pillars */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs uppercase text-[#FAF5EE]/60 font-medium">{t.calBurnLabel}</div>
                  <div className="text-lg font-bold text-[#E5C158] mt-0.5">{currentClass.caloriesBurn}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs uppercase text-[#FAF5EE]/60 font-medium">{t.durationLabel}</div>
                  <div className="text-lg font-bold text-white mt-0.5">{currentClass.duration}</div>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#FAF5EE]/70">
                  {t.benefitsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentClass.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#E5C158] flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onSelectClass(currentClass)}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] font-bold text-sm shadow-xl hover:shadow-[#E5C158]/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.bookBtn}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <div className="text-xs text-[#FAF5EE]/70 text-center sm:text-left">
                  {t.limitedSpots}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
