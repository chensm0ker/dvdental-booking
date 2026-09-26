import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Ticket,
  Activity
} from 'lucide-react';
import { searchAppointments, Appointment } from '../lib/supabase';

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Appointment[]>([]);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    const data = await searchAppointments(query.trim());
    setResults(data);
    setLoading(false);
  };

  const getStatusBadge = (status: string, queueStatus?: string) => {
    if (queueStatus === 'Serving') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <Activity size={12} className="animate-spin text-amber-600" />
          Currently In Chair (Serving)
        </span>
      );
    }
    if (status === 'Confirmed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
          <CheckCircle2 size={12} />
          Confirmed
        </span>
      );
    }
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 size={12} />
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
        <Clock size={12} />
        Pending Reception Review
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Search size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                Track My Booking & Queue Pass
              </h3>
              <p className="text-xs text-slate-500">
                Check your appointment status or live queue placement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                required
                placeholder="Enter mobile no. (e.g. 0917) or Queue No. (Q-001)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
              <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-sm transition-all"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Results List */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {searched && results.length === 0 && !loading && (
              <div className="text-center py-8 px-4 rounded-xl bg-slate-50 border border-slate-200">
                <AlertCircle size={32} className="mx-auto text-slate-400 mb-2" />
                <div className="font-bold text-slate-700 text-sm">No Appointments Found</div>
                <p className="text-xs text-slate-500 mt-1">
                  We couldn't find an appointment matching "{query}". Please check your mobile number or book a new slot below.
                </p>
              </div>
            )}

            {results.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 shadow-sm transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket size={16} className="text-teal-600" />
                    <span className="font-mono font-bold text-teal-800 text-base">
                      {apt.queue_number || 'TICKET'}
                    </span>
                  </div>
                  {getStatusBadge(apt.status, apt.queue_status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-2.5">
                  <div>
                    <span className="text-slate-400 block">Patient</span>
                    <span className="font-semibold text-slate-800">{apt.patient_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Procedure</span>
                    <span className="font-semibold text-slate-800">{apt.service_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date & Time</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {apt.preferred_date} @ {apt.preferred_time}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Attending Room</span>
                    <span className="font-semibold text-slate-800">
                      {apt.operatory_room || 'Room 1'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
