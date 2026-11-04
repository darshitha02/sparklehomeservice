# sparklehomeservice

# 🏠 Sparkle Home — A Smart Maid & Domestic Home Services Booking Platform

> **Tagline**: *"Your Home, Our Care – Book Trusted Helpers at Your Convenience."*  
> **Repository**: [https://github.com/darshitha02/sparklehomeservice](https://github.com/darshitha02/sparklehomeservice)  
> **Presentation**: Includes 14-slide widescreen PowerPoint deck (`SparkleHome_Domestic_Services_Presentation.pptx`) and interactive browser presentation (`presentation.html`).

[![Python](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.14-blue?style=flat&logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Framework-Flask%203.0+-black?style=flat&logo=flask)](https://flask.palletsprojects.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 1. Project Overview
**Sparkle Home** is a web-based and mobile-friendly home service booking platform that connects customers with verified domestic workers such as maids, house cleaners, cooks, babysitters, laundry attendants, and elderly caregivers.

The platform allows users to browse available domestic workers, check their profiles, compare pricing, view ratings and reviews, select service dates and time slots, and book services online.

It aims to make hiring domestic helpers easier, safer, more transparent, and more reliable while providing dignified, predictable employment opportunities for domestic workers across India.

---

## 2. Problem Statement
Finding reliable domestic helpers is a common challenge for millions of urban households. Traditional methods of hiring maids through personal references, local agencies, or word-of-mouth create several bottlenecks:
- **Difficulty finding trustworthy and experienced maids**: No background checks or police records.
- **No proper platform to compare service providers**: Zero visibility into skills, experience, or track records.
- **Lack of transparent pricing**: Arbitrary informal negotiations and sudden price hikes.
- **Difficulty checking availability and scheduling**: Frequent double bookings and arrival friction.
- **No proper booking history or service tracking**: Zero digital records or invoice receipts.
- **Lack of accountability**: Sudden unannounced leaves or absences with no replacement backup.
- **Limited opportunities for domestic workers**: Helpers struggle to reach reliable, high-paying households.

**Solution**: Sparkle Home develops a centralized digital marketplace connecting customers with verified domestic service providers through an easy-to-use booking system.

---

## 3. Main Objectives
- **Single Platform**: Unified digital ecosystem for booking all domestic chores.
- **Verified Workers**: 100% Aadhaar authentication and police record verification.
- **Requirement-Based Selection**: Tailor services by room size, frequency, and diet preferences.
- **Transparent Pricing**: Fixed upfront hourly (₹149-₹299/hr) and monthly rate cards.
- **Real-Time Booking**: Interactive slot locking with zero scheduling conflicts.
- **Secure Online Payments**: Multi-channel payments via Razorpay UPI, Cards, and Cash on Delivery.
- **Ratings & Reviews**: Transparent post-service customer feedback engine.
- **Worker Empowerment**: Fair wages, direct bank payouts, schedule autonomy, and labor dignity.

---

## 4. Types of Domestic Services (6 Pillars)

1. **🧹 House Cleaning**: Daily sweeping, mopping with disinfectant, furniture/TV dusting, and trash clearance.  
   *(Rates: ₹199/hr • ₹3,500/month)*
2. **🍳 Cooking Services**: Daily meal prep (Breakfast/Lunch/Dinner), regional cuisines (Telugu, North Indian), and kitchen platform wiping.  
   *(Rates: ₹249/hr • ₹4,500/month)*
3. **🍽️ Dishwashing**: Utensil scrubbing, sink descaling, soap disinfection, and organized drying rack stacking.  
   *(Rates: ₹149/hr • ₹2,200/month)*
4. **👕 Laundry Services**: Washing machine management, hand washing delicate garments, drying line hanging, neat folding, and steam ironing.  
   *(Rates: ₹179/hr • ₹2,800/month)*
5. **👶 Babysitting & Childcare**: Attentive infant and toddler care, milk warming, storytelling, active educational play, and vigilant safety.  
   *(Rates: ₹299/hr • ₹6,500/month)*
6. **👵 Elderly Assistance**: Non-medical senior companionship, walking mobility assistance, and medication schedule reminders.  
   *(Rates: ₹279/hr • ₹7,000/month)*

---

## 5. Tri-Role User Architecture

### A. Customer / User
- Register and log in.
- Search domestic workers by city & neighborhood (Hyderabad, Bengaluru, Mumbai, Delhi NCR).
- Browse the 6 core domestic service categories.
- View worker profiles, experience, verified badges, and reviews.
- Select date, morning/evening time slots, and frequency (One-time, Daily, Weekly, Monthly).
- Pay via Razorpay UPI, Cards, or Cash on Delivery.
- Track real-time service status with a **4-digit service start OTP**.
- Cancel or reschedule bookings.
- Submit post-service ratings and reviews.

### B. Maid / Service Provider
- Register as a domestic service provider.
- Upload profile photo and identity verification documents (Aadhaar & Police Clearance).
- Select offered services (Cleaning, Cooking, Dishwashing, etc.).
- Set custom hourly and monthly service charges.
- Manage duty availability toggle switch (**"Available Today"** vs. **"On Leave"**).
- Accept or decline incoming booking requests in real time.
- View active and upcoming job schedules with customer contact and directions.
- Track total earnings, weekly direct bank transfers, and completed job statistics.

### C. Super Admin
- Central operations dashboard.
- Verify worker identities (Aadhaar & police records) and approve/reject registrations.
- Manage service categories and pricing tariff standards.
- Monitor live bookings, worker dispatches, and arrival status.
- Manage customer complaints and dispute resolution tickets.
- Audit platform transactions and financial metrics.
- Generate operational analytics and reports.

---

## 6. Major Platform Features

| Feature | Description |
| :--- | :--- |
| **Authentication & RBAC** | Secure registration and login with role-based access control (Customer, Worker, Admin). |
| **Worker Verification** | Multi-tier KYC approval workflow covering government ID and criminal background checks. |
| **Location-Based Search** | Hyperlocal proximity matching ensuring helpers reside within a 3-5 km radius. |
| **Smart Booking Engine** | Conflict-free calendar locking preventing helper double-booking. |
| **Transparent Pricing** | Upfront fare calculation (Base fare + 5% GST + ₹29 safety platform fee). |
| **Online Payments** | Razorpay integration for instant UPI (GPay, PhonePe, Paytm), Cards, and Cash on Delivery. |
| **4-Digit Start OTP** | Security handshake ensuring only the assigned, background-checked helper enters the home. |
| **Emergency 1-Hour SOS** | Rapid standby dispatch for urgent requirements (absent regular maid or surprise guests). |
| **Ratings & Reviews** | Two-way feedback loop establishing community trust and quality standards. |
| **Admin Operations Desk** | Complete oversight for KYC verification, booking tracking, disputes, and analytics. |

---

## 7. Unique Selling Points (USPs)
1. **100% Verified Maid Profiles**: Only KYC-approved domestic helpers can accept bookings.
2. **Hyperlocal Location Matching**: Faster arrivals and minimal commute stress for workers.
3. **Flexible Engagement**: Book 2-hour on-demand visits, weekly cleans, or monthly recurring maid packages.
4. **Transparent Pricing**: Fixed upfront rate cards with zero hidden agency cuts.
5. **Conflict-Free Calendars**: Automated slot locking prevents double bookings.
6. **Emergency 1-Hour Booking**: Standby helper dispatch in under 60 minutes.
7. **Worker-Friendly Ecosystem**: Helpers choose their hours, set rates, and enjoy dignified earnings.

---

## 8. Booking Workflow (6-Step Lifecycle)
1. **Customer Registration**: Sign up and enter residential address/locality.
2. **Select Service**: Choose from the 6 domestic chore categories and booking frequency.
3. **Find Available Maids**: Compare ratings, distance, languages, and pricing.
4. **Select Date & Time Slot**: Pick morning, mid-day, or evening arrival window.
5. **Confirm Booking & Payment**: Pay via UPI, Cards, or select Cash on Delivery.
6. **OTP Verification & Completion**: Helper verifies OTP upon arrival, completes service, and user submits feedback.

---

## 9. Technology Stack

- **Frontend**: React.js / Responsive Semantic HTML5
- **Styling**: Tailwind CSS (CDN) + Lucide Icons (Mobile drawer, sticky quick navigation)
- **Backend API**: Python Flask / Node.js + Express.js REST APIs
- **Database**: MongoDB (Atlas) / Persistent JSON Data Store
- **Security**: JWT (JSON Web Tokens), bcrypt hashing, 4-digit start OTPs
- **Maps & Geolocation**: Google Maps Geocoding & Proximity Radius API
- **Payments Gateway**: Razorpay (UPI, NetBanking, Cards, COD)
- **Media & Storage**: Cloudinary / AWS S3 for profile photos and encrypted KYC documents
- **Version Control**: Git & GitHub (`sparklehomeservice`)

---

## 10. Main Application Pages

### Customer Interface
- `/` — Landing page with interactive quick helper search, trust metrics & services overview
- `/services` — Detailed domestic services catalog with itemized scope of work
- `/helpers` — Helper directory with live filters (City, Service, Max Rate, Verified Only) & worker profile modal
- `/book` — Multi-step smart booking wizard with live fare calculator & OTP confirmation modal
- `/bookings` — Customer booking manager (Active, Completed, Cancel, Reschedule, 5-Star Review)
- `/emergency` — 1-Hour rapid standby helper dispatch portal

### Worker Interface
- `/worker/portal` — Helper dashboard with duty toggle switch, incoming requests inbox (Accept/Decline), and new helper registration form with KYC document simulation

### Admin Interface
- `/admin` — Operations desk with platform KPIs, 1-click worker KYC verification queue, live bookings log, and dispute ticket resolver

### Presentation Deck
- `/presentation` — Full-screen interactive 14-slide web presentation deck
- `/download-ppt` — Direct download endpoint for `SparkleHome_Domestic_Services_Presentation.pptx`

---

## 11. Future Roadmap
- **AI-Based Maid Matching**: Recommendation engine matching helpers based on family diet, language, and routine timings.
- **Multilingual Voice Booking**: Voice-driven booking in Telugu, Hindi, Tamil, and English.
- **WhatsApp Business Bot**: Automated booking, schedule reminders, and arrival alerts via WhatsApp API.
- **Monthly Subscription Bundles**: Discounted household bundles (e.g. Daily Maid + Cook package).
- **Real-Time GPS Arrival Tracking**: Live map showing domestic worker transit and ETA.
- **Multi-City Expansion**: Launching across Tier-2 and Tier-3 urban centers in India.

---

## 12. Expected Project Outcome & Final Vision
Sparkle Home provides a reliable digital marketplace for domestic services, eliminating the insecurity and friction involved in finding and booking domestic helpers.

**Final Vision**: Build the *"Urban Company for Everyday Domestic Help"*, focusing specifically on daily maid, cooking, and childcare assistance tailored for Indian households and domestic workers.

---

## 🚀 Quick Start Guide

### 1. Clone Repository & Setup
```bash
git clone https://github.com/darshitha02/sparklehomeservice.git
cd sparklehomeservice
```

### 2. Install Dependencies & Run
```bash
pip install -r requirements.txt
python app.py
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
