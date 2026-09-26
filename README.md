# DVDental Online Patient Booking Portal

A dedicated, mobile-first patient self-service appointment booking web application for the **DVDental** platform. Patients can browse procedures, transparent pricing, verified PRC-licensed dentists, reserve real-time time slots, and receive instant digital queue tickets (`Q-001`).

## 🚀 Features

- **Interactive 4-Step Booking Wizard**:
  1. **Procedure Selection**: Categorized dental services (Preventive, Restorative, Cosmetic, Orthodontics, Oral Surgery, Emergency) with estimated duration and transparent fees in PHP (₱).
  2. **Dentist Preference**: Real-time doctor profiles synced from Supabase or "Any Available Dentist" for fastest triage.
  3. **Date & Time Picker**: Calendar scheduling with automatic conflict avoidance (booked slots disable automatically).
  4. **Patient Screening & Health Details**: Contact info, age, HMO provider (Maxicare, Intellicare, Medicard, PhilCare, etc.), symptoms/complaint, and Philippine Data Privacy Act (RA 10173) consent.
- **Instant Digital Queue Ticket Pass**:
  - Automatically generates the day's priority queue number (e.g. `Q-004`).
  - Printable appointment pass.
  - One-click Google Calendar integration.
- **Track My Booking**:
  - Live status lookup by mobile number or queue ticket code.
  - Real-time status badges (`Pending`, `Confirmed`, `Waiting in Queue`, `Serving in Operatory`, `Completed`).
- **Comprehensive Services & Price Transparency**:
  - Full catalog with category filtering.
  - Direct "Book This Procedure" pre-selection.
- **Supabase Real-Time Backend**:
  - Directly stores appointments into the shared DVDental Supabase database (`appointments` table).
  - Bookings immediately appear live on the clinic's internal `QueueBoard` and `AppointmentsList`!

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS (Matching DVDental Medical Teal Design System)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Outfit*)
- **Icons**: Lucide React
- **Backend / Database**: Supabase JS (Real-time DB)

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Variables:
- `VITE_SUPABASE_URL`: Supabase project URL (`https://fhmxgqorubjcfutzuyol.supabase.co`).
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key.
- `VITE_CLINIC_APP_URL`: URL to the DVDental Clinic management dashboard (`http://localhost:5173`).

### 3. Run Locally
```bash
npm run dev
```
The booking application runs on `http://localhost:5176`.

### 4. Build for Production
```bash
npm run build
```
