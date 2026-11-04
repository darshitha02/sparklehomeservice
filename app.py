"""
Sparkle Home - A Smart Maid & Domestic Home Services Booking Platform
Backend Server & RESTful API (Flask)
Tagline: Your Home, Our Care – Book Trusted Helpers at Your Convenience.
"""
import os
import json
import uuid
from datetime import datetime
from flask import Flask, render_template, request, jsonify, redirect, url_for, send_file

app = Flask(__name__, static_folder="static", template_folder="templates")
app.config['SECRET_KEY'] = 'sparklehome-domestic-services-secret-2026'

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)
SERVICES_FILE = os.path.join(DATA_DIR, "services.json")
WORKERS_FILE = os.path.join(DATA_DIR, "workers.json")
BOOKINGS_FILE = os.path.join(DATA_DIR, "bookings.json")
DISPUTES_FILE = os.path.join(DATA_DIR, "disputes.json")

# ==========================================
# SEED DATA INITIALIZERS
# ==========================================

DEFAULT_SERVICES = [
    {
        "id": "house_cleaning",
        "name": "House Cleaning",
        "badge": "Popular",
        "icon": "sparkles",
        "tagline": "Daily cleaning, sweeping, mopping and dusting",
        "hourly_rate": 199,
        "monthly_rate": 3500,
        "duration": "1.5 - 3 Hours",
        "description": "Thorough daily cleaning covering living room, bedrooms, kitchen floors, and balconies. Sweeping, mopping with disinfectant, and dusting.",
        "tasks": [
            "Brooming & dust removal in all rooms",
            "Floor mopping with herbal antibacterial solutions",
            "Furniture, TV unit & tabletop dusting",
            "Kitchen & bathroom surface wiping",
            "Trash clearing & bin bag replacement"
        ],
        "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "cooking_services",
        "name": "Cooking Services",
        "badge": "High Demand",
        "icon": "utensils",
        "tagline": "Daily cooking, meal preparation and kitchen assistance",
        "hourly_rate": 249,
        "monthly_rate": 4500,
        "duration": "1.5 - 2.5 Hours",
        "description": "Authentic, hygienic home-cooked meals prepared in your kitchen according to your dietary preferences (North Indian, South Indian, Sattvic, or healthy diet).",
        "tasks": [
            "Vegetable chopping, peeling & gravy base prep",
            "Cooking breakfast, lunch or dinner dishes",
            "Roti / chapati making & rice cooking",
            "Gas stove & kitchen counter wipe-down",
            "Custom spice & low-oil meal customization"
        ],
        "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "dishwashing",
        "name": "Dishwashing",
        "badge": "Daily Essential",
        "icon": "disc",
        "tagline": "Cleaning utensils and maintaining kitchen hygiene",
        "hourly_rate": 149,
        "monthly_rate": 2200,
        "duration": "45 - 60 Minutes",
        "description": "Thorough scrubbing and sanitization of cooking vessels, plates, glassware, and cutlery. Sink cleaning and dry dish organization.",
        "tasks": [
            "Scrubbing burnt oil & grease from pots and pans",
            "Soap washing and thorough water rinsing",
            "Sink scrub, drain descaling & sanitization",
            "Drying utensils & organized rack placement",
            "Kitchen platform hygiene maintenance"
        ],
        "image": "https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "laundry_services",
        "name": "Laundry Services",
        "badge": "Care & Fresh",
        "icon": "shirt",
        "tagline": "Washing, ironing and folding clothes",
        "hourly_rate": 179,
        "monthly_rate": 2800,
        "duration": "1 - 2 Hours",
        "description": "Complete laundry care including washing machine management or delicate hand-washing, clothes drying line hanging, neat folding, and steam ironing.",
        "tasks": [
            "Sorting whites & colored garments",
            "Machine wash / hand wash delicate fabrics",
            "Drying clothes on balcony/indoor stands",
            "Crisp steam ironing for formal & casual attire",
            "Neat wardrobe folding and stacking"
        ],
        "image": "https://images.unsplash.com/photo-1545173168-9f1907e80789?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "babysitting",
        "name": "Babysitting & Childcare",
        "badge": "Verified Nannies",
        "icon": "baby",
        "tagline": "Childcare and supervision services",
        "hourly_rate": 299,
        "monthly_rate": 6500,
        "duration": "2 - 6 Hours",
        "description": "Attentive, loving and safe supervision of infants, toddlers, and school-age kids. Feeding, playing, nap routine, and constant vigilant supervision.",
        "tasks": [
            "Feeding, warming milk & baby meal assistance",
            "Diaper changing, hygiene & clothing care",
            "Engaging educational play, storytelling & drawing",
            "Strict infant safety & childproofed monitoring",
            "Post-school routine & nap supervision"
        ],
        "image": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "elderly_assistance",
        "name": "Elderly Assistance",
        "badge": "Compassionate",
        "icon": "heart-handshake",
        "tagline": "Non-medical daily assistance for elderly people",
        "hourly_rate": 279,
        "monthly_rate": 7000,
        "duration": "2 - 5 Hours",
        "description": "Caring, non-medical companionship for senior citizens. Walking mobility support, medicine schedule reminders, conversation, and warm home assistance.",
        "tasks": [
            "Walking & gentle mobility assistance around home",
            "Timely medication schedule reminders",
            "Serving warm meals & hydration support",
            "Companionship, reading, and attentive conversation",
            "Assisting with light dressing & comfort"
        ],
        "image": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80"
    }
]

