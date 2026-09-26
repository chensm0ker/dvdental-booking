export interface DentalService {
  id: string;
  name: string;
  category: 'Preventive' | 'Restorative' | 'Cosmetic' | 'Orthodontics' | 'Oral Surgery' | 'Emergency';
  duration: string;
  priceRange: string;
  startingPrice: number;
  description: string;
  recommendedFor: string;
  iconName: string;
  popular?: boolean;
}

export const DENTAL_SERVICES: DentalService[] = [
  {
    id: 'cleaning',
    name: 'Oral Prophylaxis (Cleaning & Polish)',
    category: 'Preventive',
    duration: '45 mins',
    priceRange: '₱1,200 - ₱1,800',
    startingPrice: 1200,
    description: 'Thorough ultrasonic scaling to remove calculus, plaque, and stubborn stains followed by fluoride polish.',
    recommendedFor: 'Routine oral wellness (every 6 months)',
    iconName: 'Sparkles',
    popular: true,
  },
  {
    id: 'filling',
    name: 'Composite Dental Filling (Pasta)',
    category: 'Restorative',
    duration: '45 mins',
    priceRange: '₱900 - ₱1,500 / surface',
    startingPrice: 900,
    description: 'High-aesthetic tooth-colored resin composite matching your natural tooth shade to restore decayed cavities.',
    recommendedFor: 'Tooth decay, chipped edges, cavity repair',
    iconName: 'Shield',
    popular: true,
  },
  {
    id: 'whitening',
    name: 'Laser Teeth Whitening',
    category: 'Cosmetic',
    duration: '60 mins',
    priceRange: '₱6,000 - ₱10,000',
    startingPrice: 6000,
    description: 'Clinic-grade LED laser cosmetic whitening lightening teeth up to 6–8 shades in a single comfortable session.',
    recommendedFor: 'Discolored or stained teeth, special events',
    iconName: 'Sun',
    popular: true,
  },
  {
    id: 'braces-consult',
    name: 'Orthodontic Braces Consultation',
    category: 'Orthodontics',
    duration: '30 mins',
    priceRange: '₱500 (Free with Package)',
    startingPrice: 500,
    description: 'Comprehensive digital smile assessment, cephalometric evaluation, and personalized alignment treatment plan.',
    recommendedFor: 'Crooked teeth, overbite, crowding, gaps',
    iconName: 'Smile',
    popular: true,
  },
  {
    id: 'extraction',
    name: 'Simple / Surgical Tooth Extraction',
    category: 'Oral Surgery',
    duration: '45 mins',
    priceRange: '₱1,500 - ₱3,500',
    startingPrice: 1500,
    description: 'Gentle, pain-controlled tooth removal with local anesthesia and sterile post-operative surgical protocol.',
    recommendedFor: 'Irreparable decay, severe crowding, trauma',
    iconName: 'Scissors',
  },
  {
    id: 'wisdom-tooth',
    name: 'Wisdom Tooth Odontectomy',
    category: 'Oral Surgery',
    duration: '60 mins',
    priceRange: '₱7,000 - ₱12,000',
    startingPrice: 7000,
    description: 'Specialized surgical extraction of impacted third molars with panoramic X-ray guidance to eliminate pain and swelling.',
    recommendedFor: 'Impacted or painful wisdom teeth',
    iconName: 'AlertCircle',
  },
  {
    id: 'root-canal',
    name: 'Root Canal Therapy (Endodontics)',
    category: 'Restorative',
    duration: '60 mins',
    priceRange: '₱6,500 - ₱10,000 / canal',
    startingPrice: 6500,
    description: 'Infection removal from the tooth pulp chamber to preserve natural teeth and eliminate severe throbbing pain.',
    recommendedFor: 'Deep nerve pain, abscess, severe infection',
    iconName: 'Activity',
  },
  {
    id: 'emergency-pain',
    name: 'Toothache & Emergency Dental Triage',
    category: 'Emergency',
    duration: '30 mins',
    priceRange: '₱800 - ₱1,500',
    startingPrice: 800,
    description: 'Immediate priority diagnostic checkup, digital X-ray, and acute pain-relief intervention.',
    recommendedFor: 'Acute throbbing pain, facial swelling, trauma',
    iconName: 'Zap',
    popular: true,
  },
];

export const AVAILABLE_TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:30 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
];

export const HMO_PARTNERS = [
  { name: 'Maxicare', logo: '🏥' },
  { name: 'Intellicare', logo: '🩺' },
  { name: 'Medicard', logo: '💳' },
  { name: 'PhilCare', logo: '🛡️' },
  { name: 'InLife Health Care', logo: '✨' },
  { name: 'Cocolife Healthcare', logo: '🌿' },
];
