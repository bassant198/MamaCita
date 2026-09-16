export type ClassCategory = 'all' | 'dance' | 'fitness';

export type IntensityLevel = 'Gentle' | 'Moderate' | 'High Energy' | 'Intense';

export interface ClassItem {
  id: string;
  title: string;
  arabicTitle?: string;
  category: 'dance' | 'fitness';
  tagline: string;
  arabicTagline?: string;
  description: string;
  arabicDescription?: string;
  intensity: IntensityLevel;
  duration: string;
  caloriesBurn: string;
  musicVibe: string;
  benefits: string[];
  arabicBenefits?: string[];
  imageUrl: string;
  isPopular?: boolean;
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  arabicName?: string;
  arabicRole?: string;
  experience: string;
  specialties: string[];
  arabicSpecialties?: string[];
  bio: string;
  arabicBio?: string;
  quote: string;
  arabicQuote?: string;
  imageUrl: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  period: 'morning' | 'evening';
  className: string;
  arabicClassName?: string;
  category: 'dance' | 'fitness';
  coach: string;
  coachName?: string;
  room: 'Studio A (Main Stage)' | 'Studio B (Sculpt & Flow)';
  intensity: IntensityLevel;
  spotsLeft: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  arabicName?: string;
  monthlyPrice: number;
  currency: string;
  periodLabel: string;
  arabicPeriodLabel?: string;
  classesCount: string;
  arabicClassesCount?: string;
  description: string;
  arabicDescription?: string;
  features: string[];
  arabicFeatures?: string[];
  isPopular?: boolean;
  isHighlighted?: boolean;
  badge?: string;
  arabicBadge?: string;
}

export interface PrivateProgram {
  id: string;
  name: string;
  arabicName: string;
  price: number;
  currency: string;
  sessionsCount: string;
  arabicSessionsCount: string;
  duration?: string;
  arabicDuration?: string;
  typeBadge: string;
  arabicTypeBadge: string;
  whoIsItFor: string;
  arabicWhoIsItFor: string;
  description: string;
  arabicDescription: string;
  benefits: string[];
  arabicBenefits: string[];
  ctaText: string;
  arabicCtaText: string;
  tagline?: string;
  arabicTagline?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  arabicName?: string;
  title: string;
  role?: string;
  arabicTitle?: string;
  rating: number;
  comment: string;
  arabicComment?: string;
  favoriteClass: string;
  memberSince: string;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  arabicQuestion?: string;
  answer: string;
  arabicAnswer?: string;
  category: string;
}
