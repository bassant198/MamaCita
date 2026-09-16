import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, User, ArrowRight } from 'lucide-react';
import { WEEKLY_SCHEDULE, STUDIO_INFO } from '../data/studioData';
import { ScheduleSlot } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface WeeklyScheduleProps {
  onBookSlot: (slot: ScheduleSlot) => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ onBookSlot }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].schedule;

  const days: ('Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  const [selectedDay, setSelectedDay] = useState<'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Saturday');
  const [periodFilter, setPeriodFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'dance' | 'fitness'>('all');

  const filteredSlots = useMemo(() => {
    return WEEKLY_SCHEDULE.filter((slot) => {
      const matchDay = slot.day === selectedDay;
      const matchPeriod = periodFilter === 'all' || slot.period === periodFilter;
      const matchCategory = categoryFilter === 'all' || slot.category === categoryFilter;
      return matchDay && matchPeriod && matchCategory;
    });
  }, [selectedDay, periodFilter, categoryFilter]);

  return (
    <section className="relative py-24 bg-[#120307] text-[#FAF5EE] overflow-hidden" id="schedule">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#5C0E20]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#FAF5EE]/75">
            {t.subtitle}
          </p>
        </div>

        {/* Days of Week Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {days.map((day) => {
            const isSelected = selectedDay === day;
            const count = WEEKLY_SCHEDULE.filter(s => s.day === day).length;
            const dayLabel = t.days[day] || day;
            const dayShort = t.daysShort[day] || day.slice(0, 3);

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 sm:px-5 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[100px] transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#E5C158] to-[#D4AF37] text-[#2C0710] shadow-lg shadow-[#E5C158]/20 scale-105 font-bold'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/80'
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-bold">
                  {dayShort}
                </span>
                <span className="text-sm sm:text-base font-serif-title mt-0.5 whitespace-nowrap">
                  {dayLabel}
                </span>
                <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#2C0710]/15 text-[#2C0710]' : 'bg-white/10 text-white/60'}`}>
                  {count} {t.classesCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter sub-bar: Morning vs Evening & Dance vs Fitness */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
          {/* Period toggles */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs uppercase tracking-wider text-white/50 font-bold mr-2 hidden sm:inline">
              {t.periodLabel}
            </span>
            <button
              onClick={() => setPeriodFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                periodFilter === 'all'
                  ? 'bg-[#E5C158] text-[#2C0710]'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {t.allPeriods}
            </button>
            <button
              onClick={() => setPeriodFilter('morning')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                periodFilter === 'morning'
                  ? 'bg-[#E5C158] text-[#2C0710]'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {t.morning}
            </button>
            <button
              onClick={() => setPeriodFilter('evening')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                periodFilter === 'evening'
                  ? 'bg-[#E5C158] text-[#2C0710]'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {t.evening}
            </button>
          </div>

          {/* Category toggle */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {t.allClasses}
            </button>
            <button
              onClick={() => setCategoryFilter('dance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === 'dance'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              💃 {t.danceOnly}
            </button>
            <button
              onClick={() => setCategoryFilter('fitness')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === 'fitness'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ⚡ {t.fitnessOnly}
            </button>
          </div>
        </div>

        {/* Schedule Slots List */}
        {filteredSlots.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-white/70 text-sm">
              {t.noSlots}
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            <AnimatePresence mode="popLayout">
              {filteredSlots.map((slot, idx) => {
                const isArabic = language === 'ar';
                const classTitle = isArabic && slot.arabicTitle ? slot.arabicTitle : slot.className;

                return (
                  <motion.div
                    layout
                    key={slot.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="p-4 sm:p-5 rounded-2xl bg-[#1C060B] border border-white/10 hover:border-[#E5C158]/50 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                  >
                    {/* Time & Period */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#E5C158] mb-1" />
                        <span className="text-xs font-bold text-white leading-none">
                          {slot.time.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-white/50 uppercase mt-0.5">
                          {slot.time.split(' ')[1]}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                              slot.category === 'dance'
                                ? 'bg-[#78132B] text-white'
                                : 'bg-[#2C0710] text-[#E5C158] border border-[#E5C158]/30'
                            }`}
                          >
                            {slot.category === 'dance' ? 'Dance' : 'Fitness'}
                          </span>
                          <span className="text-xs text-white/50">•</span>
                          <span className="text-xs text-white/70 font-medium">
                            {slot.duration}
                          </span>
                        </div>

                        <h3 className="font-serif-title text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-[#E5C158] transition-colors">
                          {classTitle}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-[#E5C158]" />
                            {isArabic ? 'مدربة ماماسيتا' : (slot.coachName || 'MamaCita Instructor')}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                            {isArabic ? (slot.room.includes('Studio A') ? 'استوديو (أ)' : 'استوديو (ب)') : slot.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Spots remaining & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                      <div className="text-right sm:text-left">
                        <div className="text-xs text-white/60 font-medium">
                          {t.capacity}
                        </div>
                        <div className="text-xs font-bold text-amber-400">
                          {slot.spotsLeft} {t.spotsLeft}
                        </div>
                      </div>

                      <button
                        onClick={() => onBookSlot(slot)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{t.bookSlot}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Note underneath schedule */}
        <div className="mt-8 text-center text-xs text-white/50">
          📍 {t.locationNote} • {STUDIO_INFO.shebinLandmark}
        </div>
      </div>
    </section>
  );
};
