import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Info
} from 'lucide-react';
import { 
  DENTAL_SERVICES, 
  AVAILABLE_TIME_SLOTS, 
  DentalService 
} from '../config/services';
import { 
  fetchDentists, 
  fetchBookedTimesForDate, 
  createAppointment, 
  Dentist, 
  Appointment 
} from '../lib/supabase';

interface BookingWizardProps {
  onBookingSuccess: (appointment: Appointment) => void;
  selectedServiceId?: string | null;
  selectedDentistName?: string | null;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  onBookingSuccess,
  selectedServiceId,
  selectedDentistName
}) => {
  // Current active wizard step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [service, setService] = useState<DentalService>(() => {
    if (selectedServiceId) {
      const match = DENTAL_SERVICES.find(s => s.id === selectedServiceId);
      if (match) return match;
    }
    return DENTAL_SERVICES[0];
  });

  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [dentistPreference, setDentistPreference] = useState<string>(
    selectedDentistName || 'Any Available Dentist'
  );

  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [preferredTime, setPreferredTime] = useState<string>('10:00 AM');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Patient Info
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('+63 9');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [hmoProvider, setHmoProvider] = useState<string>('None / Cash Patient');
  const [consentDPA, setConsentDPA] = useState<boolean>(true);

  // Submission Status
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load dentists from Supabase on mount
  useEffect(() => {
    async function loadDentists() {
      const list = await fetchDentists();
      if (list && list.length > 0) {
        setDentists(list);
      }
    }
    loadDentists();
  }, []);

  // Sync incoming prop changes
  useEffect(() => {
    if (selectedServiceId) {
      const match = DENTAL_SERVICES.find(s => s.id === selectedServiceId);
      if (match) setService(match);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedDentistName) {
      setDentistPreference(selectedDentistName);
    }
  }, [selectedDentistName]);

  // Load booked slots whenever preferredDate changes
  useEffect(() => {
    if (!preferredDate) return;
    async function checkSlots() {
      setLoadingSlots(true);
      const booked = await fetchBookedTimesForDate(preferredDate);
      setBookedTimes(booked);
      // If current preferredTime is already booked, auto-select first open slot
      if (booked.includes(preferredTime)) {
        const firstAvailable = AVAILABLE_TIME_SLOTS.find(t => !booked.includes(t));
        if (firstAvailable) setPreferredTime(firstAvailable);
      }
      setLoadingSlots(false);
    }
    checkSlots();
  }, [preferredDate]);

  // Get tomorrow's date string as minimum
  const minDateStr = (() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  })();

  // Handle final submission
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 11) {
      setErrorMessage('Please enter a valid Philippine mobile number (e.g. +63 917 123 4567).');
      return;
    }
    if (!consentDPA) {
      setErrorMessage('Please accept the Data Privacy Act agreement to proceed.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);

      const notesCombined = [
        notes.trim() ? `Chief Complaint: ${notes.trim()}` : null,
        patientAge.trim() ? `Age: ${patientAge.trim()}` : null,
        hmoProvider !== 'None / Cash Patient' ? `HMO Card: ${hmoProvider}` : null
      ].filter(Boolean).join(' | ');

      const { data, error } = await createAppointment({
        patient_name: patientName.trim(),
        patient_phone: patientPhone.trim(),
        patient_email: patientEmail.trim() || null,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        service_type: service.name,
        dentist_preference: dentistPreference,
        notes: notesCombined || null,
      });

      if (error) {
        setErrorMessage(error.message || 'Unable to complete appointment reservation. Please check your connection.');
      } else if (data) {
        onBookingSuccess(data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Procedure' },
    { num: 2, title: 'Dentist' },
    { num: 3, title: 'Date & Time' },
    { num: 4, title: 'Patient Info' },
  ];

  return (
    <section id="booking-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Online Patient Reservation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Book Your Dental Appointment
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Instant digital ticket generation with real-time slot synchronization.
          </p>
        </div>

        {/* Wizard Progress Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-teal-600 -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((st) => {
              const isPassed = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              return (
                <div key={st.num} className="flex flex-col items-center relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      if (st.num < currentStep) setCurrentStep(st.num);
                    }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-sm ${
                      isPassed
                        ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                        : isCurrent
                        ? 'bg-slate-900 text-white ring-4 ring-teal-100 scale-110'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 size={18} /> : st.num}
                  </button>
                  <span className={`text-[11px] sm:text-xs mt-2 font-medium ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                    {st.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Content Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm relative">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Select Dental Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Step 1: Choose Your Dental Treatment
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Select the primary service you require for this clinic visit.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {DENTAL_SERVICES.map((s) => {
                  const isSelected = service.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setService(s)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                              {s.name}
                            </span>
                            {s.popular && (
                              <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {s.description}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 flex items-center gap-1 font-medium">
                          <Clock size={13} className="text-slate-400" />
                          {s.duration}
                        </span>
                        <span className="font-bold text-teal-700 font-mono">
                          {s.priceRange}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>Continue to Dentist Selection</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Dentist */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Step 2: Select Preferred Attending Dentist
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Choose a specific practitioner or pick "Any Available" for the earliest slot.
                </p>
              </div>

              {/* Any Available Dentist Card */}
              <div
                onClick={() => setDentistPreference('Any Available Dentist')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  dentistPreference === 'Any Available Dentist'
                    ? 'bg-white border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">
                      Any Available Dentist (Fastest Slot)
                    </div>
                    <div className="text-xs text-slate-500">
                      Our triage desk will assign the first available dentist on duty.
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  dentistPreference === 'Any Available Dentist' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                }`}>
                  {dentistPreference === 'Any Available Dentist' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              {/* Doctors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {(dentists.length > 0 ? dentists : [
                  { id: '1', name: 'Dr. Maria Clara Santos, DMD', title: 'Lead Cosmetic & Orthodontic Specialist', specialty: 'Orthodontics & Aesthetic Dentistry', license_number: 'PRC #0084920', consultation_hours: '9:00 AM - 5:00 PM', schedule_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
                  { id: '2', name: 'Dr. Elena Reyes, DMD', title: 'Pediatric & Preventive Dentist', specialty: 'Pediatric Care & Oral Prophylaxis', license_number: 'PRC #0091244', consultation_hours: '10:00 AM - 6:00 PM', schedule_days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'] },
                  { id: '3', name: 'Dr. Camille Tan, DMD', title: 'Oral Surgeon & Endodontist', specialty: 'Oral Surgery & Wisdom Teeth', license_number: 'PRC #0076211', consultation_hours: '1:00 PM - 6:00 PM', schedule_days: ['Monday', 'Wednesday', 'Friday', 'Saturday'] },
                ]).map((doc: any) => {
                  const isSelected = dentistPreference === doc.name;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setDentistPreference(doc.name)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                            <Stethoscope size={18} className="text-teal-600" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm leading-snug">
                              {doc.name}
                            </div>
                            <div className="text-xs text-teal-700 font-medium">
                              {doc.specialty}
                            </div>
                            {doc.license_number && (
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {doc.license_number}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                          isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Hours: {doc.consultation_hours || '9:00 AM - 5:00 PM'}</span>
                        <span className="text-emerald-600 font-medium">Available</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-all"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>Continue to Date & Time</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Pick Date & Time */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Step 3: Select Preferred Date & Time
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Appointments are organized into 45-minute clinical windows.
                </p>
              </div>

              {/* Date Input */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={minDateStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  <CalendarIcon size={18} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Info size={12} className="text-teal-600" />
                  Clinic is open Monday through Saturday (Closed Sundays).
                </p>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Available Time Slots for {preferredDate}
                  </label>
                  {loadingSlots && (
                    <span className="text-xs text-teal-600 flex items-center gap-1">
                      Checking availability...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const isBooked = bookedTimes.includes(slot);
                    const isSelected = preferredTime === slot;

                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setPreferredTime(slot)}
                        className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold border flex flex-col items-center justify-center transition-all ${
                          isBooked
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60 line-through'
                            : isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-[1.02]'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-teal-500 hover:bg-teal-50/50'
                        }`}
                      >
                        <span className="font-mono">{slot}</span>
                        <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-teal-100' : isBooked ? 'text-slate-400' : 'text-slate-500'}`}>
                          {isBooked ? 'Booked' : 'Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selection Summary Pill */}
              <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200/80 text-xs sm:text-sm text-teal-950 flex items-center justify-between">
                <div>
                  <span className="font-bold">Selected Slot: </span>
                  <span>{preferredDate} at {preferredTime}</span>
                </div>
                <div className="text-xs text-teal-700 font-medium">
                  {service.duration} duration
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-all"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>Continue to Patient Details</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Info & Final Confirmation */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Step 4: Patient Details & Health Screening
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Please provide your contact information to receive your digital queue pass.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Juan Dela Cruz"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Philippine Mobile No. <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+63 917 123 4567"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Email Address (For Ticket & Reminders)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="juan@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Patient Age
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 28"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* HMO Provider */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    HMO Health Card Provider
                  </label>
                  <select
                    value={hmoProvider}
                    onChange={(e) => setHmoProvider(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="None / Cash Patient">None / Cash or Card Patient</option>
                    <option value="Maxicare">Maxicare</option>
                    <option value="Intellicare">Intellicare</option>
                    <option value="Medicard">Medicard</option>
                    <option value="PhilCare">PhilCare</option>
                    <option value="InLife Health Care">InLife Health Care</option>
                    <option value="Other HMO">Other Approved HMO</option>
                  </select>
                </div>

                {/* Symptoms / Notes */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Specific Symptoms, Concerns or Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Severe sensitivity on lower left molar when drinking cold water, chipped front tooth..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs sm:text-sm">
                <div className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  RESERVATION SUMMARY
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>Procedure:</span>
                  <span className="font-bold text-white">{service.name}</span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>Dentist:</span>
                  <span className="font-semibold text-teal-300">{dentistPreference}</span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>Schedule:</span>
                  <span className="font-semibold text-white">{preferredDate} at {preferredTime}</span>
                </div>
                <div className="flex justify-between items-center text-slate-200 border-t border-slate-800 pt-2">
                  <span>Estimated Fee:</span>
                  <span className="font-bold text-teal-400">{service.priceRange}</span>
                </div>
              </div>

              {/* Data Privacy Agreement */}
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="dpa-consent"
                  checked={consentDPA}
                  onChange={(e) => setConsentDPA(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <label htmlFor="dpa-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I certify that the information provided is accurate and consent to DVDental processing my personal health data in compliance with the <span className="font-bold text-slate-800">Philippine Data Privacy Act of 2012 (RA 10173)</span>.
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-all"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-teal-600/30 transition-all"
                >
                  {submitting ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Complete & Issue Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
