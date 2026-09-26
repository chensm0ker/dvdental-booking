import { createClient } from '@supabase/supabase-js';

export interface Dentist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  license_number: string | null;
  phone: string | null;
  email: string | null;
  schedule_days: string[];
  consultation_hours: string;
  room_number: string | null;
  status: 'Active' | 'On Leave' | 'Inactive';
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type QueueStatus = 'Waiting' | 'Serving' | 'Completed' | 'Skipped';

export interface Appointment {
  id: string;
  patient_id: string | null;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  preferred_date: string;
  preferred_time: string;
  service_type: string;
  dentist_preference: string | null;
  notes: string | null;
  status: AppointmentStatus;
  queue_number?: string | null;
  queue_status?: QueueStatus;
  called_at?: string | null;
  operatory_room?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClinicSettings {
  id: string;
  clinic_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  working_hours?: string;
  maintenance_mode?: boolean;
}

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fhmxgqorubjcfutzuyol.supabase.co';
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobXhncW9ydWJqY2Z1dHp1eW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NTgwNzgsImV4cCI6MjEwNTMzNDA3OH0.8QTopb3Kzt1pwHpImb6oS5J8B7uSS2dpMmr_css-MAo';

function cleanSupabaseUrl(url?: string): string {
  if (!url || typeof url !== 'string') return 'https://fhmxgqorubjcfutzuyol.supabase.co';
  const trimmed = url.trim();
  const match = trimmed.match(/https?:\/\/[a-z0-9_-]+\.supabase\.co/i);
  if (match) return match[0];
  return trimmed.startsWith('http') ? trimmed : 'https://fhmxgqorubjcfutzuyol.supabase.co';
}

export const supabase = createClient(cleanSupabaseUrl(rawSupabaseUrl), rawSupabaseAnonKey.trim());

// Fetch active dentists from Supabase
export async function fetchDentists(): Promise<Dentist[]> {
  try {
    const { data, error } = await supabase
      .from('dentists')
      .select('*')
      .eq('status', 'Active')
      .order('name', { ascending: true });
    if (error) throw error;
    return (data || []) as Dentist[];
  } catch (err) {
    console.error('Error fetching dentists:', err);
    return [];
  }
}

// Generate next queue ticket number for that date
export async function generateNextQueueNumber(preferredDate: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('queue_number')
      .eq('preferred_date', preferredDate);

    if (error || !data || data.length === 0) {
      return 'Q-001';
    }

    let maxNum = 0;
    for (const item of data) {
      if (item.queue_number) {
        const match = item.queue_number.match(/(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
    }

    const nextNum = maxNum + 1;
    return `Q-${String(nextNum).padStart(3, '0')}`;
  } catch {
    return `Q-${Math.floor(100 + Math.random() * 900)}`;
  }
}

// Create new appointment request from patient
export async function createAppointment(appointment: {
  patient_name: string;
  patient_phone: string;
  patient_email?: string | null;
  preferred_date: string;
  preferred_time: string;
  service_type: string;
  dentist_preference?: string | null;
  notes?: string | null;
}): Promise<{ data: Appointment | null; error: any }> {
  try {
    const queueNumber = await generateNextQueueNumber(appointment.preferred_date);
    
    let operatory = null;
    if (appointment.dentist_preference) {
      if (appointment.dentist_preference.includes('Elena')) {
        operatory = 'Operatory 2';
      } else if (appointment.dentist_preference.includes('Camille')) {
        operatory = 'Operatory 3';
      } else {
        operatory = 'Operatory 1';
      }
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        ...appointment,
        queue_number: queueNumber,
        queue_status: 'Waiting',
        operatory_room: operatory,
        status: 'Pending'
      }])
      .select()
      .single();
    return { data: data as Appointment, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// Fetch appointments by date to check booked slots
export async function fetchBookedTimesForDate(date: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('preferred_time, status')
      .eq('preferred_date', date)
      .neq('status', 'Cancelled');

    if (error || !data) return [];
    return data.map(item => item.preferred_time);
  } catch {
    return [];
  }
}

// Track booking by phone or queue number
export async function searchAppointments(query: string): Promise<Appointment[]> {
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];

    // Search by phone or queue number or patient name
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .or(`patient_phone.ilike.%${cleanQuery}%,queue_number.ilike.%${cleanQuery}%,patient_name.ilike.%${cleanQuery}%`)
      .order('preferred_date', { ascending: false })
      .limit(5);

    if (error) throw error;
    return (data || []) as Appointment[];
  } catch (err) {
    console.error('Error searching appointments:', err);
    return [];
  }
}

// Fetch clinic settings
export async function fetchClinicSettings(): Promise<ClinicSettings | null> {
  try {
    const { data, error } = await supabase
      .from('clinic_settings')
      .select('*')
      .eq('id', 'global')
      .maybeSingle();

    if (error || !data) return null;
    return data as ClinicSettings;
  } catch {
    return null;
  }
}
