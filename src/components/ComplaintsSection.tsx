import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  PhoneCall,
  MessageCircle,
  Copy,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Lock,
  Sparkles,
  Send,
  HeartHandshake,
  Users,
  Flame,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const ComplaintsSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].complaints;
  const isAr = language === 'ar';

  const [copied, setCopied] = useState(false);
  const [category, setCategory] = useState<'complaint' | 'suggestion' | 'inquiry'>('complaint');
  const [name, setName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const complaintsPhone = STUDIO_INFO.complaintsPhone || '01221726313';
  const complaintsWhatsapp = STUDIO_INFO.complaintsWhatsapp || '201221726313';

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(complaintsPhone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const categoryText =
      category === 'complaint'
        ? isAr
          ? '🚨 شكوى خاصة بالاستوديو'
          : '🚨 Studio Complaint'
        : category === 'suggestion'
        ? isAr
          ? '💡 اقتراح لتطوير المكان'
          : '💡 Studio Suggestion'
        : isAr
        ? '❓ استفسار خاص للإدارة'
        : '❓ Management Inquiry';

    const formattedMessage = isAr
      ? `مرحباً إدارة استوديو ماماسيتا،%0A%0A*نوع الرسالة:* ${categoryText}%0A*الاسم:* ${name.trim() || 'مشتركة (هوية سرية)'}%0A*الهاتف:* ${clientPhone.trim() || 'غير محدد'}%0A%0A*تفاصيل الشكوى / الملاحظة:*%0A${encodeURIComponent(message)}%0A%0Aبرجاء المتابعة والرد من الإدارة. شكراً لكم.`
      : `Hello MamaCita Management,%0A%0A*Type:* ${categoryText}%0A*Name:* ${name.trim() || 'Anonymous Member'}%0A*Phone:* ${clientPhone.trim() || 'Not provided'}%0A%0A*Details:*%0A${encodeURIComponent(message)}%0A%0APlease review and follow up. Thank you.`;

    window.open(`https://wa.me/${complaintsWhatsapp}?text=${formattedMessage}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section
      className="relative py-20 sm:py-24 bg-[#140307] text-[#FAF5EE] overflow-hidden border-t border-[#E5C158]/20"
      id="complaints"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#78132B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Hero Hotline Card (Prominent Callout for 01221726313) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#24060E] to-[#170308] border-2 border-[#E5C158]/50 shadow-2xl p-6 sm:p-10 mb-14 relative overflow-hidden"
        >
          {/* Subtle gold badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>{isAr ? 'سرية تامة ١٠٠٪' : '100% Confidential'}</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Phone details */}
            <div className="space-y-3 text-center md:text-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E5C158] block">
                {t.phoneLabel}
              </span>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E5C158] text-[#2C0710] flex items-center justify-center shadow-lg shadow-[#E5C158]/20 flex-shrink-0">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <a
                  href={`tel:${complaintsPhone}`}
                  className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white hover:text-[#E5C158] transition-colors"
                  dir="ltr"
                >
                  {complaintsPhone}
                </a>
              </div>
              <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
                {t.guaranteeDesc}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              {/* Direct Phone Call */}
              <a
                href={`tel:${complaintsPhone}`}
                className="py-3.5 px-6 rounded-2xl bg-[#E5C158] hover:bg-[#F3D784] text-[#2C0710] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.callNow}</span>
              </a>

              {/* Direct WhatsApp to Complaints Number */}
              <a
                href={`https://wa.me/${complaintsWhatsapp}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحباً إدارة استوديو ماماسيتا، أود تسجيل شكوى / ملاحظة خاصة.'
                    : 'Hello MamaCita Studio Management, I would like to submit a feedback/complaint.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.whatsappNow}</span>
              </a>

              {/* Copy Number */}
              <button
                type="button"
                onClick={handleCopyNumber}
                className="py-2.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#E5C158]" />
                    <span>{t.copyNumber}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars of Attention */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-serif-title font-bold text-base text-white">
              {t.box1Title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {t.box1Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-serif-title font-bold text-base text-white">
              {t.box2Title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {t.box2Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif-title font-bold text-base text-white">
              {t.box3Title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {t.box3Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5C158]/40 transition-colors space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5C158]/15 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif-title font-bold text-base text-white">
              {t.box4Title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {t.box4Desc}
            </p>
          </div>
        </div>

        {/* Direct Form Box */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#1F050D] border border-white/15 p-6 sm:p-9 shadow-xl">
          <div className="text-center mb-6 space-y-1.5">
            <h3 className="font-serif-title text-2xl font-bold text-white">
              {t.quickFormTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              {t.quickFormSub}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-serif-title text-xl font-bold text-white">
                {isAr ? 'تم فتح محادثة الواتساب مع رقم الإدارة بنجاح! 🌸' : 'WhatsApp conversation opened with management!'}
              </h4>
              <p className="text-xs text-white/80 max-w-md mx-auto">
                {isAr
                  ? `أرسلي الرسالة المجهزة الآن عبر واتساب إلى الرقم ${complaintsPhone} وسيتم الرد عليكِ ومتابعة الشكوى باهتمام وسرية تامة.`
                  : `Send your prepared message on WhatsApp to ${complaintsPhone} and senior management will handle it with utmost care.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="text-xs text-[#E5C158] font-bold underline cursor-pointer hover:text-white transition-colors"
              >
                {isAr ? 'كتابة رسالة أخرى للإدارة' : 'Write another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Category Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  {t.typeLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCategory('complaint')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      category === 'complaint'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-sm'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {t.typeComplaint}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('suggestion')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      category === 'suggestion'
                        ? 'bg-[#E5C158]/20 text-[#E5C158] border-[#E5C158]/60 shadow-sm'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {t.typeSuggestion}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('inquiry')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      category === 'inquiry'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-sm'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {t.typeInquiry}
                  </button>
                </div>
              </div>

              {/* Optional Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    {t.nameOptional}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'يمكنكِ تركه فارغاً لسرية الهوية' : 'Leave empty for anonymity'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    {t.phoneOptional}
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={isAr ? 'رقم هاتفكِ (اختياري)' : 'Phone number (optional)'}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                  {t.msgLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.msgPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-white/60 text-center">
                <Lock className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>
                  {isAr
                    ? 'يتم إرسال الرسالة مباشرة إلى الرقم 01221726313 الخاص بإدارة استوديو ماماسيتا'
                    : 'Transmitted straight to 01221726313 dedicated to MamaCita studio management'}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
