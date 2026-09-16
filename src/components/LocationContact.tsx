import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Instagram, Send, CheckCircle2, Navigation, ShieldCheck, PhoneCall } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const LocationContact: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].contact;

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formInterest, setFormInterest] = useState('Belly Dance / Oriental');
  const [formMsg, setFormMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = language === 'ar'
      ? `مرحباً استوديو ماما سيتا! 🌸%0A%0Aالاسم: *${formName}*%0Aالهاتف: *${formPhone}*%0Aالاهتمام: *${formInterest}*%0A${formMsg ? `رسالة: ${encodeURIComponent(formMsg)}%0A` : ''}%0Aأود الاستفسار عن كلاسات واشتراكات استوديو شبين الكوم.`
      : `Hello MamaCita! 🌸%0A%0AMy Name: *${formName}*%0APhone: *${formPhone}*%0AInterested In: *${formInterest}*%0A${formMsg ? `Message: ${encodeURIComponent(formMsg)}%0A` : ''}%0AI would like information on visiting the Shebin El-Kom studio.`;

    window.open(`https://wa.me/${STUDIO_INFO.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 bg-[#FAF5EE] text-[#2C0710] overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#78132B]/10 border border-[#78132B]/20 text-[#78132B] text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#B38E22]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C060B] leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#2C0710]/75">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Studio Details & Interactive Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#EADBC8] shadow-lg space-y-6">
              <h3 className="font-serif-title text-2xl font-bold text-[#1C060B]">
                {t.locationCardTitle}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2C0710] text-[#E5C158] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#78132B]">
                    {t.addressLabel}
                  </div>
                  <div className="text-sm font-semibold text-[#1C060B] mt-0.5">
                    {language === 'ar' ? STUDIO_INFO.addressArabic : STUDIO_INFO.address}
                  </div>
                  <div className="text-xs text-[#2C0710]/70 mt-0.5">
                    {language === 'ar' ? 'بالقرب من حي الاستاد • شبين الكوم، المنوفية' : 'Near Stadium District • Shebin El-Kom, Monufia, Egypt'}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2C0710] text-[#E5C158] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#78132B]">
                    {t.hoursLabel}
                  </div>
                  <div className="text-sm font-semibold text-[#1C060B] mt-0.5">
                    {language === 'ar' ? 'السبت - الخميس: 9:00 ص - 9:30 م' : 'Saturday – Thursday: 9:00 AM – 9:30 PM'}
                  </div>
                  <div className="text-xs text-[#2C0710]/70 mt-0.5">
                    {language === 'ar' ? 'الجمعة: 1:30 م - 8:30 م (كلاسات خاصة وورش عمل)' : 'Friday: 1:30 PM – 8:30 PM (Special Workshops & Private Masterclasses)'}
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2C0710] text-[#E5C158] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#78132B]">
                    {t.phoneLabel}
                  </div>
                  <div className="text-sm font-semibold text-[#1C060B] mt-0.5" dir="ltr">
                    {STUDIO_INFO.phoneFormatted}
                  </div>
                  <div className="text-xs text-[#2C0710]/70 mt-0.5">
                    {language === 'ar' ? 'فريق خدمة المشتركات جاهز للرد على استفساراتكِ والحجز' : 'Dedicated female customer care team ready to assist & book'}
                  </div>
                </div>
              </div>

              {/* Complaints & Management Hotline */}
              <div className="p-4 rounded-2xl bg-[#78132B]/8 border border-[#78132B]/20 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#78132B] text-[#E5C158] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#78132B]">
                      {language === 'ar' ? 'الخط المباشر للشكاوى والمقترحات' : 'Complaints & Management Line'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700">
                      {language === 'ar' ? 'سرية تامة' : 'Confidential'}
                    </span>
                  </div>
                  <a
                    href={`tel:${STUDIO_INFO.complaintsPhone}`}
                    className="font-mono text-base font-bold text-[#1C060B] hover:text-[#78132B] block mt-0.5"
                    dir="ltr"
                  >
                    {STUDIO_INFO.complaintsPhone}
                  </a>
                  <p className="text-[11px] text-[#2C0710]/70 mt-0.5">
                    {language === 'ar'
                      ? 'مخصص لاستقبال أي ملاحظة أو شكوى وتوصيلها مباشرة للإدارة.'
                      : 'Direct line to senior management for complaints & constructive feedback.'}
                  </p>
                </div>
              </div>

              {/* Action Link: Google Maps Navigation */}
              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(STUDIO_INFO.name + ' Shebin El-Kom Monufia')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#FAF5EE] hover:bg-[#2C0710] text-[#2C0710] hover:text-[#FAF5EE] border border-[#EADBC8] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#B38E22]" />
                  <span>{t.openMaps}</span>
                </a>
              </div>
            </div>

            {/* Social quick links */}
            <div className="p-6 rounded-2xl bg-white border border-[#EADBC8] flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C060B]">
                {language === 'ar' ? 'تابعونا على إنستجرام' : 'Follow our Instagram vibes'}
              </span>
              <a
                href={`https://instagram.com/${STUDIO_INFO.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-[#78132B] hover:text-[#B38E22] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>{STUDIO_INFO.instagram}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Contact & Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EADBC8] shadow-lg">
              <h3 className="font-serif-title text-2xl font-bold text-[#1C060B] mb-2">
                {t.formTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C0710]/75 mb-6">
                {t.formSub}
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#78132B]/5 border border-[#78132B]/20 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#78132B] mx-auto" />
                  <h4 className="font-serif-title text-xl font-bold text-[#1C060B]">
                    {language === 'ar' ? 'شكراً لتواصلكِ معنا! 🌸' : 'Thank you!'}
                  </h4>
                  <p className="text-xs text-[#2C0710]/80">
                    {language === 'ar'
                      ? 'تم تحويل رسالتكِ لفريق الواتساب، وسنرد عليكِ في أسرع وقت.'
                      : 'Your inquiry has been directed to our WhatsApp desk. We look forward to seeing you!'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#78132B] font-bold underline cursor-pointer"
                  >
                    {language === 'ar' ? 'إرسال استفسار آخر' : 'Send another inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C060B] uppercase tracking-wider mb-1.5">
                      {t.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: سارة أحمد' : 'e.g. Sara Ahmed'}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF5EE] border border-[#EADBC8] text-sm text-[#1C060B] focus:outline-none focus:border-[#78132B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C060B] uppercase tracking-wider mb-1.5">
                      {t.phoneLabel} (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="010XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF5EE] border border-[#EADBC8] text-sm text-[#1C060B] focus:outline-none focus:border-[#78132B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C060B] uppercase tracking-wider mb-1.5">
                      {t.interestLabel}
                    </label>
                    <select
                      value={formInterest}
                      onChange={(e) => setFormInterest(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF5EE] border border-[#EADBC8] text-sm text-[#1C060B] focus:outline-none focus:border-[#78132B] transition-colors cursor-pointer"
                    >
                      <option value="Belly Dance / Oriental">{language === 'ar' ? 'رقص شرقي / Belly Dance' : 'Belly Dance / Oriental'}</option>
                      <option value="Latin & Salsa">{language === 'ar' ? 'رقص لاتيني وسالسا / Latin' : 'Latin & Salsa'}</option>
                      <option value="Zumba & Cardio Party">{language === 'ar' ? 'زومبا وحرق دهون / Zumba' : 'Zumba & Cardio Party'}</option>
                      <option value="Mat Pilates & Core">{language === 'ar' ? 'بيلاتس ونحت القوام / Pilates' : 'Mat Pilates & Core'}</option>
                      <option value="Kickboxing & Fitness">{language === 'ar' ? 'كيك بوكسينغ ولياقة / Kickboxing' : 'Kickboxing & Fitness'}</option>
                      <option value="Bridal & Private 1-on-1">{language === 'ar' ? 'كلاس عرائس أو تدريب خاص / Bridal & Private' : 'Bridal & Private 1-on-1'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C060B] uppercase tracking-wider mb-1.5">
                      {t.msgLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder={language === 'ar' ? 'أي سؤال أو ملاحظة تريدين إخبارنا بها...' : 'Any questions or preferences...'}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF5EE] border border-[#EADBC8] text-sm text-[#1C060B] focus:outline-none focus:border-[#78132B] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2C0710] to-[#78132B] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>{t.sendBtn}</span>
                  </button>

                  <p className="text-[11px] text-center text-[#2C0710]/60 pt-1">
                    {t.privacyNote}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
