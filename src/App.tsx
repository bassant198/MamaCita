import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyMamaCita } from './components/WhyMamaCita';
import { ClassCategories } from './components/ClassCategories';
import { FeaturedClasses } from './components/FeaturedClasses';
import { WeeklySchedule } from './components/WeeklySchedule';
import { StudioExperience } from './components/StudioExperience';
import { MembershipsSection } from './components/MembershipsSection';
import { PrivateSessions } from './components/PrivateSessions';
import { SafeSpaceSanctuary } from './components/SafeSpaceSanctuary';
import { FaqSection } from './components/FaqSection';
import { ComplaintsSection } from './components/ComplaintsSection';
import { CtaBanner } from './components/CtaBanner';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ClassItem, ScheduleSlot } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedClass, setPreselectedClass] = useState<ClassItem | string | null>(null);
  const [preselectedDay, setPreselectedDay] = useState<string | null>(null);
  const [preselectedTime, setPreselectedTime] = useState<string | null>(null);

  const handleOpenBooking = (className?: string) => {
    if (className) {
      setPreselectedClass(className);
    } else {
      setPreselectedClass(null);
    }
    setPreselectedDay(null);
    setPreselectedTime(null);
    setIsBookingOpen(true);
  };

  const handleSelectClass = (classItem: ClassItem) => {
    setPreselectedClass(classItem);
    setPreselectedDay(null);
    setPreselectedTime(null);
    setIsBookingOpen(true);
  };

  const handleBookSlot = (slot: ScheduleSlot) => {
    setPreselectedClass(slot.className);
    setPreselectedDay(slot.day);
    setPreselectedTime(slot.time);
    setIsBookingOpen(true);
  };

  const handleExploreClasses = () => {
    const el = document.getElementById('classes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#120307] text-[#FAF5EE] font-sans antialiased selection:bg-[#E5C158] selection:text-[#2C0710] overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreClasses={handleExploreClasses}
        />

        {/* 2. About MamaCita */}
        <AboutSection />

        {/* 3. Why MamaCita */}
        <WhyMamaCita onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Classes / Dance & Fitness Categories */}
        <ClassCategories onSelectClass={handleSelectClass} />

        {/* 5. Featured Classes Spotlight */}
        <FeaturedClasses onSelectClass={handleSelectClass} />

        {/* 6. Weekly Schedule */}
        <WeeklySchedule onBookSlot={handleBookSlot} />

        {/* 7. Private Belly Dance Programs */}
        <PrivateSessions onOpenBooking={() => handleOpenBooking()} />

        {/* 8. Studio Experience: Reception & Waiting Area */}
        <StudioExperience />

        {/* 9. Memberships & Plans */}
        <MembershipsSection onSelectPlan={(plan) => handleOpenBooking(plan)} />

        {/* 11. Female-Only Safe Space */}
        <SafeSpaceSanctuary />

        {/* 12. FAQ */}
        <FaqSection />

        {/* 13. Complaints & Feedback Hotline */}
        <ComplaintsSection />

        {/* 14. Call To Action Banner */}
        <CtaBanner onOpenBooking={() => handleOpenBooking()} />

        {/* 15. Contact / Location */}
        <LocationContact />
      </main>

      {/* 16. Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Class Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedClass={preselectedClass}
        preselectedDay={preselectedDay}
        preselectedTime={preselectedTime}
      />

      {/* Floating Direct WhatsApp Access */}
      <WhatsAppFloatingButton />
    </div>
  );
}
