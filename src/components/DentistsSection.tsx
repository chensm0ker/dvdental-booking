import React, { useEffect, useState } from 'react';
import { 
  Stethoscope, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { fetchDentists, Dentist } from '../lib/supabase';

interface DentistsSectionProps {
  onSelectDentistToBook: (dentistName: string) => void;
}

export const DentistsSection: React.FC<DentistsSectionProps> = ({
  onSelectDentistToBook
}) => {
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchDentists();
      if (data && data.length > 0) {
        setDentists(data);
      } else {
        // Fallback default practitioners
        setDentists([
          {
            id: '1',
            name: 'Dr. Maria Clara Santos, DMD',
            title: 'Lead Cosmetic & Orthodontic Specialist',
            specialty: 'Orthodontics & Aesthetic Dentistry',
            license_number: 'PRC #0084920',
            phone: null,
            email: null,
            schedule_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            consultation_hours: '9:00 AM - 5:00 PM',
            room_number: 'Operatory 1',
            status: 'Active',
            bio: 'Over 12 years of clinical excellence in cosmetic smile makeovers, clear aligners, and painless dental rehabilitation.',
            avatar_url: null,
            created_at: '',
            updated_at: ''
          },
          {
            id: '2',
            name: 'Dr. Elena Reyes, DMD',
            title: 'Pediatric & Preventive Specialist',
            specialty: 'Pediatric Care & Oral Prophylaxis',
            license_number: 'PRC #0091244',
            phone: null,
            email: null,
            schedule_days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
            consultation_hours: '10:00 AM - 6:00 PM',
            room_number: 'Operatory 2',
            status: 'Active',
            bio: 'Dedicated to gentle, tear-free dental experiences for children and high-anxiety patients with modern behavioral pacing.',
            avatar_url: null,
            created_at: '',
            updated_at: ''
          },
          {
            id: '3',
            name: 'Dr. Camille Tan, DMD',
            title: 'Oral Surgeon & Endodontist',
            specialty: 'Wisdom Teeth & Root Canal Therapy',
            license_number: 'PRC #0076211',
            phone: null,
            email: null,
            schedule_days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
            consultation_hours: '1:00 PM - 6:00 PM',
            room_number: 'Operatory 3',
            status: 'Active',
            bio: 'Specialist in complex odontectomies, digital panoramic guided extractions, and single-visit root canal treatments.',
            avatar_url: null,
            created_at: '',
            updated_at: ''
          }
        ]);
      }
    }
    load();
  }, []);

  return (
    <section id="dentists" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Award size={13} />
            <span>PRC Verified Practitioners</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Meet Our Attending Dentists
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Licensed by the Philippine Professional Regulation Commission (PRC) and active members of the Philippine Dental Association (PDA).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dentists.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-teal-300 transition-all"
            >
              <div className="p-6 sm:p-7">
                {/* Doctor Avatar Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-teal-500/25 shrink-0">
                    {doc.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight font-display">
                      {doc.name}
                    </h3>
                    <div className="text-xs font-semibold text-teal-700 mt-0.5">
                      {doc.specialty}
                    </div>
                    {doc.license_number && (
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {doc.license_number}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {doc.bio || 'Dedicated to delivering gentle, precise, and preventive oral health care with the latest digital tools.'}
                </p>

                {/* Schedule Days */}
                <div className="space-y-2 py-3 border-y border-slate-200/80 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-teal-600 shrink-0" />
                    <span>Clinic Hours: <strong>{doc.consultation_hours || '9:00 AM - 5:00 PM'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-teal-600 shrink-0" />
                    <span>Days: {doc.schedule_days ? doc.schedule_days.join(', ') : 'Mon - Sat'}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectDentistToBook(doc.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-teal-600 hover:text-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Book with {doc.name.split(' ')[1] || 'Doctor'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
