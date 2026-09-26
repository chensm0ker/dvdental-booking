import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  onOpenTrackModal: () => void;
  onScrollToBooking: () => void;
  clinicAppUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenTrackModal, 
  onScrollToBooking,
  clinicAppUrl = 'http://localhost:5173'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-teal-400" />
              <span>BGC & Metro Manila Clinic Branches</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock size={13} className="text-teal-400" />
              <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+639171234567" 
              className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              <Phone size={13} />
              <span>Hotline: +63 (02) 8888-DENT</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={clinicAppUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span>Clinic Staff Login</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5.5 2.5 8.5C9.5 19.5 10 22 12 22s2.5-2.5 3.5-5.5C16.5 13.5 18 11 18 8c0-3.5-2.5-6-6-6z"/>
                <path d="M10 8h4"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-display text-slate-900">
                  DV<span className="text-teal-600">Dental</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-teal-50 text-teal-700 border border-teal-200/60 px-2 py-0.5 rounded-full">
                  Patient Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Modern Gentle Dentistry & Orthodontics
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#services" className="hover:text-teal-600 transition-colors">
              Procedures & Pricing
            </a>
            <a href="#dentists" className="hover:text-teal-600 transition-colors">
              Our Dentists
            </a>
            <a href="#hmo" className="hover:text-teal-600 transition-colors">
              Accepted HMOs
            </a>
            <a href="#clinic-info" className="hover:text-teal-600 transition-colors">
              Clinic Location & Hours
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenTrackModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 transition-all"
            >
              <Search size={16} className="text-slate-500" />
              <span>Track My Booking</span>
            </button>
            <button
              onClick={onScrollToBooking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-600/30 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 lg:hidden rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Procedures & Pricing
            </a>
            <a 
              href="#dentists" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Our Dentists
            </a>
            <a 
              href="#hmo" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Accepted HMOs
            </a>
            <a 
              href="#clinic-info" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Clinic Location & Hours
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <Search size={16} />
              <span>Track My Booking / Queue</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm"
            >
              <Calendar size={16} />
              <span>Book Appointment Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
