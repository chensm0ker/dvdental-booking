import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Navigation,
  Car
} from 'lucide-react';
import { HMO_PARTNERS } from '../config/services';

export const ClinicInfoSection: React.FC = () => {
  return (
    <section id="clinic-info" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* HMO Partners Section */}
        <div id="hmo" className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard size={13} />
            <span>Direct Billing & Cardless Approval</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Accredited HMO & Insurance Partners
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            We process digital LOA (Letter of Authorization) on-site. Present your physical card or mobile app upon check-in.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {HMO_PARTNERS.map((hmo) => (
              <div
                key={hmo.name}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 hover:border-teal-400 transition-colors"
              >
                <span className="text-2xl">{hmo.logo}</span>
                <span className="text-xs font-bold text-slate-800">{hmo.name}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Active Partner</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Clinic Address & Hours Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  DVDental Flagship Clinic
                </h3>
                <p className="text-xs text-slate-500">
                  Bonifacio Global City (BGC), Taguig City, Metro Manila
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex items-start gap-3">
                <Navigation size={16} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Address</div>
                  <div className="text-slate-600 mt-0.5">
                    Unit 402, High Street Medical Plaza, 5th Avenue cor. 26th St., Bonifacio Global City, Taguig City, 1634 Metro Manila
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car size={16} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Parking & Accessibility</div>
                  <div className="text-slate-600 mt-0.5">
                    Free 2-hour patient parking in B1 with validation. Wheelchair accessible elevators and clinic operatory doorways.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Operating Hours</div>
                  <div className="text-slate-600 mt-0.5">
                    Monday to Saturday: 9:00 AM – 6:00 PM<br />
                    Sunday: Closed (Emergency On-Call Only)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Direct Lines & Emergency Care</div>
                  <div className="text-slate-600 mt-0.5">
                    Landline: +63 (02) 8888-3368<br />
                    Mobile: +63 917 123 4567 / +63 918 987 6543
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                <Navigation size={14} />
                <span>Open in Google Maps / Waze</span>
              </a>
              <a
                href="tel:+639171234567"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors"
              >
                <Phone size={14} />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          {/* Patient FAQs */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Frequently Asked Patient Questions
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">
                  Do I need to pay a deposit to book an appointment?
                </div>
                <p className="text-slate-600 leading-relaxed">
                  No deposit is required. Your slot is guaranteed once your digital ticket is generated. Payment is settled at the clinic counter via Cash, GCash, Maya, Debit/Credit Card, or accredited HMO.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">
                  What if I need to reschedule or run late?
                </div>
                <p className="text-slate-600 leading-relaxed">
                  You can use our "Track My Booking" feature anytime with your mobile number to view your slot or call our front desk directly at +63 (02) 8888-3368.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">
                  Are your instruments sterilized?
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Yes, 100%. We adhere to hospital-grade Class B autoclave sterilization with individual sterilization pouch indicator strips opened in front of each patient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
