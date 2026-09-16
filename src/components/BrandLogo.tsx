import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const OFFICIAL_LOGO_SRC = '/assets/mamacita-logo.png';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'burgundy' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  showText = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const sizeConfigs = {
    sm: {
      img: 'w-8 h-8 rounded-xl',
      title: 'text-lg tracking-tight',
      sub: 'text-[9px] tracking-wider',
      gap: 'gap-2',
    },
    md: {
      img: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
      title: 'text-xl sm:text-2xl tracking-tight',
      sub: 'text-[10px] tracking-widest',
      gap: 'gap-2.5',
    },
    lg: {
      img: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
      title: 'text-2xl sm:text-3xl tracking-tight',
      sub: 'text-xs tracking-[0.2em]',
      gap: 'gap-3',
    },
    xl: {
      img: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
      title: 'text-3xl sm:text-4xl tracking-tight',
      sub: 'text-xs sm:text-sm tracking-[0.25em]',
      gap: 'gap-4',
    },
  };

  const cfg = sizeConfigs[size];

  return (
    <div
      className={`inline-flex items-center select-none ${cfg.gap} ${className}`}
      id="mamacita-brand-logo"
    >
      {/* Official MamaCita Studio Logo Emblem */}
      <div
        className={`relative ${cfg.img} overflow-hidden flex-shrink-0 bg-[#FCEAEF] border border-[#E5C158]/50 shadow-md shadow-[#78132B]/20 transition-transform duration-300 group-hover:scale-105`}
      >
        {!imageError ? (
          <img
            src={OFFICIAL_LOGO_SRC}
            alt="MamaCita Fitness & Dance Studio Official Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#78132B] text-[#E5C158] font-bold text-xs">
            MC
          </div>
        )}
        {/* Subtle inner gold rim */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/25 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-serif-title font-bold ${cfg.title} ${
                variant === 'dark' ? 'text-[#2C0710]' : 'text-white'
              }`}
            >
              Mama<span className="text-[#E5C158] italic">Cita</span>
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`font-sans font-semibold uppercase ${cfg.sub} mt-0.5 ${
                variant === 'dark' ? 'text-[#78132B]' : 'text-[#E5C158]'
              }`}
            >
              {isAr ? 'استوديو الرقص واللياقة' : 'Fitness & Dance Studio'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
