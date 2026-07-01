import React from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Services from "./Pages/Services";
import Doctor from "./Pages/Doctor";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./protectedRoute";
// Admin Imports
import Appointments from "./Components/Admin/Appointments";
import Patients from "./Components/Admin/Patients";
import Controls from "./Components/Admin/Controls";
import Doctors from "./Components/Admin/Doctors";
import Dashboard from "./Components/Admin/Dashboard";
// Patient Imports
import PatientDash from "./Components/Patient/PatientDash";
import PatAppointments from "./Components/Patient/PatAppointments";
import PatDoctors from "./Components/Patient/PatDoctors";
import PatProfile from "./Components/Patient/PatProfile";
import PatSettings from "./Components/Patient/PatSettings";
// Doctor Imports
import DocPatient from "./Components/Doctor/DocPatient"
import DocSchedule from "./Components/Doctor/DocSchedule"
import DocAppointment from "./Components/Doctor/DocAppointments"
import DocProfile from "./Components/Doctor/DocProfile"
import DocSettings from "./Components/Doctor/DocSettings"
import DocDashboard from "./Components/Doctor/DocDashboard"


function App() {

  const location = useLocation()

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/" || location.pathname === "/services" || location.pathname === "/doctor" || location.pathname === "/about" || location.pathname === "/contact" ? <Navbar /> : null}



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/patients" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Patients />
          </ProtectedRoute>
        } />
        <Route path="/admin/doctors" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Doctors />
          </ProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Appointments />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Controls />
          </ProtectedRoute>
        } />

        {/* Doctor Routes */}

        <Route path="/doctor/patient" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocPatient />
          </ProtectedRoute>
        } />

        <Route path="/doctor/schedule" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocSchedule />
          </ProtectedRoute>
        } />

        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocDashboard />
          </ProtectedRoute>
        } />

        <Route path="/doctor/appointment" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocAppointment />
          </ProtectedRoute>
        } />

        <Route path="/doctor/profile" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocProfile />
          </ProtectedRoute>
        } />

        <Route path="/doctor/settings" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocSettings />
          </ProtectedRoute>
        } />

        {/* Patient Routes */}

        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDash />
          </ProtectedRoute>
        } />

        <Route path="/patient/profile" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatProfile />
          </ProtectedRoute>
        } />

        <Route path="/patient/settings" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatSettings />
          </ProtectedRoute>
        } />

        <Route path="/patient/appointment" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatAppointments />
          </ProtectedRoute>
        } />

        <Route path="/patient/doctors" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatDoctors />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

    </>
  );
}

export default App;


// Exactly 💯 — this is **the correct way to think** about a real product.

// Let’s design this **role-wise**, focusing on **what each user actually needs**, not just what looks good.

// ---

// # 🎯 Core Principle

// > **Show only what helps that role make decisions faster.**
// > No clutter. No irrelevant data.

// ---

// ## 🛠️ ADMIN DASHBOARD (Platform Owner)

// ### Admin’s Goal:

// * Monitor platform health
// * Manage users & doctors
// * Track appointments & growth

// ### 🔹 What Admin Should See

// #### 1️⃣ Top Stats (First Row)

// * 👥 Total Users (Patients)
// * 🩺 Total Doctors
// * 📅 Total Appointments
// * ⏳ Pending Approvals

// > These are **non-negotiable** for admin.

// ---

// #### 2️⃣ Platform Activity (Middle Section)

// * Recent appointments (last 10)
// * Newly registered doctors
// * Newly registered patients

// **Table fields:**

// * Name
// * Role
// * Date
// * Status

// ---

// #### 3️⃣ Approval & Actions Panel

// * Doctor verification requests
// * Appointment issues
// * Reported users

// **Example buttons:**

// * Approve / Reject doctor
// * Disable user
// * View details

// ---

// #### 4️⃣ Analytics (Optional but Powerful)

// * Appointments per day (line chart)
// * Active users this week
// * Doctor availability rate

// ---

// ### Admin Dashboard Summary:

// ✅ Data-heavy
// ✅ Control-focused
// ❌ No medical info

// ---

// ## 🧍 PATIENT DASHBOARD (Service User)

// ### Patient’s Goal:

// * Book appointments
// * Track health visits
// * Manage profile

// ---

// ### 🔹 What Patient Should See

// #### 1️⃣ Welcome + Next Appointment

// * “Your next appointment is with **Dr. Ahmed** at **5:00 PM today**”
// * Status badge (Confirmed / Pending)

// ---

// #### 2️⃣ Quick Actions

// * ➕ Book New Appointment
// * 📄 View Medical Records
// * 💬 Start Consultation (if applicable)

// ---

// #### 3️⃣ Appointment History

// Show:

// * Doctor name
// * Date
// * Status (Completed / Cancelled)

// ---

// #### 4️⃣ Notifications

// * Appointment confirmed
// * Doctor rescheduled
// * Reminder alerts

// ---

// ### Patient Dashboard Summary:

// ✅ Simple
// ✅ Action-driven
// ❌ No platform analytics

// ---

// ## 👨‍⚕️ DOCTOR DASHBOARD (Service Provider)

// ### Doctor’s Goal:

// * Manage schedule
// * View patients
// * Track earnings (optional)

// ---

// ### 🔹 What Doctor Should See

// #### 1️⃣ Today’s Appointments (MOST IMPORTANT)

// * Patient name
// * Time
// * Appointment type
// * Status

// ---

// #### 2️⃣ Quick Actions

// * Accept / Reject appointment
// * Mark appointment as completed
// * Update availability

// ---

// #### 3️⃣ Weekly Overview

