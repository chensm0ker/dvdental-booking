import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  MapPin, 
  Ticket,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import type { Appointment } from '../lib/supabase';

interface AppointmentTicketModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

export const AppointmentTicketModal: React.FC<AppointmentTicketModalProps> = ({
  isOpen,
  appointment,
  onClose,
}) => {
  if (!isOpen || !appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  // Google Calendar Link Generator
  const generateGoogleCalendarUrl = () => {
    try {
      const title = encodeURIComponent(`DVDental Visit: ${appointment.service_type}`);
      const details = encodeURIComponent(
        `Appointment Ticket: ${appointment.queue_number || 'Confirmed'}\n` +
        `Patient: ${appointment.patient_name}\n` +
        `Dentist: ${appointment.dentist_preference || 'Assigned Specialist'}\n` +
        `Operatory: ${appointment.operatory_room || 'Room 1'}\n` +
        `Hotline: +63 (02) 8888-DENT`
      );
      const location = encodeURIComponent('DVDental Clinic, BGC Taguig, Metro Manila');

      // Create start & end ISO strings based on preferred_date and preferred_time
      const [time, period] = appointment.preferred_time.split(' ');
      const [hoursStr, minsStr] = time.split(':');
      let hours = parseInt(hoursStr, 10);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      const startDate = new Date(appointment.preferred_date);
      startDate.setHours(hours, parseInt(minsStr, 10), 0);
      const endDate = new Date(startDate.getTime() + 45 * 60000); // 45 min duration

      const formatGCal = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
      const datesParam = `${formatGCal(startDate)}/${formatGCal(endDate)}`;

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${details}&location=${location}`;
    } catch {
      return '#';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="w-12 h-12 bg-white text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <CheckCircle2 size={28} />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">
            Appointment Reserved!
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1">
            Your appointment has been registered in our clinic queue system.
          </p>
        </div>

        {/* Digital Ticket Pass Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Ticket Card */}
          <div className="border-2 border-dashed border-teal-300 bg-teal-50/50 rounded-2xl p-5 relative overflow-hidden">
            {/* Cutout notches */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white border-r-2 border-teal-300 -translate-y-1/2" />
            <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border-l-2 border-teal-300 -translate-y-1/2" />

            <div className="flex items-center justify-between border-b border-teal-200/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="text-teal-600" size={18} />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                  Digital Queue Ticket
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Active Slot
              </span>
            </div>

            {/* Queue Number Showcase */}
            <div className="text-center py-2">
              <div className="text-xs uppercase font-medium text-slate-500">
                Assigned Priority Queue Number
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-teal-700 my-1">
                {appointment.queue_number || 'Q-001'}
              </div>
              <div className="text-[11px] text-slate-500">
                Present this number upon arriving at the clinic reception desk.
              </div>
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-teal-200/80 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Patient Name</span>
                <span className="font-bold text-slate-800">{appointment.patient_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Mobile Phone</span>
                <span className="font-bold text-slate-800 font-mono">{appointment.patient_phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Procedure</span>
                <span className="font-bold text-slate-800">{appointment.service_type}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Schedule</span>
                <span className="font-bold text-teal-800 font-mono">{appointment.preferred_date} @ {appointment.preferred_time}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block font-medium">Assigned Attending</span>
                <span className="font-bold text-slate-800">
                  {appointment.dentist_preference || 'Duty Clinic Specialist'} ({appointment.operatory_room || 'Operatory 1'})
                </span>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100 text-slate-600 text-xs">
            <ShieldCheck size={18} className="text-teal-600 shrink-0 mt-0.5" />
            <span>
              Please arrive 10 minutes prior to your time slot for preliminary digital vitals and dental health check.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Printer size={16} />
                <span>Print Ticket</span>
              </button>
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Calendar size={16} />
                <span>Add to Calendar</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
            >
              Done & Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
