import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Camera, Armchair, SunMedium, HeartHandshake, Instagram, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import { STUDIO_INFO } from '../data/studioData';

export const StudioExperience: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].reception;
  const isAr = language === 'ar';

  const receptionHighlights = [
    {
      id: 'sofas',
      icon: Armchair,
      title: t.feature1Title,
      desc: t.feature1Desc,
    },
    {
      id: 'mirrors',
      icon: SunMedium,
      title: t.feature2Title,
      desc: t.feature2Desc,
    },
    {
      id: 'photos',
      icon: Camera,
      title: t.feature3Title,
      desc: t.feature3Desc,
    },
    {
      id: 'atmosphere',
      icon: HeartHandshake,
      title: t.feature4Title,
      desc: t.feature4Desc,
    },
  ];

  return (
    <section className="relative py-24 bg-[#160408] text-[#FAF5EE] overflow-hidden" id="experience">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#E5C158]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#78132B]/20 blur-3xl pointer-events-none" />

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
          <p className="text-base sm:text-lg text-[#E5C158] font-medium max-w-2xl mx-auto">
            "{t.tagline}"
          </p>
          <p className="text-sm sm:text-base text-[#FAF5EE]/75 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Grid & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left / Top: Aesthetic Photo Gallery Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
                alt="MamaCita Reception & Waiting Lounge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160408] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 inset-x-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#E5C158] text-[#2C0710] text-xs font-bold uppercase tracking-wider mb-2">
                  {isAr ? 'تصميم عصري ودافئ' : 'Chic & Comfortable'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-white">
                  {isAr ? 'صالة الاستقبال والانتظار في ماماسيتا' : 'MamaCita Reception & Waiting Lounge'}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  {isAr 
                    ? 'أرائك مريحة ومرايا واسعة بانتظاركِ قبل كل كلاس' 
                    : 'Relax on plush sofas and capture your moments with friends'}
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5C158]/50 transition-all flex items-center justify-center gap-2 text-xs font-semibold text-white/90 hover:text-[#E5C158]"
              >
                <Instagram className="w-4 h-4 text-[#E5C158]" />
                <span>{isAr ? 'تابعي ماماسيتا على انستجرام' : 'Follow MamaCita on Instagram'}</span>
              </a>
              <a
                href={`https://wa.me/201036595205?text=${encodeURIComponent(isAr ? 'مرحباً استوديو ماماسيتا، أود الاستفسار عن الكلاسات والمواعيد' : 'Hello MamaCita, I would like to inquire about classes and timings')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-[#2C0710] border border-[#E5C158]/40 hover:bg-[#78132B] transition-all flex items-center justify-center gap-2 text-xs font-semibold text-[#E5C158]"
              >
                <MessageCircle className="w-4 h-4 text-[#E5C158]" />
                <span>{isAr ? 'تحدثي معنا عبر واتساب' : 'Chat With Us on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Right: Key Reception Highlights */}
          <div className="lg:col-span-6 space-y-4">
            {receptionHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="p-5 rounded-2xl bg-[#1F050D] border border-white/10 hover:border-[#E5C158]/40 transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5C158] flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif-title text-base sm:text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF5EE]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Studio Spaces Highlights (Without any wood flooring references) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C158]">
              {isAr ? 'قاعة الرقص' : 'Dance Studio'}
            </span>
            <h4 className="font-serif-title text-lg font-bold text-white">
              {isAr ? 'استوديوهات رقص رحبة' : 'Spacious Dance Studios'}
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF5EE]/70 leading-relaxed">
              {isAr
                ? 'قاعات واسعة ومكيفة بأنظمة صوتيات نقية وإضاءات تفاعلية مستوحاة من أجواء المسرح والاحتفال.'
                : 'Expansive air-conditioned studios with immersive acoustics and dynamic party lighting for every rhythm.'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#E5C158] pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'مرايا بانورامية كاملة' : 'Full panoramic wall mirrors'}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C158]">
              {isAr ? 'قاعة اللياقة' : 'Fitness Studio'}
            </span>
            <h4 className="font-serif-title text-lg font-bold text-white">
              {isAr ? 'استوديو البيلاتس ونحت القوام' : 'Pilates & Sculpt Studio'}
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF5EE]/70 leading-relaxed">
              {isAr
                ? 'بيئة هادئة ومجهزة بماتس طبية عالية الكثافة وأدوات المقاومة المخصصة لتقوية عضلات البطن والقوام.'
                : 'Restorative haven equipped with high-density mats and resistance tools for core conditioning and posture.'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#E5C158] pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'أدوات وماتس رياضية مجهزة' : 'Equipped with mats & resistance bands'}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C158]">
              {isAr ? 'الخصوصية' : 'Changing Suites'}
            </span>
            <h4 className="font-serif-title text-lg font-bold text-white">
              {isAr ? 'غرف تبديل الملابس والخزائن' : 'Private Changing Suites & Lockers'}
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF5EE]/70 leading-relaxed">
              {isAr
                ? 'كبائن تبديل ملابس مغلقة وخزائن أمان خاصة مع مرايا مضيئة لمساعدتكِ على الاستعداد براحة تامة.'
                : 'Private changing cabins, secure lockers, and illuminated mirrors allowing you to change and prepare in complete comfort.'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#E5C158] pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'خصوصية تامة ١٠٠٪' : '100% Female Privacy'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
