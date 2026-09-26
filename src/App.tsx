import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BookingWizard } from './components/BookingWizard';
import { ServicesCatalog } from './components/ServicesCatalog';
import { DentistsSection } from './components/DentistsSection';
import { ClinicInfoSection } from './components/ClinicInfoSection';
import { Footer } from './components/Footer';
import { AppointmentTicketModal } from './components/AppointmentTicketModal';
import { TrackBookingModal } from './components/TrackBookingModal';
import { fetchClinicSettings, Appointment } from './lib/supabase';
import { AlertCircle, Wrench, Phone } from 'lucide-react';

export default function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Pre-selected parameters from user clicking cards
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDentistName, setSelectedDentistName] = useState<string | null>(null);

  // Maintenance mode state from Supabase
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [clinicName, setClinicName] = useState<string>('DVDental Clinic');

  const clinicAppUrl = import.meta.env.VITE_CLINIC_APP_URL || 'http://localhost:5173';

  useEffect(() => {
    async function checkSettings() {
      const settings = await fetchClinicSettings();
      if (settings) {
        if (settings.maintenance_mode) {
          setMaintenanceMode(true);
        }
        if (settings.clinic_name) {
          setClinicName(settings.clinic_name);
        }
      }
    }
    checkSettings();
  }, []);

  const handleScrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrowseServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceToBook = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleScrollToBooking();
  };

  const handleSelectDentistToBook = (dentistName: string) => {
    setSelectedDentistName(dentistName);
    handleScrollToBooking();
  };

  const handleBookingSuccess = (appointment: Appointment) => {
    setConfirmedAppointment(appointment);
    setTicketModalOpen(true);
  };

  if (maintenanceMode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-5 bg-slate-800/80 p-8 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Wrench size={32} />
          </div>
          <h1 className="text-2xl font-bold font-display text-white">
            System Maintenance in Progress
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {clinicName} online patient booking is currently undergoing a scheduled system upgrade. We will be back online shortly.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-200">Need Immediate Emergency Dental Care?</div>
            <div className="text-teal-400 font-mono font-bold text-sm">+63 (02) 8888-3368</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navigation */}
      <Navbar
        onOpenTrackModal={() => setTrackModalOpen(true)}
        onScrollToBooking={handleScrollToBooking}
        clinicAppUrl={clinicAppUrl}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onStartBooking={handleScrollToBooking}
          onBrowseServices={handleBrowseServices}
        />

        {/* 4-Step Booking Wizard */}
        <BookingWizard
          onBookingSuccess={handleBookingSuccess}
          selectedServiceId={selectedServiceId}
          selectedDentistName={selectedDentistName}
        />

        {/* Procedures & Pricing Catalog */}
        <ServicesCatalog
          onSelectServiceToBook={handleSelectServiceToBook}
        />

        {/* PRC Certified Dentists */}
        <DentistsSection
          onSelectDentistToBook={handleSelectDentistToBook}
        />

        {/* Clinic Location & FAQs */}
        <ClinicInfoSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTrackModal={() => setTrackModalOpen(true)}
        clinicAppUrl={clinicAppUrl}
      />

      {/* Modals */}
      <AppointmentTicketModal
        isOpen={ticketModalOpen}
        appointment={confirmedAppointment}
        onClose={() => setTicketModalOpen(false)}
      />

      <TrackBookingModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
      />
    </div>
  );
}
