import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { STUDIO_INFO } from '../data/studioData';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import { LanguageSwitch } from './LanguageSwitch';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, isRTL } = useLanguage();
  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: '#about' },
    { name: t.classes, href: '#classes' },
    { name: t.schedule, href: '#schedule' },
    { name: t.privatePrograms, href: '#private-programs' },
    { name: t.reception, href: '#experience' },
    { name: t.memberships, href: '#memberships' },
    { name: t.safeSpace, href: '#safe-space' },
    { name: language === 'ar' ? 'الشكاوى' : 'Complaints', href: '#complaints' },
    { name: t.location, href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-[#160408]/90 backdrop-blur-xl border-b border-[#E5C158]/15 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center group transition-transform duration-300">
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium text-[#FAF5EE]/80 hover:text-[#E5C158] hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switch Button */}
            <LanguageSwitch variant="navbar" />

            {/* Direct WhatsApp chat link */}
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً استوديو ماما سيتا! 🌸 أود الاستفسار عن كلاسات واشتراكات الاستوديو في شبين الكوم.'
                  : 'Hello MamaCita Studio! 🌸 I would like to inquire about classes in Shebin El-Kom.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/15 text-[#FAF5EE] hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-white/10 transition-all duration-300 group"
              title={t.whatsappChat}
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            {/* Book Class CTA */}
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E5C158] via-[#F3D784] to-[#D4AF37] text-[#2C0710] font-bold text-xs md:text-sm tracking-wide shadow-lg shadow-[#E5C158]/10 hover:shadow-[#E5C158]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookClass}</span>
            </button>
          </div>

          {/* Mobile Hamburger toggle + Mobile Language switcher */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitch variant="navbar" className="px-2.5 py-1 text-[11px]" />

            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-full bg-[#E5C158] text-[#2C0710] font-bold text-xs tracking-wide cursor-pointer"
            >
              {language === 'ar' ? 'حجز' : 'Book'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-[#160408] flex flex-col p-6 overflow-y-auto lg:hidden"
            id="mobile-nav-drawer"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <BrandLogo size="md" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Language Switch inside Drawer */}
            <div className="pt-6">
              <LanguageSwitch variant="drawer" />
            </div>

            <div className="py-6 flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-white/5 text-base font-serif-title font-semibold text-[#FAF5EE] hover:text-[#E5C158] transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-4 h-4 text-[#E5C158]/50 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#2C0710] font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.reserveNow}</span>
              </button>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-white/5 border border-white/15 text-[#FAF5EE] font-medium text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {STUDIO_INFO.whatsappFormatted}</span>
              </a>

              <p className="text-center text-xs text-[#FAF5EE]/60 pt-2">
                {t.shebinLabel}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
