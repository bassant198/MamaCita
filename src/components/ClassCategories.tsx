import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Clock, Music, Search, ArrowRight } from 'lucide-react';
import { ALL_CLASSES } from '../data/studioData';
import { ClassCategory, ClassItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ClassCategoriesProps {
  onSelectClass: (classItem: ClassItem) => void;
}

export const ClassCategories: React.FC<ClassCategoriesProps> = ({ onSelectClass }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].classes;

  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>('all');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClasses = useMemo(() => {
    return ALL_CLASSES.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchIntensity = selectedIntensity === 'all' || item.intensity === selectedIntensity;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.arabicTitle && item.arabicTitle.includes(searchQuery)) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchIntensity && matchSearch;
    });
  }, [selectedCategory, selectedIntensity, searchQuery]);

  const danceCount = ALL_CLASSES.filter(c => c.category === 'dance').length;
  const fitnessCount = ALL_CLASSES.filter(c => c.category === 'fitness').length;

  const intensityMap: Record<string, string> = {
    all: t.intensityAll,
    Gentle: t.intensityGentle,
    Moderate: t.intensityModerate,
    'High Energy': t.intensityHigh,
    Intense: t.intensityIntense,
  };

  return (
    <section className="relative py-24 bg-[#120307] text-[#FAF5EE] overflow-hidden" id="classes">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#78132B]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#E5C158]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white leading-tight">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#FAF5EE]/75">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 text-[#E5C158] absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2.5 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors ${
                isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
              }`}
            />
          </div>
        </div>

        {/* Filter Controls: Category Pills & Intensity Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 w-fit overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] shadow-md'
                  : 'text-[#FAF5EE]/70 hover:text-white'
              }`}
            >
              {t.tabAll} ({ALL_CLASSES.length})
            </button>

            <button
              onClick={() => setSelectedCategory('dance')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'dance'
                  ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] shadow-md'
                  : 'text-[#FAF5EE]/70 hover:text-white'
              }`}
            >
              {t.tabDance} ({danceCount})
            </button>

            <button
              onClick={() => setSelectedCategory('fitness')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'fitness'
                  ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] shadow-md'
                  : 'text-[#FAF5EE]/70 hover:text-white'
              }`}
            >
              {t.tabFitness} ({fitnessCount})
            </button>
          </div>

          {/* Intensity Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs uppercase tracking-wider text-[#FAF5EE]/50 font-bold mr-1 hidden lg:inline">
              {t.intensityLabel}
            </span>
            {['all', 'Gentle', 'Moderate', 'High Energy', 'Intense'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedIntensity(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedIntensity === lvl
                    ? 'bg-[#5C0E20] text-[#E5C158] border border-[#E5C158]/40'
                    : 'bg-white/5 text-[#FAF5EE]/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {intensityMap[lvl] || lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-base text-white/70">{t.noResults}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedIntensity('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-full bg-[#E5C158] text-[#2C0710] font-semibold text-xs"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredClasses.map((item, idx) => {
                const displayTitle = language === 'ar' && item.arabicTitle ? item.arabicTitle : item.title;
                const secondaryTitle = language === 'ar' ? item.title : item.arabicTitle;

                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="group relative rounded-2xl bg-[#1C060B] border border-white/10 hover:border-[#E5C158]/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#5C0E20]/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual Photo Header */}
                      <div className="relative h-52 w-full overflow-hidden bg-[#2C0710]">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C060B] via-black/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                              item.category === 'dance'
                                ? 'bg-[#78132B]/80 text-[#FFF1D0] border border-[#E5C158]/40'
                                : 'bg-[#2C0710]/80 text-[#E5C158] border border-[#E5C158]/40'
                            }`}
                          >
                            {item.category === 'dance' ? '💃 Dance' : '⚡ Fitness'}
                          </span>

                          {item.isPopular && (
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E5C158] text-[#2C0710] shadow-sm">
                              {t.popular}
                            </span>
                          )}
                        </div>

                        {/* Bottom Info on Image */}
                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-[#FAF5EE]/90">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#E5C158]" /> {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-400" /> {item.caloriesBurn}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 space-y-3.5">
                        <div>
                          <div className="flex items-baseline justify-between gap-2">
                            <h3 className="font-serif-title text-xl font-bold text-white group-hover:text-[#E5C158] transition-colors">
                              {displayTitle}
                            </h3>
                            {secondaryTitle && (
                              <span className="text-xs text-[#E5C158]/80 font-medium">
                                {secondaryTitle}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#E5C158] font-medium mt-1">
                            {item.tagline}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-[#FAF5EE]/75 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Music tempo and vibe */}
                        <div className="flex items-center gap-1.5 text-xs text-[#FAF5EE]/60 pt-1">
                          <Music className="w-3.5 h-3.5 text-[#E5C158] flex-shrink-0" />
                          <span className="truncate">{item.musicVibe}</span>
                        </div>

                        {/* Benefits chips */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.benefits.map((b) => (
                            <span
                              key={b}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-[#FAF5EE]/80 border border-white/5"
                            >
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onSelectClass(item)}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E5C158] border border-white/10 hover:border-[#E5C158] text-white hover:text-[#2C0710] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group/btn"
                      >
                        <span>{t.bookBtn}</span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1 rotate-180' : 'group-hover/btn:translate-x-1'}`} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
