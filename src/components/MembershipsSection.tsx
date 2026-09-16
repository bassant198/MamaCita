import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Check,
  ArrowRight,
  Star,
  Smartphone,
  Copy,
  CheckCircle2,
  Wallet,
  Building2,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { MEMBERSHIP_PLANS, STUDIO_INFO } from '../data/studioData';
import { MembershipPlan } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface MembershipsSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({ onSelectPlan }) => {
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].memberships;
  const isAr = language === 'ar';

  const [selectedPlanId, setSelectedPlanId] = useState<string>('premium-plan');
  const [paymentMethod, setPaymentMethod] = useState<'vodafone' | 'instapay'>('vodafone');
  const [copiedType, setCopiedType] = useState<'number' | 'code' | null>(null);

  const selectedPlan: MembershipPlan =
    MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[2];

  const selectedPlanTitle = isAr && selectedPlan.arabicName ? selectedPlan.arabicName : selectedPlan.name;
  const selectedPlanClasses =
    isAr && selectedPlan.arabicClassesCount ? selectedPlan.arabicClassesCount : selectedPlan.classesCount;

  const handleCopy = (text: string, type: 'number' | 'code') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => {
        setCopiedType(null);
      }, 2500);
    });
  };

  const handlePlanSelect = (plan: MembershipPlan) => {
    setSelectedPlanId(plan.id);
    if (onSelectPlan) {
      onSelectPlan(plan.name);
    }
    const paymentEl = document.getElementById('membership-payment-hub');
    if (paymentEl) {
      paymentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendWhatsAppReceipt = () => {
    const methodText =
      paymentMethod === 'vodafone'
        ? isAr
          ? 'فودافون كاش (Vodafone Cash)'
          : 'Vodafone Cash'
        : isAr
        ? 'انستاباي (InstaPay)'
        : 'InstaPay';

    const message = isAr
      ? `مرحباً استوديو ماماسيتا! 🌸%0A%0Aأود تأكيد الاشتراك الشهري في باقة:* ${selectedPlanTitle}*%0A• القيمة: *${selectedPlan.monthlyPrice} جنيه مصري شهرياً*%0A• عدد الكلاسات: *${selectedPlanClasses}*%0A• طريقة الدفع: *${methodText}*%0A• رقم التحويل المعتمد: *${STUDIO_INFO.phone}*%0A%0Aأرفق لكم لقطة شاشة / إيصال التحويل لتفعيل اشتراكي فوراً وحجز أول كلاس في فرع شبين الكوم.`
      : `Hello MamaCita Studio! 🌸%0A%0AI would like to confirm my monthly subscription under:* ${selectedPlan.name}*%0A• Price: *${selectedPlan.monthlyPrice} EGP / Month*%0A• Classes: *${selectedPlan.classesCount}*%0A• Payment Method: *${methodText}*%0A• Transferred to Studio Number: *${STUDIO_INFO.phone}*%0A%0AAttached is my transfer screenshot/receipt to activate my membership and schedule my first class in Shebin El-Kom.`;

    window.open(`https://wa.me/${STUDIO_INFO.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const vodafoneQuickCode = `*9*7*${STUDIO_INFO.phone}*${selectedPlan.monthlyPrice}#`;

  return (
    <section className="relative py-24 bg-[#FAF5EE] text-[#2C0710] overflow-hidden" id="memberships">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#E5C158]/12 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#78132B]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#78132B]/10 border border-[#78132B]/20 text-[#78132B] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B38E22]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C060B] leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#2C0710]/75 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Quick Payment Banner */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-[#EADBC8] shadow-sm text-xs font-semibold text-[#78132B]">
            <Smartphone className="w-4 h-4 text-[#78132B]" />
            <span>
              {isAr
                ? 'الدفع متاح الآن عبر انستاباي وفودافون كاش على رقم الاستوديو:'
                : 'Payment supported via InstaPay & Vodafone Cash on studio number:'}
            </span>
            <span className="font-bold font-mono text-sm text-[#1C060B] bg-[#FAF5EE] px-2.5 py-0.5 rounded-lg border border-[#EADBC8]">
              {STUDIO_INFO.phone}
            </span>
          </div>
        </div>

        {/* 3 Monthly Subscription Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16">
          {MEMBERSHIP_PLANS.map((plan, idx) => {
            const displayName = isAr && plan.arabicName ? plan.arabicName : plan.name;
            const displayDesc = isAr && plan.arabicDescription ? plan.arabicDescription : plan.description;
            const displayClasses = isAr && plan.arabicClassesCount ? plan.arabicClassesCount : plan.classesCount;
            const displayFeatures = isAr && plan.arabicFeatures ? plan.arabicFeatures : plan.features;
            const isBestValue = !!plan.isPopular || plan.id === 'premium-plan';
            const isSelected = selectedPlanId === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => handlePlanSelect(plan)}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isBestValue
                    ? 'bg-[#1F050D] text-white shadow-2xl shadow-[#78132B]/30 border-2 border-[#E5C158] md:-translate-y-2'
                    : 'bg-white text-[#2C0710] border border-[#EADBC8] shadow-lg hover:shadow-xl hover:border-[#B38E22]/50'
                } ${isSelected ? 'ring-4 ring-[#E5C158]/70 ring-offset-4 ring-offset-[#FAF5EE]' : ''}`}
                id={`membership-card-${plan.id}`}
              >
                {/* Best Value Badge on Premium Plan */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E5C158] via-[#F3DE8A] to-[#D4AF37] text-[#2C0710] text-xs font-black uppercase tracking-wider shadow-md">
                      <Star className="w-3.5 h-3.5 fill-[#2C0710]" />
                      <span>{t.bestValueBadge}</span>
                    </span>
                  </div>
                )}

                {/* Selection indicator pill */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E5C158] text-[#2C0710] shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isAr ? 'مختارة' : 'Selected'}</span>
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div>
                  <div className="mb-4">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${isBestValue ? 'text-[#E5C158]' : 'text-[#78132B]'}`}>
                      {isAr ? 'اشتراك شهري' : 'Monthly Plan'}
                    </span>
                    <h3 className={`font-serif-title text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${isBestValue ? 'text-white' : 'text-[#1C060B]'}`}>
                      {displayName}
                    </h3>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isBestValue ? 'text-[#E5C158]' : 'text-[#78132B]'}`}>
                      {plan.monthlyPrice}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {plan.currency}
                      </span>
                      <span className={`text-xs ${isBestValue ? 'text-white/60' : 'text-[#2C0710]/60'}`}>
                        / {isAr ? 'شهر' : 'Month'}
                      </span>
                    </div>
                  </div>

                  {/* Number of Classes Highlight Badge */}
                  <div className="mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${
                        isBestValue
                          ? 'bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/40'
                          : 'bg-[#78132B]/10 text-[#78132B] border border-[#78132B]/15'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{displayClasses}</span>
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isBestValue ? 'text-white/80' : 'text-[#2C0710]/75'}`}>
                    {displayDesc}
                  </p>

                  <div className={`h-px w-full mb-6 ${isBestValue ? 'bg-white/10' : 'bg-[#EADBC8]'}`} />

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${isBestValue ? 'text-white/50' : 'text-[#2C0710]/50'}`}>
                      {t.whatsIncluded}
                    </div>
                    {displayFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${
                            isBestValue ? 'bg-[#E5C158] text-[#2C0710]' : 'bg-[#78132B] text-white'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={`text-xs sm:text-sm font-medium leading-tight ${isBestValue ? 'text-white/90' : 'text-[#2C0710]/85'}`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Selection CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan);
                    }}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E5C158] via-[#F3DE8A] to-[#D4AF37] text-[#2C0710] shadow-lg shadow-[#E5C158]/30'
                        : isBestValue
                        ? 'bg-[#E5C158] text-[#2C0710] hover:bg-[#F3DE8A]'
                        : 'bg-[#2C0710] text-white hover:bg-[#78132B]'
                    }`}
                  >
                    <span>{isSelected ? (isAr ? 'المتابعة للدفع الآن' : 'Proceed to Payment') : t.choosePlan}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated InstaPay & Vodafone Cash Payment Hub */}
        <div
          id="membership-payment-hub"
          className="max-w-5xl mx-auto rounded-3xl bg-[#1C060B] border-2 border-[#E5C158]/40 shadow-2xl p-6 sm:p-10 text-white relative overflow-hidden"
        >
          {/* Subtle gold glow behind payment console */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#E5C158]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#78132B]/30 blur-3xl pointer-events-none" />

          {/* Payment Console Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/30 text-[#E5C158] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.paymentHubTitle}</span>
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                {isAr ? 'طرق الدفع وتفعيل الاشتراك الفوري' : 'Payment Methods & Activation'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
                {t.paymentHubSubtitle}
              </p>
            </div>

            {/* Selected Plan Summary Pill */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 sm:min-w-[280px]">
              <div>
                <span className="text-[10px] text-white/50 uppercase tracking-wider block font-bold">
                  {t.selectedPlanLabel}
                </span>
                <span className="font-serif-title font-bold text-lg text-white block">
                  {selectedPlanTitle}
                </span>
                <span className="text-xs text-[#E5C158] font-semibold">
                  {selectedPlan.monthlyPrice} {selectedPlan.currency} • {selectedPlanClasses}
                </span>
              </div>

              {/* Quick Plan Switcher */}
              <div className="flex flex-col gap-1">
                {MEMBERSHIP_PLANS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      selectedPlanId === p.id
                        ? 'bg-[#E5C158] text-[#2C0710]'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {isAr && p.arabicName ? p.arabicName.split(' ')[0] : p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Official Studio Phone Callout */}
          <div className="relative z-10 my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#2A0812] to-[#1A040A] border border-[#E5C158]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/15 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] flex-shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-white/60 block font-semibold">
                  {t.studioNumberLabel}
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-white">
                  {STUDIO_INFO.phone}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(STUDIO_INFO.phone, 'number')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#E5C158]"
            >
              {copiedType === 'number' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{t.numberCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#E5C158]" />
                  <span>{t.copyNumber}</span>
                </>
              )}
            </button>
          </div>

          {/* Payment Method Switcher Tabs */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-black/40 border border-white/10 max-w-md mx-auto">
              {/* Vodafone Cash Tab */}
              <button
                onClick={() => setPaymentMethod('vodafone')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'vodafone'
                    ? 'bg-[#E60000] text-white shadow-lg shadow-[#E60000]/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>{isAr ? 'فودافون كاش' : 'Vodafone Cash'}</span>
              </button>

              {/* InstaPay Tab */}
              <button
                onClick={() => setPaymentMethod('instapay')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'instapay'
                    ? 'bg-gradient-to-r from-[#6C2BD9] to-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{isAr ? 'انستاباي' : 'InstaPay'}</span>
              </button>
            </div>
          </div>

          {/* Tab Content: Vodafone Cash */}
          <AnimatePresence mode="wait">
            {paymentMethod === 'vodafone' ? (
              <motion.div
                key="vodafone"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                {/* Vodafone Cash Box */}
                <div className="p-6 rounded-2xl bg-[#E60000]/10 border border-[#E60000]/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#E60000] animate-pulse" />
                      <h4 className="font-bold text-lg text-white">
                        {t.vodafoneCashTitle}
                      </h4>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E60000]/20 text-[#FF6B6B] border border-[#E60000]/30">
                        {t.vodafoneCashBadge}
                      </span>
                    </div>

                    <div className="text-xs text-white/80 font-medium">
                      {isAr ? 'قيمة الاشتراك المطلوب تحويله:' : 'Required Amount:'}{' '}
                      <span className="font-bold text-[#E5C158] text-base">
                        {selectedPlan.monthlyPrice} {selectedPlan.currency}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-6">
                    {t.vodafoneCashDesc}
                  </p>

                  {/* USSD Quick Code Box */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-white/60 block font-semibold">
                        {t.quickCodeLabel}
                      </span>
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#E5C158] tracking-widest direction-ltr inline-block">
                        {vodafoneQuickCode}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(vodafoneQuickCode, 'code')}
                      className="px-4 py-2 rounded-lg bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      {copiedType === 'code' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.codeCopied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.copyCode}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3 Step Process */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-[#E5C158] block mb-1">
                      {t.step1}
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {t.step1Text} ({STUDIO_INFO.phone}) بمبلغ {selectedPlan.monthlyPrice} جنيه.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-[#E5C158] block mb-1">
                      {t.step2}
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {t.step2Text} لتأكيد العملية.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-[#E5C158] block mb-1">
                      {t.step3}
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {t.step3Text} على رقم الاستوديو الرسمي.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Tab Content: InstaPay */
              <motion.div
                key="instapay"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                {/* InstaPay Box */}
                <div className="p-6 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#A78BFA] animate-pulse" />
                      <h4 className="font-bold text-lg text-white">
                        {t.instaPayTitle}
                      </h4>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#DDD6FE] border border-[#7C3AED]/30">
                        {t.instaPayBadge}
                      </span>
                    </div>

                    <div className="text-xs text-white/80 font-medium">
                      {isAr ? 'قيمة الاشتراك المطلوب تحويله:' : 'Required Amount:'}{' '}
                      <span className="font-bold text-[#E5C158] text-base">
                        {selectedPlan.monthlyPrice} {selectedPlan.currency}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-6">
                    {t.instaPayDesc}
                  </p>

                  {/* InstaPay Direct Instructions */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-white/60 block font-semibold">
                        {isAr ? 'التحويل عبر رقم الهاتف على انستاباي:' : 'Send Money to Mobile Number:'}
                      </span>
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#E5C158] tracking-wider">
                        {STUDIO_INFO.phone}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(STUDIO_INFO.phone, 'number')}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      {copiedType === 'number' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.numberCopied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.copyNumber}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3 Step Process */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-[#A78BFA] block mb-1">
                      {t.step1}
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      افتحي تطبيق InstaPay، اختاري إرسال نقود لرقم هاتف وأدخلي ({STUDIO_INFO.phone}).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-[#A78BFA] block mb-1">
                      {t.step2}
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      حددي قيمة الباقة ({selectedPlan.monthlyPrice} جنيه) وقومي بتأكيد التحويل.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-[#A78BFA] block mb-1">
                      {t.step3}
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      التقطي صورة لإشعار النجاح واضغطي بالأسفل لإرسالها وتفعيل اشتراكك فوراً.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Direct CTA Action: WhatsApp Receipt & Confirmation */}
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
              <span>
                {isAr
                  ? 'يتم تفعيل الاشتراك وتسجيل بياناتكِ وحجز أول كلاس بمجرد استلام الإيصال'
                  : 'Membership is activated and your first class is scheduled immediately upon receipt'}
              </span>
            </div>

            <button
              onClick={handleSendWhatsAppReceipt}
              className="w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.confirmAndSendReceipt}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Reassurance note */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#2C0710]/65 leading-relaxed">
            {t.reassuranceNote}
          </p>
        </div>
      </div>
    </section>
  );
};
