"""
Generate Professional Widescreen PowerPoint Presentation for Sparkle Home
Theme: Smart Home Service Booking Platform – Maid & Domestic Help Services
Tagline: Your Home, Our Care – Book Trusted Helpers at Your Convenience.
"""
import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    # 16:9 widescreen format
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Brand Design System Colors
    DEEP_NAVY = RGBColor(0x0F, 0x17, 0x2A)     # #0F172A
    PRIMARY_BLUE = RGBColor(0x25, 0x63, 0xEB)  # #2563EB
    ACCENT_AMBER = RGBColor(0xF5, 0x9E, 0x0B)  # #F59E0B
    SUCCESS_GREEN = RGBColor(0x10, 0xB9, 0x81) # #10B981
    SLATE_DARK = RGBColor(0x1E, 0x29, 0x3B)    # #1E293B
    LIGHT_BG = RGBColor(0xF8, 0xFA, 0xFC)      # #F8FAFC
    CARD_BG = RGBColor(0xFF, 0xFF, 0xFF)       # #FFFFFF
    BORDER_COLOR = RGBColor(0xE2, 0xE8, 0xF0)  # #E2E8F0
    TEXT_MAIN = RGBColor(0x0F, 0x17, 0x2A)     # #0F172A
    TEXT_MUTED = RGBColor(0x64, 0x74, 0x8B)    # #64748B
    TEXT_WHITE = RGBColor(0xFF, 0xFF, 0xFF)

    def set_slide_bg(slide, color=LIGHT_BG):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()

    def add_header(slide, title_text, category_text="SPARKLE HOME • PROJECT PRESENTATION", slide_num=None):
        # Top banner background
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.15))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = DEEP_NAVY
        top_bar.line.fill.background()

        # Accent thin line
        accent_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.15), Inches(13.333), Inches(0.06))
        accent_line.fill.solid()
        accent_line.fill.fore_color.rgb = PRIMARY_BLUE
        accent_line.line.fill.background()

        # Category tag
        tx_cat = slide.shapes.add_textbox(Inches(0.8), Inches(0.18), Inches(10), Inches(0.3))
        p_cat = tx_cat.text_frame.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(9.5)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_AMBER
        p_cat.font.name = "Arial"

        # Main Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(10), Inches(0.6))
        p_title = tx_title.text_frame.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        p_title.font.name = "Arial"

        # Footer
        footer_tx = slide.shapes.add_textbox(Inches(0.8), Inches(7.1), Inches(8), Inches(0.3))
        pf = footer_tx.text_frame.paragraphs[0]
        pf.text = "Sparkle Home Platform | Smart Maid & Domestic Help Booking Platform"
        pf.font.size = Pt(9)
        pf.font.color.rgb = TEXT_MUTED
        pf.font.name = "Arial"

        if slide_num:
            num_tx = slide.shapes.add_textbox(Inches(11.8), Inches(7.1), Inches(1), Inches(0.3))
            pn = num_tx.text_frame.paragraphs[0]
            pn.alignment = PP_ALIGN.RIGHT
            pn.text = f"{slide_num} / 14"
            pn.font.size = Pt(9)
            pn.font.bold = True
            pn.font.color.rgb = PRIMARY_BLUE
            pn.font.name = "Arial"

    def add_card(slide, left, top, width, height, title="", border_color=BORDER_COLOR, bg_color=CARD_BG):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)
        
        if title:
            tb = slide.shapes.add_textbox(Inches(left + 0.25), Inches(top + 0.2), Inches(width - 0.5), Inches(0.4))
            p = tb.text_frame.paragraphs[0]
            p.text = title
            p.font.size = Pt(13)
            p.font.bold = True
            p.font.color.rgb = PRIMARY_BLUE
            p.font.name = "Arial"
        return card

    # ==========================================
    # SLIDE 1: Cover Slide
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s1, DEEP_NAVY)

    # Accent decorative strip
    strip = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.15))
    strip.fill.solid()
    strip.fill.fore_color.rgb = PRIMARY_BLUE
    strip.line.fill.background()

    # Pill badge
    badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(1.4), Inches(4.5), Inches(0.45))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    badge.line.color.rgb = PRIMARY_BLUE
    b_tx = badge.text_frame.paragraphs[0]
    b_tx.alignment = PP_ALIGN.CENTER
    b_tx.text = "✦ SMART DOMESTIC SERVICES BOOKING PLATFORM"
    b_tx.font.size = Pt(9.5)
    b_tx.font.bold = True
    b_tx.font.color.rgb = ACCENT_AMBER

    # Title & Tagline
    t_box = s1.shapes.add_textbox(Inches(1.2), Inches(2.1), Inches(11.0), Inches(2.4))
    tf = t_box.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = "Sparkle Home"
    p1.font.size = Pt(54)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE
    p1.font.name = "Arial"

    p2 = tf.add_paragraph()
    p2.text = "A Smart Maid & Domestic Home Services Booking Platform"
    p2.font.size = Pt(22)
    p2.font.color.rgb = PRIMARY_BLUE
    p2.font.bold = True
    p2.font.name = "Arial"

    p3 = tf.add_paragraph()
    p3.text = '"Your Home, Our Care – Book Trusted Helpers at Your Convenience."'
    p3.font.size = Pt(14)
    p3.font.italic = True
    p3.font.color.rgb = RGBColor(0x94, 0xA3, 0xB8)
    p3.font.name = "Arial"

    # Metadata card at bottom
    add_card(s1, 1.2, 4.8, 10.9, 1.8, bg_color=RGBColor(0x16, 0x22, 0x38), border_color=PRIMARY_BLUE)
    c_tb = s1.shapes.add_textbox(Inches(1.5), Inches(5.0), Inches(10.3), Inches(1.4))
    ctf = c_tb.text_frame
    cp1 = ctf.paragraphs[0]
    cp1.text = "PROJECT OVERVIEW & KEY DOMAINS"
    cp1.font.size = Pt(10)
    cp1.font.bold = True
    cp1.font.color.rgb = ACCENT_AMBER

    cp2 = ctf.add_paragraph()
    cp2.text = "• Core Focus: On-Demand & Monthly Domestic Helpers (Maids, Cooks, Babysitters, Laundry, Caregivers)"
    cp2.font.size = Pt(11)
    cp2.font.color.rgb = TEXT_WHITE

    cp3 = ctf.add_paragraph()
    cp3.text = "• Ecosystem: Tri-Role Digital Architecture (Customer Portal, Worker/Maid Portal, Admin Verification Desk)"
    cp3.font.size = Pt(11)
    cp3.font.color.rgb = TEXT_WHITE

    cp4 = ctf.add_paragraph()
    cp4.text = "• Technology Stack: Full-Stack Web Engine · React/Flask · Tailwind CSS · Razorpay · Google Maps API"
    cp4.font.size = Pt(11)
    cp4.font.color.rgb = RGBColor(0x60, 0xA5, 0xFA)

    # ==========================================
    # SLIDE 2: Project Overview & Vision
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s2)
    add_header(s2, "1. Project Overview & Market Vision", "EXECUTIVE SUMMARY", 2)

    add_card(s2, 0.8, 1.5, 5.6, 5.3, "What is Sparkle Home?", border_color=PRIMARY_BLUE)
    t2_left = s2.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf2_l = t2_left.text_frame
    tf2_l.word_wrap = True
    overview_items = [
        ("Web-Based & Mobile-Friendly:", "A modern digital marketplace connecting urban households with verified domestic workers."),
        ("Multi-Service Marketplace:", "Enables booking of maids, house cleaners, home cooks, babysitters, laundry staff, and senior companions."),
        ("Complete Transparency:", "Customers browse worker profiles, compare fixed pricing, inspect verified ratings, and select exact time slots."),
        ("Empowerment for Helpers:", "Provides dignified, reliable employment and fair compensation for informal domestic workers in India.")
    ]
    for idx, (title, desc) in enumerate(overview_items):
        p = tf2_l.paragraphs[0] if idx == 0 else tf2_l.add_paragraph()
        p.text = f"✦ {title} {desc}"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(10)

    add_card(s2, 6.9, 1.5, 5.6, 5.3, "Core Value Propositions", border_color=SUCCESS_GREEN)
    t2_right = s2.shapes.add_textbox(Inches(7.2), Inches(2.2), Inches(5.0), Inches(4.3))
    tf2_r = t2_right.text_frame
    tf2_r.word_wrap = True
    value_props = [
        ("Simplicity & Speed:", "Hire trustworthy domestic help in under 60 seconds without middleman agencies."),
        ("Vetted Safety:", "100% Aadhaar authentication and police record verification before workers take jobs."),
        ("Flexible Commitment:", "Choose between 2-hour on-demand visits, weekly deep cleans, or monthly recurring maid packages."),
        ("Digital Convenience:", "Seamless online UPI/Cards/COD payment, booking tracking, and two-way review rating systems.")
    ]
    for idx, (title, desc) in enumerate(value_props):
        p = tf2_r.paragraphs[0] if idx == 0 else tf2_r.add_paragraph()
        p.text = f"✓ {title} {desc}"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(10)

    # ==========================================
    # SLIDE 3: Problem Statement
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s3)
    add_header(s3, "2. Problem Statement: Traditional Hiring Bottlenecks", "MARKET CHALLENGES", 3)

    add_card(s3, 0.8, 1.5, 5.6, 5.3, "Traditional Domestic Help Challenges", border_color=RGBColor(0xEF, 0x44, 0x44))
    t3_l = s3.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf3_l = t3_l.text_frame
    tf3_l.word_wrap = True
    problems = [
        ("Trust & Security Deficit:", "Difficulty finding trustworthy and experienced maids through informal word-of-mouth."),
        ("No Comparison Matrix:", "No centralized platform to compare worker skills, experience, or track records."),
        ("Arbitrary Pricing:", "Lack of transparent pricing; informal haggling with zero standardization."),
        ("Scheduling Chaos:", "Unpredictable worker availability and constant double-booking friction."),
        ("Zero Accountability:", "No recourse when workers take sudden leaves or fail to arrive."),
        ("Limited Worker Reach:", "Domestic workers struggle to discover reliable, high-paying households.")
    ]
    for idx, (title, desc) in enumerate(problems):
        p = tf3_l.paragraphs[0] if idx == 0 else tf3_l.add_paragraph()
        p.text = f"✕ {title} {desc}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(8)

    add_card(s3, 6.9, 1.5, 5.6, 5.3, "The Sparkle Home Solution", border_color=SUCCESS_GREEN)
    t3_r = s3.shapes.add_textbox(Inches(7.2), Inches(2.2), Inches(5.0), Inches(4.3))
    tf3_r = t3_r.text_frame
    tf3_r.word_wrap = True
    solutions = [
        ("Centralized Marketplace:", "A single verified digital platform connecting households with vetted service providers."),
        ("Standardized Pricing:", "Fixed upfront hourly (₹149-₹299/hr) and monthly rates before booking."),
        ("KYC Verification Workflow:", "Aadhaar and police background checks performed prior to worker onboarding."),
        ("Conflict-Free Calendars:", "Real-time slot locking guarantees workers never get double-booked."),
        ("Automated Replacement:", "Guaranteed standby helper dispatch if assigned worker is unavailable."),
        ("Digital Empowerment:", "Domestic workers gain access to thousands of clients and direct bank payouts.")
    ]
    for idx, (title, desc) in enumerate(solutions):
        p = tf3_r.paragraphs[0] if idx == 0 else tf3_r.add_paragraph()
        p.text = f"✓ {title} {desc}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(8)

    # ==========================================
    # SLIDE 4: Main Objectives
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s4)
    add_header(s4, "3. Main Objectives & Strategic Goals", "PROJECT GOALS", 4)

    objectives = [
        ("1. Unified Platform", "Provide a single centralized ecosystem for booking domestic maids, cooks, and caretakers.", Inches(0.8), Inches(1.5)),
        ("2. Verified Helpers", "Connect urban customers only with thoroughly vetted and background-checked domestic workers.", Inches(4.8), Inches(1.5)),
        ("3. Tailored Selection", "Allow users to select exact household services based on room size, schedule, and dietary preferences.", Inches(8.8), Inches(1.5)),
        ("4. Transparent Pricing", "Eliminate unfair bargaining by publishing clear upfront hourly, daily, and monthly rate cards.", Inches(0.8), Inches(4.2)),
        ("5. Real-Time Booking", "Enable instant availability checks and interactive time-slot locking with zero scheduling conflicts.", Inches(4.8), Inches(4.2)),
        ("6. Worker Welfare", "Formalize domestic labor, provide predictable incomes, and support digital financial inclusion.", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, left, top in objectives:
        add_card(s4, left.inches, top.inches, 3.7, 2.5, title)
        tb = s4.shapes.add_textbox(left + Inches(0.25), top + Inches(0.7), Inches(3.2), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 5: Core Services Catalog (6 Pillars)
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s5)
    add_header(s5, "4. Core Domestic Services Catalog (6 Pillars)", "SERVICE OFFERINGS", 5)

    services_data = [
        ("House Cleaning", "Daily sweeping, mopping with disinfectant, surface dusting, and trash clearance.", "₹199/hr • ₹3,500/mo", Inches(0.8), Inches(1.5)),
        ("Cooking Services", "Fresh breakfast, lunch, or dinner preparation; North/South Indian cuisine & diet prep.", "₹249/hr • ₹4,500/mo", Inches(4.8), Inches(1.5)),
        ("Dishwashing", "Scrubbing pots and pans, soap sanitization, sink cleaning, and utensil rack stacking.", "₹149/hr • ₹2,200/mo", Inches(8.8), Inches(1.5)),
        ("Laundry Services", "Garment washing machine management, line drying, wardrobe folding, and steam ironing.", "₹179/hr • ₹2,800/mo", Inches(0.8), Inches(4.2)),
        ("Babysitting", "Infant and toddler supervision, active educational play, milk warming, and vigilant safety.", "₹299/hr • ₹6,500/mo", Inches(4.8), Inches(4.2)),
        ("Elderly Assistance", "Non-medical senior companionship, gentle walking support, and medication schedule reminders.", "₹279/hr • ₹7,000/mo", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, rate, left, top in services_data:
        add_card(s5, left.inches, top.inches, 3.7, 2.5, title)
        tb = s5.shapes.add_textbox(left + Inches(0.25), top + Inches(0.65), Inches(3.2), Inches(1.7))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = desc
        p1.font.size = Pt(11)
        p1.font.color.rgb = TEXT_MUTED

        p2 = tf.add_paragraph()
        p2.text = f"Standard Rates: {rate}"
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = PRIMARY_BLUE
        p2.space_before = Pt(8)

    # ==========================================
    # SLIDE 6: Tri-Role User Architecture
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s6)
    add_header(s6, "5. Tri-Role User Ecosystem & Responsibilities", "PLATFORM ARCHITECTURE", 6)

    roles = [
        ("A. Customer / User", [
            "Register & manage profile",
            "Search helpers by city & locality",
            "Browse 6 service categories",
            "Check ratings, reviews & pricing",
            "Select date & time slots",
            "Pay via UPI, Cards, or Cash",
            "Track status & submit reviews"
        ], Inches(0.8), PRIMARY_BLUE),
        ("B. Maid / Service Provider", [
            "Register as service provider",
            "Upload photo & Aadhaar KYC",
            "Select offered domestic services",
            "Set custom hourly & monthly rates",
            "Set availability calendar",
            "Accept or decline booking requests",
            "Track earnings & bank payouts"
        ], Inches(4.8), SUCCESS_GREEN),
        ("C. Super Admin", [
            "Central management dashboard",
            "Verify worker KYC & police records",
            "Approve or reject registrations",
            "Manage service categories & rates",
            "Monitor live bookings & dispatches",
            "Resolve complaints & disputes",
            "Generate platform analytics"
        ], Inches(8.8), ACCENT_AMBER)
    ]
    for title, points, left, accent in roles:
        add_card(s6, left.inches, 1.5, 3.7, 5.3, title, border_color=accent)
        tb = s6.shapes.add_textbox(left + Inches(0.25), Inches(2.2), Inches(3.2), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        for idx, pt in enumerate(points):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = f"• {pt}"
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_MAIN
            p.space_after = Pt(8)

    # ==========================================
    # SLIDE 7: Major Platform Features Matrix
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s7)
    add_header(s7, "6. Major Platform Technical Features", "CORE FUNCTIONALITY", 7)

    features = [
        ("Authentication & RBAC", "Secure login and registration with JWT and password hashing (bcrypt)."),
        ("Worker KYC Verification", "Government ID, address validation, and police check approval workflow."),
        ("Location-Based Search", "Find nearest available domestic helpers based on customer locality."),
        ("Smart Calendar Booking", "Dynamic slot locking that eliminates worker double-booking."),
        ("Transparent Fare Engine", "Instant upfront quote calculation (Base rate + 5% GST + ₹29 Platform fee)."),
        ("Multi-Channel Payments", "Razorpay integration for instant UPI, Cards, and Cash on Delivery."),
        ("Real-Time OTP Verification", "4-digit service start OTP ensures only the verified helper enters."),
        ("Admin Control Center", "Complete oversight over registrations, transactions, and dispute handling.")
    ]
    # 2 columns x 4 rows
    for idx, (title, desc) in enumerate(features):
        col = idx // 4
        row = idx % 4
        left = 0.8 + col * 5.9
        top = 1.5 + row * 1.35
        card = add_card(s7, left, top, 5.6, 1.2, title)
        tb = s7.shapes.add_textbox(Inches(left + 0.25), Inches(top + 0.55), Inches(5.1), Inches(0.55))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 8: Unique Selling Points (USPs)
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s8)
    add_header(s8, "7. Unique Selling Points (USPs) & Differentiators", "COMPETITIVE EDGE", 8)

    usps = [
        ("1. Verified Maid Profiles", "Only KYC-approved domestic helpers can receive client bookings.", Inches(0.8), Inches(1.5)),
        ("2. Hyperlocal Matching", "Match households with domestic workers living within a 3-5 km radius.", Inches(4.8), Inches(1.5)),
        ("3. Flexible Scheduling", "Book hourly on-demand, daily recurring, weekly cleans, or monthly packages.", Inches(8.8), Inches(1.5)),
        ("4. Transparent Pricing", "Full fare breakdown with zero hidden charges or agency cuts.", Inches(0.8), Inches(4.2)),
        ("5. Emergency 1-Hr SOS", "Rapid standby dispatch for surprise dinner guests or absent regular maids.", Inches(4.8), Inches(4.2)),
        ("6. Worker-Centric Platform", "Empowers helpers to control their rates, calendar hours, and track payouts.", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, left, top in usps:
        add_card(s8, left.inches, top.inches, 3.7, 2.5, title, border_color=PRIMARY_BLUE)
        tb = s8.shapes.add_textbox(left + Inches(0.25), top + Inches(0.7), Inches(3.2), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 9: Booking Workflow
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s9)
    add_header(s9, "8. End-to-End Booking & Service Workflow", "USER JOURNEY", 9)

    workflow_steps = [
        ("1. Customer Sign-up", "Create account and enter delivery address & locality.", Inches(0.8)),
        ("2. Select Service", "Choose from Cleaning, Cooking, Babysitting, Laundry, etc.", Inches(2.8)),
        ("3. Compare Helpers", "Review ratings, experience, languages, and rates.", Inches(4.8)),
        ("4. Pick Schedule", "Choose service date, time slot, and frequency.", Inches(6.8)),
        ("5. Pay & Confirm", "Pay online via UPI/Card or select Cash on Delivery.", Inches(8.8)),
        ("6. OTP & Complete", "Helper verifies OTP, completes service; user reviews.", Inches(10.8)),
    ]
    for title, desc, left in workflow_steps:
        card = add_card(s9, left.inches, 2.0, 1.8, 4.3, title, border_color=PRIMARY_BLUE)
        tb = s9.shapes.add_textbox(left + Inches(0.15), Inches(3.2), Inches(1.5), Inches(2.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MUTED

    # Arrow connector indicators
    arr_tb = s9.shapes.add_textbox(Inches(0.8), Inches(6.5), Inches(11.8), Inches(0.4))
    ap = arr_tb.text_frame.paragraphs[0]
    ap.text = "Step 1  ➔  Step 2  ➔  Step 3  ➔  Step 4  ➔  Step 5  ➔  Step 6 (Continuous Digital Feedback Loop)"
    ap.alignment = PP_ALIGN.CENTER
    ap.font.size = Pt(11)
    ap.font.bold = True
    ap.font.color.rgb = PRIMARY_BLUE

    # ==========================================
    # SLIDE 10: Suggested Technology Stack
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s10)
    add_header(s10, "9. Suggested Modern Technology Stack", "SYSTEM ARCHITECTURE", 10)

    tech_layers = [
        ("Frontend Layer", "React.js / Modern Responsive HTML5", "Single-page responsive components, state management"),
        ("Styling & UI", "Tailwind CSS + Lucide Icons", "Mobile-first utility styling, responsive drawer navigation"),
        ("Backend Server", "Node.js + Express.js / Python Flask", "RESTful APIs, routing, booking controllers, JWT middleware"),
        ("Database Layer", "MongoDB (Atlas) / Scalable JSON", "Flexible schemas for workers, service catalogs, bookings"),
        ("Authentication", "JWT + bcrypt Password Hashing", "Secure role-based access control (Customer, Worker, Admin)"),
        ("Maps & Location", "Google Maps Geocoding API", "Proximity radius search, distance matrix, address autofill"),
        ("Payments Gateway", "Razorpay Payment API", "Instant UPI (GPay, PhonePe), Cards, NetBanking, COD"),
        ("Cloud Storage", "Cloudinary / AWS S3", "Secure image storage for worker profiles & KYC Aadhaar cards")
    ]
    for idx, (layer, tech, details) in enumerate(tech_layers):
        col = idx // 4
        row = idx % 4
        left = 0.8 + col * 5.9
        top = 1.5 + row * 1.35
        card = add_card(s10, left, top, 5.6, 1.2, f"{layer}: {tech}")
        tb = s10.shapes.add_textbox(Inches(left + 0.25), Inches(top + 0.55), Inches(5.1), Inches(0.55))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = details
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 11: Main Application Pages
    # ==========================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s11)
    add_header(s11, "10. Main Application Interface Breakdown", "APPLICATION ARCHITECTURE", 11)

    interfaces = [
        ("Customer Interface", [
            "• Landing / Home page with quick finder",
            "• Services catalog page (6 services)",
            "• Helper directory with live filters",
            "• Worker profile & review modal",
            "• Smart booking & price calculator",
            "• My Bookings dashboard (status, OTP)",
            "• Emergency 1-hour dispatch request"
        ], Inches(0.8), PRIMARY_BLUE),
        ("Worker Interface", [
            "• Worker onboarding & registration",
            "• Identity KYC document submission",
            "• Availability toggle (Active / On Leave)",
            "• Manage offered skills & custom rates",
            "• Live incoming requests (Accept / Decline)",
            "• Active assignments & directions",
            "• Weekly earnings wallet & payout stats"
        ], Inches(4.8), SUCCESS_GREEN),
        ("Admin Control Center", [
            "• Super admin analytics & KPI metrics",
            "• Worker KYC verification queue",
            "• Approve / reject worker applications",
            "• Live bookings & dispatches oversight",
            "• Customer complaints & dispute tracker",
            "• Service categories & tariff controls",
            "• Platform revenue audit & export"
        ], Inches(8.8), ACCENT_AMBER)
    ]
    for title, pages, left, accent in interfaces:
        add_card(s11, left.inches, 1.5, 3.7, 5.3, title, border_color=accent)
        tb = s11.shapes.add_textbox(left + Inches(0.25), Inches(2.2), Inches(3.2), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        for idx, pg in enumerate(pages):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = pg
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_MAIN
            p.space_after = Pt(7)

    # ==========================================
    # SLIDE 12: Future Enhancements & Roadmap
    # ==========================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s12)
    add_header(s12, "11. Future Enhancements & Technology Roadmap", "INNOVATION ROADMAP", 12)

    enhancements = [
        ("AI Helper Matching", "Machine learning recommendation engine that matches helpers based on user preferences and diet habits.", Inches(0.8), Inches(1.5)),
        ("Multilingual Voice Booking", "Voice-driven conversational booking in vernacular languages: Telugu, Hindi, Tamil, and English.", Inches(4.8), Inches(1.5)),
        ("WhatsApp Booking Bot", "Direct booking, schedule changes, and arrival alerts via automated WhatsApp Business API.", Inches(8.8), Inches(1.5)),
        ("Monthly Bundles", "Discounted household recurring subscriptions (e.g. Daily Cooking + Maid package).", Inches(0.8), Inches(4.2)),
        ("Real-time GPS Tracking", "Live arrival tracking showing domestic worker transit and ETA on an interactive map.", Inches(4.8), Inches(4.2)),
        ("Multi-City Expansion", "Scaling the platform to Tier-2 and Tier-3 Indian cities with localized domestic training.", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, left, top in enhancements:
        add_card(s12, left.inches, top.inches, 3.7, 2.5, title)
        tb = s12.shapes.add_textbox(left + Inches(0.25), top + Inches(0.7), Inches(3.2), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 13: Expected Project Outcome & Vision
    # ==========================================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s13)
    add_header(s13, "12. Expected Outcomes & Long-Term Vision", "BUSINESS & SOCIAL IMPACT", 13)

    add_card(s13, 0.8, 1.5, 5.6, 5.3, "Transforming Domestic Help in India", border_color=PRIMARY_BLUE)
    t13_l = s13.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf13_l = t13_l.text_frame
    tf13_l.word_wrap = True
    impacts_left = [
        ("Market Formalization:", "Organizes India's massive unorganized domestic work sector into a transparent, structured economy."),
        ("Urban Company Paradigm:", "Adopts the reliable marketplace model of Urban Company but tailored specifically for daily domestic maid & cook services."),
        ("Worker Dignity & Financial Inclusion:", "Domestic helpers receive steady incomes, fair wages, digital bank transfers, and social security."),
        ("Peace of Mind for Households:", "Families enjoy safe, vetted domestic assistance without the anxiety of unexpected leaves or security risks.")
    ]
    for idx, (title, desc) in enumerate(impacts_left):
        p = tf13_l.paragraphs[0] if idx == 0 else tf13_l.add_paragraph()
        p.text = f"✦ {title} {desc}"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(10)

    add_card(s13, 6.9, 1.5, 5.6, 5.3, "Sustainable Revenue Model", border_color=SUCCESS_GREEN)
    t13_r = s13.shapes.add_textbox(Inches(7.2), Inches(2.2), Inches(5.0), Inches(4.3))
    tf13_r = t13_r.text_frame
    tf13_r.word_wrap = True
    revenue_models = [
        ("Platform Convenience Fee:", "Small nominal fee (₹29) per on-demand booking for platform safety & verification."),
        ("Commission on One-Time Services:", "10-15% commission on one-time and emergency dispatch services."),
        ("Subscription Recurring Plans:", "Flat recurring fee for monthly daily maid and cooking management."),
        ("Value-Added Add-ons:", "Deep kitchen degreasing, bathroom descaling, and infant childcare kits.")
    ]
    for idx, (title, desc) in enumerate(revenue_models):
        p = tf13_r.paragraphs[0] if idx == 0 else tf13_r.add_paragraph()
        p.text = f"✓ {title} {desc}"
        p.font.size = Pt(11.5)
        p.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(10)

    # ==========================================
    # SLIDE 14: Conclusion & Q&A
    # ==========================================
    s14 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s14, DEEP_NAVY)

    c_box = s14.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.3), Inches(3.0))
    ctf14 = c_box.text_frame
    ctf14.word_wrap = True
    
    p_concl1 = ctf14.paragraphs[0]
    p_concl1.text = "Thank You!"
    p_concl1.font.size = Pt(52)
    p_concl1.font.bold = True
    p_concl1.font.color.rgb = TEXT_WHITE
    p_concl1.font.name = "Arial"

    p_concl2 = ctf14.add_paragraph()
    p_concl2.text = "Sparkle Home — A Smart Maid & Domestic Home Services Booking Platform"
    p_concl2.font.size = Pt(20)
    p_concl2.font.bold = True
    p_concl2.font.color.rgb = PRIMARY_BLUE
    p_concl2.space_before = Pt(10)

    p_concl3 = ctf14.add_paragraph()
    p_concl3.text = '"Your Home, Our Care – Book Trusted Helpers at Your Convenience."'
    p_concl3.font.size = Pt(15)
    p_concl3.font.italic = True
    p_concl3.font.color.rgb = RGBColor(0x94, 0xA3, 0xB8)
    p_concl3.space_before = Pt(6)

    # Summary box
    add_card(s14, 1.5, 4.6, 10.3, 2.0, bg_color=RGBColor(0x16, 0x22, 0x38), border_color=PRIMARY_BLUE)
    t_end = s14.shapes.add_textbox(Inches(1.8), Inches(4.8), Inches(9.7), Inches(1.6))
    tf_end = t_end.text_frame
    pe1 = tf_end.paragraphs[0]
    pe1.text = "PROJECT SUMMARY & DEMO ACCESS"
    pe1.font.size = Pt(11)
    pe1.font.bold = True
    pe1.font.color.rgb = ACCENT_AMBER

    pe2 = tf_end.add_paragraph()
    pe2.text = "• Live Web Application: http://localhost:5000 (Responsive across mobile, tablet, and desktop)"
    pe2.font.size = Pt(11.5)
    pe2.font.color.rgb = TEXT_WHITE

    pe3 = tf_end.add_paragraph()
    pe3.text = "• Questions & Discussion: Open for Viva Voce, Technical Evaluation & System Demonstration"
    pe3.font.size = Pt(11.5)
    pe3.font.color.rgb = TEXT_WHITE

    # Save presentation
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    out_dir = r"C:\Users\manik\.gemini\antigravity\scratch\sparklehome"
    os.makedirs(out_dir, exist_ok=True)
    target_file = os.path.join(out_dir, "SparkleHome_Domestic_Services_Presentation.pptx")
    create_deck(target_file)
