import React from 'react';
import { Sparkles, Users, Award, Music, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const AboutSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].about;

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#120307] via-[#1C060B] to-[#120307] overflow-hidden" id="about">
      {/* Background soft ambient lights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#5C0E20]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E5C158]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Story Collage with 3D Depth */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Primary Image */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E5C158]/25 shadow-2xl aspect-[4/5] bg-[#2C0710]">
                <img
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80"
                  alt="Women dancing joyfully at MamaCita Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160408] via-transparent to-transparent opacity-80" />

                {/* Embedded Quote Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#1C060B]/90 border border-[#E5C158]/30 backdrop-blur-md">
                  <p className="font-serif-title italic text-sm md:text-base text-white">
                    "{t.quote}"
                  </p>
                  <span className="block text-xs uppercase tracking-widest text-[#E5C158] font-bold mt-2">
                    — {t.quoteAuthor}
                  </span>
                </div>
              </div>

              {/* Offset Secondary Image / Accent Frame */}
              <div className={`hidden sm:block absolute -top-8 ${isRTL ? '-left-8' : '-right-8'} w-48 h-48 rounded-2xl overflow-hidden border-2 border-[#E5C158]/40 shadow-2xl bg-[#2C0710] z-20`}>
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80"
                  alt="Fitness coaching at MamaCita"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Gold Circular Ring */}
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full border border-[#E5C158]/25 pointer-events-none -z-10 animate-spin" style={{ animationDuration: '40s' }} />
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/25 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.badge}</span>
              </div>
              <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
                {t.title}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#FAF5EE]/85 leading-relaxed">
              {t.p1}
            </p>

            <p className="text-sm sm:text-base text-[#FAF5EE]/75 leading-relaxed">
              {t.p2}
            </p>

            {/* Core Pillars Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <CheckCircle className="w-4 h-4 text-[#E5C158]" />
                  <span>{t.stats.staff}</span>
                </div>
                <p className="text-xs text-[#FAF5EE]/70 mt-1">
                  {language === 'ar' ? 'خصوصية كاملة وطاقم نسائي معتمد' : 'Private and secluded space'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Music className="w-4 h-4 text-[#E5C158]" />
                  <span>{t.stats.classes}</span>
                </div>
                <p className="text-xs text-[#FAF5EE]/70 mt-1">
                  {language === 'ar' ? 'تنوع غير مسبوق في شبين الكوم' : 'From traditional to high-intensity'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Users className="w-4 h-4 text-[#E5C158]" />
                  <span>{t.stats.members}</span>
                </div>
                <p className="text-xs text-[#FAF5EE]/70 mt-1">
                  {language === 'ar' ? 'مجتمع دافئ يدعم ثقتكِ بنفسكِ' : 'Welcoming sisterhood community'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Award className="w-4 h-4 text-[#E5C158]" />
                  <span>{t.stats.rating}</span>
                </div>
                <p className="text-xs text-[#FAF5EE]/70 mt-1">
                  {language === 'ar' ? 'أعلى تقييم ورضا من المشتركات' : 'Top rated female studio'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
