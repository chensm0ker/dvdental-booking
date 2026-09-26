import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Star, 
  Calendar, 
  CheckCircle2, 
  PhoneCall, 
  CreditCard 
} from 'lucide-react';

interface HeroSectionProps {
  onStartBooking: () => void;
  onBrowseServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onStartBooking, 
  onBrowseServices 
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-300/50 text-teal-800 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles size={14} className="text-teal-600" />
              <span>Certified PRC Licensed Dental Specialists</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
              Gentle, World-Class Oral Care <span className="text-teal-600">Without the Wait</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience modern, pain-managed dentistry with digital X-rays, ultrasonic cleanings, precision cosmetic fillings, and smart queue check-in. Reserve your slot in 60 seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Calendar size={18} />
                <span>Reserve Appointment Slot</span>
              </button>
              <button
                onClick={onBrowseServices}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
              >
                <span>View Procedures & Pricing</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Sterile</div>
                  <div className="text-[11px] text-slate-500">Autoclave Sterilization</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Live Queue Pass</div>
                  <div className="text-[11px] text-slate-500">Zero Clinic Waiting</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600 shrink-0">
                  <CreditCard size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">HMO Accredited</div>
                  <div className="text-[11px] text-slate-500">Maxicare, Medicard, etc.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Card with Live Status Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-7 space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    DVD
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">DVDental Clinic BGC</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      Currently Accepting Patients
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md text-xs font-bold border border-amber-200">
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              {/* Sample Ticket Preview Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-inner space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>SMART DIGITAL QUEUE PASS</span>
                  <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono text-[10px]">
                    REAL-TIME SYNC
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-slate-300">Next Estimated Ticket</div>
                    <div className="text-3xl font-extrabold tracking-tight font-mono text-teal-400">
                      Q-018
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300">Average Wait Time</div>
                    <div className="text-sm font-semibold text-slate-100">
                      &lt; 10 mins
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-300 border-t border-slate-700/80 pt-3 flex items-center justify-between">
                  <span>Operatories Active: 3 Rooms</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    On Schedule Today
                  </span>
                </div>
              </div>

              {/* Quick Perks List */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                  <span>Instant SMS and email booking confirmation ticket</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                  <span>Zero pre-payment required to hold your slot</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                  <span>Reschedule or cancel easily with 1-click lookup</span>
                </div>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={onStartBooking}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar size={15} className="text-teal-400" />
                <span>Book This Slot Online</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