DEFAULT_WORKERS = [
    {
        "id": "w_101",
        "name": "Lakshmi Devi",
        "age": 34,
        "gender": "Female",
        "city": "Hyderabad",
        "locality": "Hitec City / Madhapur",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        "experience_years": 7,
        "rating": 4.95,
        "reviews_count": 148,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Top Rated Helper",
        "services": ["house_cleaning", "cooking_services", "dishwashing"],
        "languages": ["Telugu", "Hindi", "English (Basic)"],
        "hourly_rate": 220,
        "monthly_rate": 4200,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["07:00 AM - 10:00 AM", "12:00 PM - 03:00 PM", "05:00 PM - 08:00 PM"],
        "bio": "Expert home cook and meticulous cleaner with 7 years of trusted service in apartments across Hitec City. Known for punctual arrival and authentic Telugu & North Indian dishes.",
        "reviews": [
            {"user": "Sneha Reddy", "rating": 5, "comment": "Lakshmi garu is an absolute blessing! Her cooking is delicious and she leaves the house spotless.", "date": "Yesterday"},
            {"user": "Arun Kumar", "rating": 5, "comment": "Extremely punctual and trustworthy. We have booked her monthly package for 4 months now.", "date": "3 days ago"}
        ]
    },
    {
        "id": "w_102",
        "name": "Sunita Sharma",
        "age": 29,
        "gender": "Female",
        "city": "Bengaluru",
        "locality": "Koramangala / HSR Layout",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        "experience_years": 5,
        "rating": 4.88,
        "reviews_count": 112,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Master Chef & Cleaner",
        "services": ["cooking_services", "dishwashing", "house_cleaning"],
        "languages": ["Hindi", "English", "Kannada"],
        "hourly_rate": 240,
        "monthly_rate": 4800,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["08:00 AM - 11:00 AM", "01:00 PM - 04:00 PM", "06:00 PM - 09:00 PM"],
        "bio": "Specialized in healthy low-oil meal preparation (rotis, sabzis, dal, biryani) and fast, hygienic dishwashing. Background checked with clean track record.",
        "reviews": [
            {"user": "Vikram Malhotra", "rating": 5, "comment": "Sunita's rotis are so soft and her kitchen management is top notch.", "date": "1 week ago"}
        ]
    },
    {
        "id": "w_103",
        "name": "Rajeshwari M.",
        "age": 38,
        "gender": "Female",
        "city": "Hyderabad",
        "locality": "Gachibowli / Financial District",
        "avatar": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80",
        "experience_years": 9,
        "rating": 4.98,
        "reviews_count": 94,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Certified Childcare Specialist",
        "services": ["babysitting", "cooking_services"],
        "languages": ["Telugu", "Hindi", "English"],
        "hourly_rate": 300,
        "monthly_rate": 7200,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"],
        "bio": "Certified infant & toddler care specialist. Experienced with active play, hygiene, feeding, and storytelling. Loved by toddlers and relied on by working parents.",
        "reviews": [
            {"user": "Divya Prasad", "rating": 5, "comment": "She took care of our 2-year old twins so warmly. Complete peace of mind during work hours.", "date": "4 days ago"}
        ]
    },
    {
        "id": "w_104",
        "name": "Radha Bai",
        "age": 42,
        "gender": "Female",
        "city": "Mumbai",
        "locality": "Andheri West / Juhu",
        "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        "experience_years": 8,
        "rating": 4.92,
        "reviews_count": 165,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Deep Cleaning Pro",
        "services": ["house_cleaning", "dishwashing", "laundry_services"],
        "languages": ["Hindi", "Marathi"],
        "hourly_rate": 210,
        "monthly_rate": 3900,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["07:30 AM - 10:30 AM", "11:30 AM - 02:30 PM", "04:30 PM - 07:30 PM"],
        "bio": "Diligent housekeeper with 8 years in western Mumbai societies. Specializes in dust-free floor mopping, utensil sparkle, and garment steam ironing.",
        "reviews": [
            {"user": "Rohan Shah", "rating": 5, "comment": "Fast and thorough. Our clothes and kitchen look pristine every single day.", "date": "5 days ago"}
        ]
    },
    {
        "id": "w_105",
        "name": "Anjali Verma",
        "age": 36,
        "gender": "Female",
        "city": "Delhi NCR",
        "locality": "Noida / Sector 62 & Indirapuram",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        "experience_years": 9,
        "rating": 4.91,
        "reviews_count": 82,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Elderly Care Companion",
        "services": ["elderly_assistance", "cooking_services"],
        "languages": ["Hindi", "English"],
        "hourly_rate": 280,
        "monthly_rate": 6900,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["08:00 AM - 12:00 PM", "02:00 PM - 06:00 PM"],
        "bio": "Compassionate senior attendant with training in elderly mobility, hydration schedules, medication management, and warm conversation for seniors.",
        "reviews": [
            {"user": "Kapil Mehra", "rating": 5, "comment": "Anjali looks after my elderly mother with so much patience and affection. Highly recommended.", "date": "2 weeks ago"}
        ]
    },
    {
        "id": "w_106",
        "name": "Kavitha Reddy",
        "age": 31,
        "gender": "Female",
        "city": "Hyderabad",
        "locality": "Kondapur / Miyapur",
        "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
        "experience_years": 6,
        "rating": 4.94,
        "reviews_count": 134,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "All-in-One Domestic Pro",
        "services": ["house_cleaning", "dishwashing", "laundry_services", "cooking_services"],
        "languages": ["Telugu", "Hindi"],
        "hourly_rate": 250,
        "monthly_rate": 5200,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["07:00 AM - 10:00 AM", "01:00 PM - 04:00 PM", "05:00 PM - 08:00 PM"],
        "bio": "Multi-talented helper who manages sweeping, mopping, utensil cleaning, and tasty home cooked dinners. Punctual, polite, and verified.",
        "reviews": [
            {"user": "Karthik V.", "rating": 5, "comment": "Kavitha is super efficient and takes care of all our daily chores in 2 hours flat.", "date": "3 days ago"}
        ]
    },
    {
        "id": "w_107",
        "name": "Meena Patil",
        "age": 28,
        "gender": "Female",
        "city": "Bengaluru",
        "locality": "Indiranagar / Domlur",
        "avatar": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        "experience_years": 4,
        "rating": 4.82,
        "reviews_count": 67,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Laundry & Fabric Care",
        "services": ["laundry_services", "house_cleaning", "dishwashing"],
        "languages": ["Kannada", "Hindi", "English"],
        "hourly_rate": 190,
        "monthly_rate": 3600,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["09:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
        "bio": "Expert in laundry sorting, gentle machine wash, crisp steam pressing, and general dusting. Friendly and cooperative.",
        "reviews": [
            {"user": "Pooja Hegde", "rating": 5, "comment": "Clothes are folded like a retail showroom. Very happy with Meena's service.", "date": "1 week ago"}
        ]
    },
    {
        "id": "w_108",
        "name": "Priya Sundaram",
        "age": 35,
        "gender": "Female",
        "city": "Bengaluru",
        "locality": "Whitefield / Bellandur",
        "avatar": "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80",
        "experience_years": 7,
        "rating": 4.96,
        "reviews_count": 120,
        "verified": True,
        "police_verified": True,
        "aadhaar_verified": True,
        "badge": "Nanny & Meal Specialist",
        "services": ["babysitting", "cooking_services", "elderly_assistance"],
        "languages": ["Tamil", "English", "Hindi", "Kannada"],
        "hourly_rate": 290,
        "monthly_rate": 6800,
        "availability_status": "Available Today",
        "available_now": True,
        "slots": ["08:30 AM - 12:30 PM", "02:30 PM - 06:30 PM"],
        "bio": "Certified first-aid and childcare provider. Also prepares wholesome South Indian and continental snacks for kids. Trusted by IT couples across Whitefield.",
        "reviews": [
            {"user": "Swathi Nathan", "rating": 5, "comment": "Priya is so gentle and patient with our daughter. Her food is also amazing.", "date": "Yesterday"}
        ]
    }
]

DEFAULT_BOOKINGS = [
    {
        "id": "SH-7821",
        "customer_name": "Siddharth Rao",
        "customer_phone": "+91 98765 43210",
        "customer_address": "Flat 402, Sunshine Towers, Hitec City, Hyderabad",
        "worker_id": "w_101",
        "worker_name": "Lakshmi Devi",
        "worker_phone": "+91 91234 56789",
        "service_id": "cooking_services",
        "service_name": "Cooking Services",
        "plan_type": "Daily Recurring (Monthly)",
        "date": "2026-11-05",
        "time_slot": "07:30 AM - 09:30 AM",
        "status": "Confirmed",
        "otp": "4819",
        "total_amount": 4500,
        "payment_method": "UPI (Razorpay)",
        "payment_status": "Paid Online",
        "special_instructions": "Low oil, spicy Andhra style curry and rotis for 3 persons.",
        "created_at": "2026-11-04 10:15 AM"
    },
    {
        "id": "SH-7820",
        "customer_name": "Ananya Sen",
        "customer_phone": "+91 99887 76655",
        "customer_address": "Villa 14, Prestige Palm, Whitefield, Bengaluru",
        "worker_id": "w_108",
        "worker_name": "Priya Sundaram",
        "worker_phone": "+91 94567 12389",
        "service_id": "babysitting",
        "service_name": "Babysitting & Childcare",
        "plan_type": "One-Time Booking (4 Hours)",
        "date": "2026-11-04",
        "time_slot": "02:30 PM - 06:30 PM",
        "status": "In Progress",
        "otp": "9214",
        "total_amount": 1196,
        "payment_method": "Credit Card",
        "payment_status": "Paid Online",
        "special_instructions": "Keep eye on 3-year-old child during afternoon playtime.",
        "created_at": "2026-11-04 09:00 AM"
    },
    {
        "id": "SH-7815",
        "customer_name": "Mahesh Iyer",
        "customer_phone": "+91 98451 23456",
        "customer_address": "Tower 2, Apt 1104, Andheri West, Mumbai",
        "worker_id": "w_104",
        "worker_name": "Radha Bai",
        "worker_phone": "+91 98712 34567",
        "service_id": "house_cleaning",
        "service_name": "House Cleaning",
        "plan_type": "One-Time Booking (2.5 Hours)",
        "date": "2026-11-03",
        "time_slot": "10:00 AM - 12:30 PM",
        "status": "Completed",
        "otp": "3190",
        "total_amount": 549,
        "payment_method": "Cash on Delivery",
        "payment_status": "Settled Cash",
        "special_instructions": "Full mopping and balcony dusting.",
        "created_at": "2026-11-02 04:30 PM"
    }
]

DEFAULT_DISPUTES = [
    {
        "id": "DISP-101",
        "booking_id": "SH-7809",
        "customer_name": "Pooja Hegde",
        "subject": "Delayed Arrival Notification",
        "details": "Worker arrived 25 minutes late due to metro breakdown. Resolved amicably with extra 30 mins work.",
        "status": "Resolved",
        "date": "2026-11-02"
    },
    {
        "id": "DISP-102",
        "booking_id": "SH-7818",
        "customer_name": "Rajesh Gupta",
        "subject": "Reschedule Request",
        "details": "Customer requested slot postponement from 8 AM to 11 AM due to flight delay.",
        "status": "Pending Admin Approval",
        "date": "2026-11-04"
    }
]

# File persistence helpers
def read_json(filepath, default_val):
    if not os.path.exists(filepath):
        write_json(filepath, default_val)
        return default_val
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return default_val

def write_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def get_services():
    return read_json(SERVICES_FILE, DEFAULT_SERVICES)

def get_workers():
    return read_json(WORKERS_FILE, DEFAULT_WORKERS)

def get_bookings():
    return read_json(BOOKINGS_FILE, DEFAULT_BOOKINGS)

def get_disputes():
    return read_json(DISPUTES_FILE, DEFAULT_DISPUTES)

# ==========================================
# PAGE ROUTES
# ==========================================

@app.route("/")
def home():
    services = get_services()
    workers = get_workers()
    featured_workers = workers[:4]
    return render_template("index.html", services=services, featured_workers=featured_workers, all_workers=workers)

@app.route("/services")
def services_page():
    services = get_services()
    return render_template("services.html", services=services)

@app.route("/helpers")
def helpers_page():
    services = get_services()
    workers = get_workers()
    selected_service = request.args.get("service", "")
    selected_city = request.args.get("city", "")
    return render_template("helpers.html", services=services, workers=workers, selected_service=selected_service, selected_city=selected_city)

@app.route("/book")
def book_page():
    services = get_services()
    workers = get_workers()
    worker_id = request.args.get("worker_id", "")
    service_id = request.args.get("service_id", "")
    selected_worker = next((w for w in workers if w["id"] == worker_id), None)
    return render_template("book.html", services=services, workers=workers, selected_worker=selected_worker, preselected_service=service_id)

@app.route("/bookings")
def bookings_page():
    bookings = get_bookings()
    return render_template("bookings.html", bookings=bookings)

@app.route("/worker/portal")
def worker_portal():
    workers = get_workers()
    # Default to first worker for demonstration dashboard
    active_worker = workers[0] if workers else None
    services = get_services()
    worker_bookings = [b for b in get_bookings() if b.get("worker_id") == (active_worker["id"] if active_worker else "")]
    return render_template("worker.html", worker=active_worker, services=services, bookings=worker_bookings)

@app.route("/admin")
def admin_page():
    workers = get_workers()
    bookings = get_bookings()
    disputes = get_disputes()
    services = get_services()
    
    total_revenue = sum(b.get("total_amount", 0) for b in bookings if b.get("status") in ["Confirmed", "Completed", "In Progress"])
    verified_count = sum(1 for w in workers if w.get("verified"))
    
    metrics = {
        "total_bookings": len(bookings),
        "active_workers": len(workers),
        "verified_workers": verified_count,
        "total_revenue": total_revenue,
        "pending_disputes": sum(1 for d in disputes if d.get("status") != "Resolved")
    }
    return render_template("admin.html", workers=workers, bookings=bookings, disputes=disputes, services=services, metrics=metrics)

@app.route("/emergency")
def emergency_page():
    services = get_services()
    available_workers = [w for w in get_workers() if w.get("available_now")]
    return render_template("emergency.html", services=services, workers=available_workers)

@app.route("/presentation")
def presentation_page():
    return render_template("presentation.html")

@app.route("/download-ppt")
def download_ppt():
    ppt_path = os.path.join(os.path.dirname(__file__), "SparkleHome_Domestic_Services_Presentation.pptx")
    if not os.path.exists(ppt_path):
        # Fallback to old name if exists
        ppt_path = os.path.join(os.path.dirname(__file__), "SparkleHome_Project_Presentation.pptx")
    return send_file(ppt_path, as_attachment=True, download_name="SparkleHome_Project_Presentation.pptx")

# ==========================================
# REST API ENDPOINTS
# ==========================================

@app.route("/api/workers", methods=["GET"])
def api_get_workers():
    workers = get_workers()
    service = request.args.get("service")
    city = request.args.get("city")
    max_rate = request.args.get("max_rate", type=int)
    
    filtered = workers
    if service:
        filtered = [w for w in filtered if service in w.get("services", [])]
    if city:
        filtered = [w for w in filtered if city.lower() in w.get("city", "").lower()]
    if max_rate:
        filtered = [w for w in filtered if w.get("hourly_rate", 999) <= max_rate]
    return jsonify({"success": True, "count": len(filtered), "workers": filtered})

@app.route("/api/workers/<worker_id>", methods=["GET"])
def api_get_worker(worker_id):
    workers = get_workers()
    worker = next((w for w in workers if w["id"] == worker_id), None)
    if not worker:
        return jsonify({"success": False, "error": "Worker not found"}), 404
    return jsonify({"success": True, "worker": worker})

@app.route("/api/bookings", methods=["POST"])
def api_create_booking():
    data = request.get_json() or {}
    customer_name = data.get("customer_name")
    customer_phone = data.get("customer_phone")
    customer_address = data.get("customer_address")
    worker_id = data.get("worker_id")
    service_id = data.get("service_id")
    date = data.get("date")
    time_slot = data.get("time_slot")
    plan_type = data.get("plan_type", "One-Time Booking")
    payment_method = data.get("payment_method", "Cash on Delivery")
    special_instructions = data.get("special_instructions", "")

    if not all([customer_name, customer_phone, customer_address, service_id, date, time_slot]):
        return jsonify({"success": False, "error": "Please provide all required fields."}), 400

    workers = get_workers()
    worker = next((w for w in workers if w["id"] == worker_id), None)
    services = get_services()
    service = next((s for s in services if s["id"] == service_id), None)

    service_name = service["name"] if service else "Domestic Service"
    worker_name = worker["name"] if worker else "Any Available Verified Maid"
    worker_phone = "+91 98" + str(uuid.uuid4().int)[:8]

    # Calculate price
    if "Monthly" in plan_type and service:
        base_amt = service.get("monthly_rate", 3500)
    elif service:
        base_amt = service.get("hourly_rate", 199) * 2
    else:
        base_amt = 499

    platform_fee = 29
    gst = int(base_amt * 0.05)
    total_amount = base_amt + platform_fee + gst

    new_booking = {
        "id": f"SH-{uuid.uuid4().hex[:4].upper()}",
        "customer_name": customer_name,
        "customer_phone": customer_phone,
        "customer_address": customer_address,
        "worker_id": worker_id or "auto_assigned",
        "worker_name": worker_name,
        "worker_phone": worker_phone,
        "service_id": service_id,
        "service_name": service_name,
        "plan_type": plan_type,
        "date": date,
        "time_slot": time_slot,
        "status": "Confirmed",
        "otp": str(uuid.uuid4().int)[:4],
        "total_amount": total_amount,
        "payment_method": payment_method,
        "payment_status": "Paid Online" if "UPI" in payment_method or "Card" in payment_method else "Pending Cash Collection",
        "special_instructions": special_instructions,
        "created_at": datetime.now().strftime("%Y-%m-%d %I:%M %p")
    }

    bookings = get_bookings()
    bookings.insert(0, new_booking)
    write_json(BOOKINGS_FILE, bookings)

    return jsonify({"success": True, "booking": new_booking, "message": "Booking confirmed successfully!"})

@app.route("/api/bookings/<booking_id>/cancel", methods=["POST"])
def api_cancel_booking(booking_id):
    bookings = get_bookings()
    for b in bookings:
        if b["id"] == booking_id:
            b["status"] = "Cancelled"
            write_json(BOOKINGS_FILE, bookings)
            return jsonify({"success": True, "message": f"Booking {booking_id} cancelled."})
    return jsonify({"success": False, "error": "Booking not found"}), 404

@app.route("/api/worker/register", methods=["POST"])
def api_worker_register():
    data = request.get_json() or {}
    name = data.get("name")
    phone = data.get("phone")
    city = data.get("city", "Hyderabad")
    locality = data.get("locality", "Central")
    selected_services = data.get("services", ["house_cleaning"])
    hourly_rate = data.get("hourly_rate", 200)
    monthly_rate = data.get("monthly_rate", 4000)
    experience_years = data.get("experience_years", 3)
    languages = data.get("languages", ["Hindi", "English"])
    bio = data.get("bio", "Experienced and punctual domestic helper.")

    if not name or not phone:
        return jsonify({"success": False, "error": "Name and phone are required."}), 400

    new_worker = {
        "id": f"w_{uuid.uuid4().hex[:4]}",
        "name": name,
        "phone": phone,
        "city": city,
        "locality": locality,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        "experience_years": int(experience_years),
        "rating": 5.0,
        "reviews_count": 0,
        "verified": False, # Needs Admin approval
        "police_verified": False,
        "aadhaar_verified": True,
        "badge": "Newly Registered Helper",
        "services": selected_services,
        "languages": languages,
        "hourly_rate": int(hourly_rate),
        "monthly_rate": int(monthly_rate),
        "availability_status": "Pending Admin Approval",
        "available_now": False,
        "slots": ["08:00 AM - 12:00 PM", "02:00 PM - 06:00 PM"],
        "bio": bio,
        "reviews": []
    }

    workers = get_workers()
    workers.append(new_worker)
    write_json(WORKERS_FILE, workers)

    return jsonify({"success": True, "worker": new_worker, "message": "Registration submitted! Verification is pending admin review."})

@app.route("/api/admin/verify-worker/<worker_id>", methods=["POST"])
def api_admin_verify_worker(worker_id):
    workers = get_workers()
    for w in workers:
        if w["id"] == worker_id:
            w["verified"] = True
            w["police_verified"] = True
            w["availability_status"] = "Available Today"
            w["available_now"] = True
            w["badge"] = "Verified Domestic Pro"
            write_json(WORKERS_FILE, workers)
            return jsonify({"success": True, "message": f"Worker {w['name']} has been verified and approved!"})
    return jsonify({"success": False, "error": "Worker not found"}), 404

@app.route("/api/worker/toggle-status/<worker_id>", methods=["POST"])
def api_toggle_worker_status(worker_id):
    workers = get_workers()
    for w in workers:
        if w["id"] == worker_id:
            w["available_now"] = not w.get("available_now", False)
            w["availability_status"] = "Available Today" if w["available_now"] else "On Leave"
            write_json(WORKERS_FILE, workers)
            return jsonify({"success": True, "available_now": w["available_now"], "status": w["availability_status"]})
    return jsonify({"success": False, "error": "Worker not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
