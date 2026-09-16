import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Send, CheckCircle2, User, Phone, MapPin } from 'lucide-react';
import { ALL_CLASSES, STUDIO_INFO } from '../data/studioData';
import { ClassItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClass?: ClassItem | string | null;
  preselectedTime?: string | null;
  preselectedDay?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedClass,
  preselectedTime,
  preselectedDay,
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].booking;

  const [selectedClassId, setSelectedClassId] = useState<string>('belly-dance');
  const [selectedDay, setSelectedDay] = useState<string>('Saturday');
  const [selectedTime, setSelectedTime] = useState<string>('05:00 PM – 06:00 PM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [paymentOption, setPaymentOption] = useState<'cash' | 'vodafone' | 'instapay'>('cash');
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedClass) {
      if (typeof preselectedClass === 'string') {
        const found = ALL_CLASSES.find(
          c => c.id === preselectedClass || c.title.toLowerCase().includes(preselectedClass.toLowerCase())
        );
        if (found) setSelectedClassId(found.id);
      } else {
        setSelectedClassId(preselectedClass.id);
      }
    }
    if (preselectedDay) setSelectedDay(preselectedDay);
    if (preselectedTime) setSelectedTime(preselectedTime);
  }, [preselectedClass, preselectedDay, preselectedTime]);

  const activeClass = ALL_CLASSES.find(c => c.id === selectedClassId) || ALL_CLASSES[0];
  const activeTitle = language === 'ar' && activeClass.arabicTitle ? activeClass.arabicTitle : activeClass.title;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const dayLabel = TRANSLATIONS[language].schedule.days[selectedDay] || selectedDay;
    const paymentLabel =
      paymentOption === 'vodafone'
        ? language === 'ar'
          ? `فودافون كاش (${STUDIO_INFO.phone})`
          : `Vodafone Cash (${STUDIO_INFO.phone})`
        : paymentOption === 'instapay'
        ? language === 'ar'
          ? `انستاباي (${STUDIO_INFO.phone})`
          : `InstaPay (${STUDIO_INFO.phone})`
        : language === 'ar'
        ? 'كاش عند الحضور في الاستوديو'
        : 'Cash at the studio';

    const message = language === 'ar'
      ? `مرحباً استوديو ماما سيتا! 🌸%0A%0Aأود حجز موعد كلاس في استوديو شبين الكوم:%0A%0A• الكلاس: *${activeTitle}*%0A• اليوم المفضل: *${dayLabel}*%0A• الموعد: *${selectedTime}*%0A• طريقة الدفع المفضلة: *${paymentLabel}*%0A• الاسم: *${fullName || 'مشتركة جديدة'}*%0A• رقم الهاتف: *${phone || 'غير محدد'}*%0A${notes ? `• ملاحظات: ${encodeURIComponent(notes)}%0A` : ''}%0Aبرجاء تأكيد الموعد وإرسال تفاصيل الدخول والاستوديو. شكراً لكم!`
      : `Hello MamaCita Studio! 🌸%0A%0AI would like to book a spot for a class at Shebin El-Kom studio:%0A%0A• Class: *${activeClass.title}* (${activeClass.category.toUpperCase()})%0A• Preferred Day: *${selectedDay}*%0A• Time Slot: *${selectedTime}*%0A• Preferred Payment: *${paymentLabel}*%0A• Name: *${fullName || 'Guest'}*%0A• Phone: *${phone || 'Not provided'}*%0A${notes ? `• Note: ${encodeURIComponent(notes)}%0A` : ''}%0APlease confirm available spots and registration details. Thank you!`;

    const whatsappUrl = `https://wa.me/${STUDIO_INFO.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  const daysList = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto" id="booking-modal-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#1C060B] border border-[#E5C158]/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between bg-[#160408]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5C158]">
                  {t.badge}
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-white mt-0.5">
                  {t.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E5C158]/20 border-2 border-[#E5C158] text-[#E5C158] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-title text-2xl font-bold text-white">
                    {t.successTitle}
                  </h4>
                  <p className="text-sm text-[#FAF5EE]/80 max-w-md mx-auto">
                    {t.successSub}
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#E5C158] text-[#2C0710] font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {t.closeBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppBooking} className="space-y-5">
                  {/* Select Class */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                      {t.selectClassLabel}
                    </label>
                    <select
                      value={selectedClassId}
                      onChange={(e) => setSelectedClassId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors cursor-pointer"
                    >
                      {ALL_CLASSES.map((c) => {
                        const optTitle = language === 'ar' && c.arabicTitle ? c.arabicTitle : c.title;
                        return (
                          <option key={c.id} value={c.id} className="bg-[#1C060B] text-white">
                            {optTitle} ({c.category.toUpperCase()} • {c.duration})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Day & Time Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                        {t.preferredDayLabel}
                      </label>
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors cursor-pointer"
                      >
                        {daysList.map((d) => (
                          <option key={d} value={d} className="bg-[#1C060B] text-white">
                            {TRANSLATIONS[language].schedule.days[d] || d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                        {t.timeSlotLabel}
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors cursor-pointer"
                      >
                        <option value="10:00 AM – 11:00 AM" className="bg-[#1C060B]">10:00 AM – 11:00 AM (Morning Flow)</option>
                        <option value="11:30 AM – 12:30 PM" className="bg-[#1C060B]">11:30 AM – 12:30 PM (Midday Boost)</option>
                        <option value="05:00 PM – 06:00 PM" className="bg-[#1C060B]">05:00 PM – 06:00 PM (Afternoon Vibe)</option>
                        <option value="06:30 PM – 07:30 PM" className="bg-[#1C060B]">06:30 PM – 07:30 PM (Evening Sunset)</option>
                        <option value="08:00 PM – 09:00 PM" className="bg-[#1C060B]">08:00 PM – 09:00 PM (Night Party)</option>
                      </select>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                        {t.fullNameLabel} *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#E5C158] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={language === 'ar' ? 'سارة محمد' : 'e.g. Sara Mohamed'}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                        {t.phoneLabel} *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#E5C158] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="010XXXXXXXX"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                      {language === 'ar' ? 'طريقة الدفع المفضلة' : 'Preferred Payment Method'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentOption('cash')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                          paymentOption === 'cash'
                            ? 'bg-[#E5C158] text-[#2C0710] border-[#E5C158]'
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {language === 'ar' ? 'كاش بالاستوديو' : 'Cash at Studio'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentOption('vodafone')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                          paymentOption === 'vodafone'
                            ? 'bg-[#E60000] text-white border-[#E60000] shadow-md shadow-[#E60000]/30'
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {language === 'ar' ? 'فودافون كاش' : 'Vodafone Cash'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentOption('instapay')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                          paymentOption === 'instapay'
                            ? 'bg-gradient-to-r from-[#6C2BD9] to-[#8B5CF6] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/30'
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {language === 'ar' ? 'انستاباي' : 'InstaPay'}
                      </button>
                    </div>

                    {paymentOption !== 'cash' && (
                      <div className="mt-2.5 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                        <span className="text-white/70">
                          {language === 'ar'
                            ? `رقم التحويل (${paymentOption === 'vodafone' ? 'فودافون كاش' : 'انستاباي'}):`
                            : 'Transfer to Number:'}{' '}
                          <strong className="text-[#E5C158] font-mono">{STUDIO_INFO.phone}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(STUDIO_INFO.phone);
                            setCopiedNumber(true);
                            setTimeout(() => setCopiedNumber(false), 2000);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors cursor-pointer"
                        >
                          {copiedNumber
                            ? language === 'ar'
                              ? 'تم النسخ!'
                              : 'Copied!'
                            : language === 'ar'
                            ? 'نسخ'
                            : 'Copy'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                      {t.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'ar' ? 'هل هذه أول تجربة لكِ في الرقص؟ أو لديكِ أي تفضيلات معينة...' : 'e.g. First time dancing, bridal event next month, or injury precautions...'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E5C158] transition-colors resize-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-[#2C0710]/70 border border-[#E5C158]/20 text-xs space-y-1.5 text-white/80">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span>{t.selectedStyleLabel}:</span>
                      <span className="text-[#E5C158]">{activeTitle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{t.locationLabel}:</span>
                      <span>{language === 'ar' ? STUDIO_INFO.addressArabic : STUDIO_INFO.address}</span>
                    </div>
                    <div className="text-[11px] text-white/60 pt-1 border-t border-white/10">
                      ✓ {t.privacyGuarantee}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E5C158] via-[#F3D784] to-[#D4AF37] text-[#2C0710] font-bold text-sm uppercase tracking-wider shadow-xl hover:shadow-[#E5C158]/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.submitWhatsApp}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