// * Appointments this week
// * Completed vs cancelled

// ---

// #### 4️⃣ Patient List

// * Patient name
// * Last visit date
// * View medical notes

// ---

// ### Doctor Dashboard Summary:

// ✅ Schedule-focused
// ✅ Patient-centered
// ❌ No admin controls

// ---

// ## 🧩 Sidebar Menu (Role Based)

// | Role    | Sidebar Items                                    |
// | ------- | ------------------------------------------------ |
// | Admin   | Dashboard, Users, Doctors, Appointments, Reports |
// | Doctor  | Dashboard, Appointments, Patients, Availability  |
// | Patient | Dashboard, Book Appointment, History, Profile    |

// 👉 **Do NOT show irrelevant routes** (UX mistake many apps make).

// ---

// ## 🧠 Final Advice (Very Important)

// 1. **One dashboard per role**
// 2. **Same layout structure, different content**
// 3. **Stat cards always first**
// 4. **Actions > Information**

// ---

// If you want next, I can:

// * Design **role-based dashboard UI**
// * Help with **route protection per role**
// * Give **MUI dashboard layout code**
// * Help with **database fields needed for dashboards**

// Just tell me what you want next 🚀


// next Part



// You’ve already designed a **very solid admin dashboard** 👍
// What you described is **90% of what real-world admin panels have**. Now I’ll do two things:

// 1. ✅ **Confirm what you have is correct**
// 2. ➕ **Suggest what’s missing / what can make it more professional (without adding money/revenue yet)**

// I’ll keep it **practical**, not over-engineered.

// ---

// ## ✅ WHAT YOU ALREADY HAVE (AND IT’S RIGHT)

// ### 📊 Dashboard Home

// ✔ Stat cards

// * Total Patients
// * Total Doctors
// * Total Appointments
// * Pending Appointments

// ✔ Line chart

// * Appointments per day
// * Completed vs Pending (or Cancelled)

// ✔ Table

// * Pending / Upcoming appointments

// This is **exactly what an admin should see first**.

// ---

// ### 👤 Patient Management Route

// ✔ View all patients
// ✔ Deactivate / activate patient
// ✔ Brief pending appointments
// ✔ Patient details view

// ✅ Correct. No need to overcomplicate.

// ---

// ### 👨‍⚕️ Doctor Management Route

// ✔ Admin adds doctors
// ✔ Activate / deactivate / delete doctor
// ✔ Newly registered vs active doctors
// ✔ Doctor details view

// This is **better than many production apps** because admin controls onboarding.

// ---

// ## 🔥 WHAT’S MISSING (OPTIONAL BUT STRONG)

// These are **not mandatory**, but they will make your project look **industry-level on GitHub & LinkedIn**.

// ---

// ## 1️⃣ Global Search (Very Valuable)

// Add a **search bar** in admin panel to search:

// * Patient by email / name
// * Doctor by specialization / name
// * Appointment by ID

// 👉 Even a **basic filter input** makes the app feel mature.

// ---

// ## 2️⃣ Status Filters Everywhere

// For tables:

// * All / Active / Deactivated
// * Pending / Approved / Completed / Cancelled

// This improves UX massively with **almost no backend work**.

// ---

// ## 3️⃣ Soft Delete (Important Design Choice)

// Instead of deleting:

// * Patients
// * Doctors

// Use:

// ```js
// isActive: true / false
// ```

// ✔ Safer
// ✔ Professional
// ✔ Makes audit possible

// You already mentioned deactivation — good thinking.

// ---

// ## 4️⃣ Admin Activity Log (VERY IMPRESSIVE)

// Simple table:

// * Admin action
// * Target (doctor / patient)
// * Time

// Example:

// * “Admin deactivated patient John Doe”
// * “Admin approved Dr. Ahmed”

// This is **gold** for interviews.

// ---

// ## 5️⃣ Doctor Approval Flow (Optional Improvement)

// Instead of auto-adding doctors:

// * Admin adds doctor → status: `pending`
// * Admin approves → status: `active`

// You already partially have this — just formalize it.

// ---

// ## 6️⃣ Dashboard Alerts / Warnings

// Small alert cards:

// * ⚠️ Doctors with no availability
// * ⚠️ Appointments pending > 24 hours
// * ⚠️ Inactive doctors

// Admins love **problems shown clearly**.

// ---

// ## 7️⃣ Role-Based Access Control (Mention This!)

// Even if simple:

// ```js
// role: "admin" | "doctor" | "patient"
// ```

// Protect routes accordingly.

// 👉 This alone makes your project **enterprise-grade**.

// ---

// ## 8️⃣ Export Data (CSV / Excel) – Optional

// Admin can export:

// * Appointments list
// * Doctors list
// * Patients list

// Even a dummy CSV export = 🔥 for resume.

// ---

// ## 🧠 WHAT YOU SHOULD NOT ADD (FOR NOW)

// ❌ Messaging system
// ❌ Payments
// ❌ Video calling
// ❌ Too many charts

// You’re correct to **keep revenue out for now**.

// ---

// ## ✅ FINAL VERDICT

// ### Your admin dashboard is:

// ✔ Realistic
// ✔ Scalable
// ✔ Resume-worthy
// ✔ Interview-ready

// ### If you add just **2–3 of these**:

// * Search
// * Filters
// * Activity log

// Your project becomes **top-tier MERN portfolio material**.

// ---

// If you want next, I can:

// * Design **admin dashboard UI sections**
// * Provide **MUI table + chart layout**
// * Help define **MongoDB schemas for admin features**
// * Help you write **README description** for GitHub

// Tell me what you want to do next 🚀
