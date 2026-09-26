import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenTrackModal: () => void;
  clinicAppUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenTrackModal,
  clinicAppUrl = 'http://localhost:5173'
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-sm">
              DVD
            </div>
            <div>
              <div className="text-white font-bold text-base font-display">
                DVDental Online Patient Booking
              </div>
              <div className="text-slate-400 text-xs">
                Philippine Dental Association (PDA) Registered Practice
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#services" className="hover:text-teal-400 transition-colors">
              Procedures & Fees
            </a>
            <a href="#dentists" className="hover:text-teal-400 transition-colors">
              Our Dentists
            </a>
            <a href="#hmo" className="hover:text-teal-400 transition-colors">
              HMO Cards
            </a>
            <button
              onClick={onOpenTrackModal}
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
            >
              Track Appointment Pass
            </button>
            <a 
              href={clinicAppUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 text-slate-400"
            >
              <span>Clinic Staff Login</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Legal & Compliance Notice */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-teal-500 shrink-0" />
            <span>
              Compliant with Republic Act No. 10173 (Philippine Data Privacy Act of 2012). Your health data is strictly encrypted.
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} DVDental Care Philippines. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
