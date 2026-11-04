"""
Generate High-Quality Professional Widescreen PowerPoint Presentation for Sparkle Home
Theme: Smart Home Service Booking Platform – Maid & Domestic Help Services
Title: Sparkle Home – A Smart Maid & Domestic Home Services Booking Platform
Tagline: Your Home, Our Care – Book Trusted Helpers at Your Convenience.
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_presentation(output_filepath):
    prs = Presentation()
    # 16:9 Widescreen standard
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Color Palette Tokens
    NAVY = RGBColor(0x0F, 0x17, 0x2A)        # #0F172A
    BLUE = RGBColor(0x25, 0x63, 0xEB)        # #2563EB
    AMBER = RGBColor(0xF5, 0x9E, 0x0B)       # #F59E0B
    EMERALD = RGBColor(0x10, 0xB9, 0x81)     # #10B981
    ROSE = RGBColor(0xEF, 0x44, 0x44)        # #EF4444
    LIGHT_BG = RGBColor(0xF8, 0xFA, 0xFC)    # #F8FAFC
    WHITE = RGBColor(0xFF, 0xFF, 0xFF)       # #FFFFFF
    BORDER = RGBColor(0xE2, 0xE8, 0xF0)      # #E2E8F0
    TEXT_DARK = RGBColor(0x0F, 0x17, 0x2A)   # #0F172A
    TEXT_MUTED = RGBColor(0x64, 0x74, 0x8B)  # #64748B
    TEXT_LIGHT = RGBColor(0x94, 0xA3, 0xB8)  # #94A3B8

    def set_bg(slide, color=LIGHT_BG):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()

    def add_header(slide, title_text, category_text="SPARKLE HOME • DOMESTIC HELP PLATFORM", slide_num=None):
        # Top banner
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.15))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = NAVY
        top_bar.line.fill.background()

        # Accent bar
        accent_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.15), Inches(13.333), Inches(0.06))
        accent_line.fill.solid()
        accent_line.fill.fore_color.rgb = BLUE
        accent_line.line.fill.background()

        # Category text
        tx_cat = slide.shapes.add_textbox(Inches(0.8), Inches(0.18), Inches(10), Inches(0.3))
        p_cat = tx_cat.text_frame.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(9.5)
        p_cat.font.bold = True
        p_cat.font.color.rgb = AMBER
        p_cat.font.name = "Arial"

        # Main Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(10), Inches(0.6))
        p_title = tx_title.text_frame.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = WHITE
        p_title.font.name = "Arial"

        # Footer text
        footer_tx = slide.shapes.add_textbox(Inches(0.8), Inches(7.1), Inches(8), Inches(0.3))
        pf = footer_tx.text_frame.paragraphs[0]
        pf.text = "Sparkle Home Platform | https://github.com/darshitha02/sparklehomeservice"
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
            pn.font.color.rgb = BLUE
            pn.font.name = "Arial"

    def add_card(slide, left, top, width, height, title="", border_color=BORDER, bg_color=WHITE):
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
            p.font.color.rgb = BLUE
            p.font.name = "Arial"
        return card

    def set_notes(slide, notes_text):
        slide.notes_slide.notes_text_frame.text = notes_text.strip()

    # ==========================================
    # SLIDE 1: Cover / Title Slide
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_bg(s1, NAVY)

    strip = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.15))
    strip.fill.solid()
    strip.fill.fore_color.rgb = BLUE
    strip.line.fill.background()

    # Pill badge
    badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(1.4), Inches(4.8), Inches(0.45))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    badge.line.color.rgb = BLUE
    b_tx = badge.text_frame.paragraphs[0]
    b_tx.alignment = PP_ALIGN.CENTER
    b_tx.text = "✦ SMART HOME SERVICE BOOKING PLATFORM"
    b_tx.font.size = Pt(9.5)
    b_tx.font.bold = True
    b_tx.font.color.rgb = AMBER

    # Title & Tagline
    t_box = s1.shapes.add_textbox(Inches(1.2), Inches(2.1), Inches(11.0), Inches(2.4))
    tf = t_box.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = "Sparkle Home"
    p1.font.size = Pt(54)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.font.name = "Arial"

    p2 = tf.add_paragraph()
    p2.text = "A Smart Maid & Domestic Home Services Booking Platform"
    p2.font.size = Pt(22)
    p2.font.color.rgb = BLUE
    p2.font.bold = True
    p2.font.name = "Arial"

    p3 = tf.add_paragraph()
    p3.text = '"Your Home, Our Care – Book Trusted Helpers at Your Convenience."'
    p3.font.size = Pt(14)
    p3.font.italic = True
    p3.font.color.rgb = TEXT_LIGHT
    p3.font.name = "Arial"

    # Info card on bottom
    add_card(s1, 1.2, 4.8, 10.9, 1.8, bg_color=RGBColor(0x16, 0x22, 0x38), border_color=BLUE)
    c_tb = s1.shapes.add_textbox(Inches(1.5), Inches(5.0), Inches(10.3), Inches(1.4))
    ctf = c_tb.text_frame
    cp1 = ctf.paragraphs[0]
    cp1.text = "PROJECT METADATA & REPOSITORY REFERENCE"
    cp1.font.size = Pt(10)
    cp1.font.bold = True
    cp1.font.color.rgb = AMBER

    cp2 = ctf.add_paragraph()
    cp2.text = "• GitHub Repository: https://github.com/darshitha02/sparklehomeservice"
    cp2.font.size = Pt(11)
    cp2.font.color.rgb = WHITE

    cp3 = ctf.add_paragraph()
    cp3.text = "• Core Focus: Verified Domestic Helpers (Maids, House Cleaners, Cooks, Babysitters, Caregivers)"
    cp3.font.size = Pt(11)
    cp3.font.color.rgb = WHITE

    cp4 = ctf.add_paragraph()
    cp4.text = "• Full-Stack Architecture: React.js / Flask · Tailwind CSS · Razorpay · Google Maps API"
    cp4.font.size = Pt(11)
    cp4.font.color.rgb = RGBColor(0x60, 0xA5, 0xFA)

    set_notes(s1, "Respected evaluators, faculty members, and peers, welcome to the presentation of Sparkle Home: A Smart Maid & Domestic Home Services Booking Platform. Our motto is 'Your Home, Our Care – Book Trusted Helpers at Your Convenience.' Sparkle Home tackles the widespread unorganized domestic help challenge in Indian households by connecting families with verified domestic maids, cooks, and caregivers through a transparent digital marketplace.")

    # ==========================================
    # SLIDE 2: 1. Project Overview
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_bg(s2)
    add_header(s2, "1. Project Overview & Marketplace Concept", "EXECUTIVE SUMMARY", 2)

    add_card(s2, 0.8, 1.5, 5.6, 5.3, "What is Sparkle Home?", border_color=BLUE)
    t2_l = s2.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf2_l = t2_l.text_frame
    tf2_l.word_wrap = True
    s2_points = [
        ("Web-Based & Mobile-Friendly:", "A modern on-demand digital platform connecting urban households with verified domestic workers."),
        ("Multi-Service Marketplace:", "Covers daily maids, deep cleaners, hygienic home cooks, babysitters, laundry staff, and elderly companions."),
        ("Complete Transparency:", "Customers browse worker profiles, compare fixed hourly and monthly pricing, inspect verified ratings, and select exact time slots."),
        ("Livelihood Empowerment:", "Formalizes informal domestic labor, providing predictable income, fair wages, and financial inclusion for workers across Indian cities.")
    ]
    for idx, (title, desc) in enumerate(s2_points):
        p = tf2_l.paragraphs[0] if idx == 0 else tf2_l.add_paragraph()
        p.text = f"✦ {title} {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_DARK
        p.space_after = Pt(10)

    add_card(s2, 6.9, 1.5, 5.6, 5.3, "Core Strategic Value", border_color=EMERALD)
    t2_r = s2.shapes.add_textbox(Inches(7.2), Inches(2.2), Inches(5.0), Inches(4.3))
    tf2_r = t2_r.text_frame
    tf2_r.word_wrap = True
    s2_right = [
        ("Frictionless Discovery:", "Book trustworthy domestic assistance in under 60 seconds with zero middleman agency haggling."),
        ("Vetted Trust & Safety:", "100% Aadhaar authentication, address proof, and police record clearances before workers accept jobs."),
        ("Granular Flexibility:", "Choose between 2-hour on-demand visits, weekly deep cleans, or monthly recurring maid subscriptions."),
        ("Integrated Digital Ecosystem:", "Equipped with Razorpay UPI/Card/COD payments, real-time OTP verification, and two-way review rating systems.")
    ]
    for idx, (title, desc) in enumerate(s2_right):
        p = tf2_r.paragraphs[0] if idx == 0 else tf2_r.add_paragraph()
        p.text = f"✓ {title} {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_DARK
        p.space_after = Pt(10)

    set_notes(s2, "Sparkle Home is designed for fast-paced urban families and working professionals who need dependable household help without informal bargaining. It acts as a dual-benefit marketplace: offering safety and transparency for households while delivering steady, dignified earnings for domestic workers.")

    # ==========================================
    # SLIDE 3: 2. Problem Statement
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_bg(s3)
    add_header(s3, "2. Problem Statement & Challenges in Traditional Hiring", "MARKET FRICTION", 3)

    add_card(s3, 0.8, 1.5, 5.6, 5.3, "Traditional Domestic Help Challenges", border_color=ROSE)
    t3_l = s3.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf3_l = t3_l.text_frame
    tf3_l.word_wrap = True
    probs = [
        ("Trust & Security Anxiety:", "Difficulty finding trustworthy and experienced maids through informal word-of-mouth with zero background checks."),
        ("No Comparison Platform:", "No centralized platform to compare worker skills, experience, or verified performance records."),
        ("Arbitrary Pricing:", "Lack of transparent pricing; informal haggling with zero rate standardization."),
        ("Scheduling Chaos:", "Unpredictable worker availability and constant double-booking friction in apartments."),
        ("Zero Accountability:", "No recourse when workers take sudden leaves or fail to arrive; no replacement backup."),
        ("Limited Worker Opportunities:", "Domestic workers struggle to discover reliable, high-paying households and face middleman cuts.")
    ]
    for idx, (title, desc) in enumerate(probs):
        p = tf3_l.paragraphs[0] if idx == 0 else tf3_l.add_paragraph()
        p.text = f"✕ {title} {desc}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_DARK
        p.space_after = Pt(8)

    add_card(s3, 6.9, 1.5, 5.6, 5.3, "The Sparkle Home Solution", border_color=EMERALD)
    t3_r = s3.shapes.add_textbox(Inches(7.2), Inches(2.2), Inches(5.0), Inches(4.3))
    tf3_r = t3_r.text_frame
    tf3_r.word_wrap = True
    sols = [
        ("Centralized Marketplace:", "A single verified digital platform connecting households with vetted service providers."),
        ("Standardized Pricing:", "Fixed upfront hourly (₹149-₹299/hr) and monthly rates before booking."),
        ("Rigorous KYC Workflow:", "Aadhaar and police background checks performed prior to worker onboarding."),
        ("Conflict-Free Calendars:", "Real-time slot locking guarantees workers never get double-booked."),
        ("Guaranteed Backup:", "Automated standby helper dispatch if assigned worker is unwell or on emergency leave."),
        ("Digital Worker Empowerment:", "Domestic workers gain access to thousands of clients and direct bank payouts.")
    ]
    for idx, (title, desc) in enumerate(sols):
        p = tf3_r.paragraphs[0] if idx == 0 else tf3_r.add_paragraph()
        p.text = f"✓ {title} {desc}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_DARK
        p.space_after = Pt(8)

    set_notes(s3, "In traditional hiring, families rely on word-of-mouth from neighbors, which provides no identity verification and often leads to arbitrary pricing and unannounced leaves. Sparkle Home solves every one of these pain points with a standardized, verified, and automated booking infrastructure.")

    # ==========================================
    # SLIDE 4: 3. Main Objectives
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_bg(s4)
    add_header(s4, "3. Main Objectives & Purpose", "STRATEGIC GOALS", 4)

    objectives = [
        ("1. Single Unified Platform", "Provide a single centralized ecosystem for booking domestic maids, cleaners, cooks, and caretakers.", Inches(0.8), Inches(1.5)),
        ("2. Verified Domestic Workers", "Connect urban customers only with thoroughly vetted and background-checked domestic workers.", Inches(4.8), Inches(1.5)),
        ("3. Tailored Selection", "Allow users to select exact household services based on room size, schedule, and dietary preferences.", Inches(8.8), Inches(1.5)),
        ("4. Transparent Pricing", "Eliminate unfair bargaining by publishing clear upfront hourly, daily, and monthly rate cards.", Inches(0.8), Inches(4.2)),
        ("5. Real-Time Availability", "Enable instant availability checks and interactive time-slot locking with zero scheduling conflicts.", Inches(4.8), Inches(4.2)),
        ("6. Worker Welfare & Dignity", "Formalize domestic labor, provide predictable incomes, and support digital financial inclusion.", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, left, top in objectives:
        add_card(s4, left.inches, top.inches, 3.7, 2.5, title)
        tb = s4.shapes.add_textbox(left + Inches(0.25), top + Inches(0.7), Inches(3.2), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MUTED

    set_notes(s4, "Our objectives center around unification, verification, standardization, and labor dignity. We want to bring the convenience of e-commerce to domestic services while protecting the rights and earnings of workers.")

    # ==========================================
    # SLIDE 5: 4. Types of Services (6 Pillars)
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_bg(s5)
    add_header(s5, "4. Core Domestic Services Catalog (The 6 Pillars)", "SERVICE OFFERINGS", 5)

    services_data = [
        ("House Cleaning", "Daily cleaning, sweeping, mopping with disinfectant, dusting, and trash clearance.", "₹199/hr • ₹3,500/mo", Inches(0.8), Inches(1.5)),
        ("Cooking Services", "Daily cooking, meal prep (Breakfast/Lunch/Dinner), regional cuisines (Telugu, North Indian), kitchen assist.", "₹249/hr • ₹4,500/mo", Inches(4.8), Inches(1.5)),
        ("Dishwashing", "Cleaning utensils, burnt oil degreasing, soap rinsing, sink hygiene, and rack stacking.", "₹149/hr • ₹2,200/mo", Inches(8.8), Inches(1.5)),
        ("Laundry Services", "Washing, ironing and folding clothes; delicate fabric handling and steam pressing.", "₹179/hr • ₹2,800/mo", Inches(0.8), Inches(4.2)),
        ("Babysitting", "Childcare and attentive supervision, milk warming, storytelling, and infant safety.", "₹299/hr • ₹6,500/mo", Inches(4.8), Inches(4.2)),
        ("Elderly Assistance", "Non-medical daily assistance for elderly people, gentle walking mobility, and medication reminders.", "₹279/hr • ₹7,000/mo", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, rate, left, top in services_data:
        add_card(s5, left.inches, top.inches, 3.7, 2.5, title)
        tb = s5.shapes.add_textbox(left + Inches(0.25), top + Inches(0.65), Inches(3.2), Inches(1.7))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = desc
        p1.font.size = Pt(10.5)
        p1.font.color.rgb = TEXT_MUTED

        p2 = tf.add_paragraph()
        p2.text = f"Rates: {rate}"
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = BLUE
        p2.space_before = Pt(8)

    set_notes(s5, "Sparkle Home covers all six daily domestic needs: House Cleaning, Cooking, Dishwashing, Laundry, Babysitting, and Elderly Care. Each service has standardized hourly rates and monthly package options, eliminating haggling.")

    # ==========================================
    # SLIDE 6: 5. User Roles Architecture
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_bg(s6)
    add_header(s6, "5. Tri-Role Architecture & Platform Ecosystem", "USER ROLES", 6)

    roles = [
        ("A. Customer / User", [
            "Register & manage profile",
            "Search helpers by location & rating",
            "Browse 6 service categories",
            "Compare profiles, prices & reviews",
            "Select date and time slots",
            "Pay online (UPI/Card) or Cash",
            "Track booking status with OTP",
            "Cancel, reschedule & submit reviews"
        ], Inches(0.8), BLUE),
        ("B. Maid / Service Provider", [
            "Register as domestic provider",
            "Upload photo & personal details",
            "Submit identity KYC documents",
            "Select offered domestic services",
            "Set custom service charges",
            "Set availability hours & toggle duty",
            "Accept or reject booking requests",
            "Track earnings & bank payouts"
        ], Inches(4.8), EMERALD),
        ("C. Super Admin", [
            "Admin operations dashboard",
            "Manage customers & helpers",
            "Verify worker identities & police records",
            "Approve or reject worker registrations",
            "Manage service categories & tariffs",
            "Monitor live bookings & dispatches",
            "Manage complaints & disputes",
            "Generate analytics & reports"
        ], Inches(8.8), AMBER)
    ]
    for title, points, left, accent in roles:
        add_card(s6, left.inches, 1.5, 3.7, 5.3, title, border_color=accent)
        tb = s6.shapes.add_textbox(left + Inches(0.25), Inches(2.2), Inches(3.2), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        for idx, pt in enumerate(points):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = f"• {pt}"
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_DARK
            p.space_after = Pt(6)

    set_notes(s6, "The platform is architected around three core roles: Customers who search and book; Domestic Helpers who control their schedule, accept requests, and receive direct payouts; and Admins who verify police/Aadhaar documents and resolve disputes.")

    # ==========================================
    # SLIDE 7: 6. Major Platform Features
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_bg(s7)
    add_header(s7, "6. Major Platform Technical Features", "CORE CAPABILITIES", 7)

    features = [
        ("Authentication", "Secure login and registration with JWT and password hashing."),
        ("Worker Verification", "Identity verification (Aadhaar & Police clearance) and admin approval."),
        ("Location-Based Search", "Find nearest maids based on customer city and neighborhood radius."),
        ("Smart Booking", "Select service date, morning/evening time slot, and booking frequency."),
        ("Availability Calendar", "Check helper real-time availability; avoids double bookings."),
        ("Pricing System", "Transparent upfront charges (Base fare + 5% GST + ₹29 safety fee)."),
        ("Online Payments", "Razorpay integration for UPI (GPay/PhonePe), Cards, and Cash on Delivery."),
        ("Admin Dashboard", "Complete administrative oversight over bookings, KYC queue, and disputes.")
    ]
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
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED

    set_notes(s7, "This matrix summarizes our core features: role-based security, background verification workflows, location-based matching, dynamic pricing, and conflict-free calendar booking.")

    # ==========================================
    # SLIDE 8: 7. Unique Selling Points (USPs)
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_bg(s8)
    add_header(s8, "7. Unique Selling Points (USPs) & Differentiators", "MARKET ADVANTAGE", 8)

    usps = [
        ("1. Verified Maid Profiles", "Only approved service providers with clean police background checks can receive bookings.", Inches(0.8), Inches(1.5)),
        ("2. Location-Based Matching", "Find domestic helpers within a 3-5 km radius for fast arrival and minimal worker travel.", Inches(4.8), Inches(1.5)),
        ("3. Flexible Booking", "Book hourly on-demand (2-3 hrs), daily recurring maid, weekly deep clean, or monthly plans.", Inches(8.8), Inches(1.5)),
        ("4. Transparent Pricing", "Display complete charges before confirming a booking; zero hidden cuts or surprise fees.", Inches(0.8), Inches(4.2)),
        ("5. Emergency 1-Hr Booking", "Request available standby domestic help for urgent requirements in under 60 minutes.", Inches(4.8), Inches(4.2)),
        ("6. Worker-Friendly Platform", "Allow workers to set their hourly rates, control working hours, and receive bank payouts.", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, left, top in usps:
        add_card(s8, left.inches, top.inches, 3.7, 2.5, title, border_color=BLUE)
        tb = s8.shapes.add_textbox(left + Inches(0.25), top + Inches(0.7), Inches(3.2), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MUTED

    set_notes(s8, "Sparkle Home goes beyond simple classifieds: we offer verified safety, transparent pricing, flexible schedules, emergency dispatch, and worker empowerment. This creates a sustainable competitive moat.")

    # ==========================================
    # SLIDE 9: 8. Booking Workflow
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    set_bg(s9)
    add_header(s9, "8. End-to-End Booking Workflow", "LIFECYCLE FLOW", 9)

    workflow_steps = [
        ("1. Registration", "Create account and enter residential address & locality.", Inches(0.8)),
        ("2. Select Service", "Choose Cleaning, Cooking, Dishwashing, Babysitting, etc.", Inches(2.8)),
        ("3. Find Maids", "Compare verified profiles, experience, ratings, and rates.", Inches(4.8)),
        ("4. Schedule Slot", "Choose preferred date, time slot, and booking frequency.", Inches(6.8)),
        ("5. Pay & Confirm", "Pay online via UPI/Card or select Cash on Delivery.", Inches(8.8)),
        ("6. OTP & Feedback", "Helper verifies OTP upon arrival, completes task, and user reviews.", Inches(10.8)),
    ]
    for title, desc, left in workflow_steps:
        add_card(s9, left.inches, 2.0, 1.8, 4.3, title, border_color=BLUE)
        tb = s9.shapes.add_textbox(left + Inches(0.15), Inches(3.2), Inches(1.5), Inches(2.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MUTED

    arr_tb = s9.shapes.add_textbox(Inches(0.8), Inches(6.5), Inches(11.8), Inches(0.4))
    ap = arr_tb.text_frame.paragraphs[0]
    ap.text = "Step 1  ➔  Step 2  ➔  Step 3  ➔  Step 4  ➔  Step 5  ➔  Step 6 (Friction-Free Continuous Cycle)"
    ap.alignment = PP_ALIGN.CENTER
    ap.font.size = Pt(11)
    ap.font.bold = True
    ap.font.color.rgb = BLUE

    set_notes(s9, "Our booking workflow takes less than 60 seconds from search to confirmed appointment. The 4-digit start OTP guarantees that only the authorized, background-checked domestic helper is admitted into the home.")

    # ==========================================
    # SLIDE 10: 9. Suggested Technology Stack
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    set_bg(s10)
    add_header(s10, "9. Suggested Technology Stack Architecture", "SYSTEM ENGINEERING", 10)

    tech_layers = [
        ("Frontend Layer", "React.js / Semantic HTML5", "Component-driven responsive mobile design"),
        ("Styling Framework", "Tailwind CSS + Lucide Icons", "Utility-first design with mobile drawer navigation"),
        ("Backend Server", "Node.js + Express.js / Python Flask", "RESTful API routes, booking engine & business logic"),
        ("Database Layer", "MongoDB / Persistent JSON Store", "Document storage for worker profiles, slots & bookings"),
        ("Authentication", "JWT + bcrypt Hashing", "Role-based token authentication & password encryption"),
        ("Maps & Geolocation", "Google Maps Geocoding API", "Proximity radius search & locality distance calculation"),
        ("Payment Gateway", "Razorpay Payment API", "Instant UPI (GPay/PhonePe), Cards, NetBanking, COD"),
        ("Media & Storage", "Cloudinary / AWS S3", "Encrypted photo storage for worker KYC & Aadhaar cards")
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
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED

    set_notes(s10, "The technology stack is modern, modular, and cloud-ready. We use React or responsive Flask for the UI, Node/Flask for the REST API, MongoDB for flexible worker/booking schemas, and Razorpay for seamless UPI transactions.")

    # ==========================================
    # SLIDE 11: 10. Main Application Pages
    # ==========================================
    s11 = prs.slides.add_slide(blank_layout)
    set_bg(s11)
    add_header(s11, "10. Main Application Interface Breakdown", "PAGE ARCHITECTURE", 11)

    interfaces = [
        ("Customer Interface", [
            "• Home page with quick finder",
            "• Services catalog page (6 services)",
            "• Search maids & helpers directory",
            "• Worker profile modal & reviews",
            "• Multi-step booking wizard",
            "• Payment checkout & confirmation",
            "• My Bookings dashboard (status & OTP)",
            "• Emergency 1-hour dispatch portal"
        ], Inches(0.8), BLUE),
        ("Worker Interface", [
            "• Worker onboarding & registration",
            "• Identity KYC document submission",
            "• Worker dashboard with duty toggle",
            "• Manage offered skills & custom rates",
            "• Availability calendar management",
            "• Booking requests inbox (Accept/Decline)",
            "• Earnings dashboard & payout stats",
            "• Profile & rating history"
        ], Inches(4.8), EMERALD),
        ("Admin Interface", [
            "• Super admin analytics & KPI metrics",
            "• User & worker management",
            "• Worker KYC verification queue",
            "• Approve / reject registrations",
            "• Booking management & tracking",
            "• Complaints & dispute resolution",
            "• Payment audit & report generation"
        ], Inches(8.8), AMBER)
    ]
    for title, pages, left, accent in interfaces:
        add_card(s11, left.inches, 1.5, 3.7, 5.3, title, border_color=accent)
        tb = s11.shapes.add_textbox(left + Inches(0.25), Inches(2.2), Inches(3.2), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        for idx, pg in enumerate(pages):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = pg
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_DARK
            p.space_after = Pt(6)

    set_notes(s11, "Here we detail all application interfaces: the Customer flow for seamless booking; the Worker portal for scheduling and earnings; and the Admin center for identity verification and dispute resolution.")

    # ==========================================
    # SLIDE 12: 11. Future Enhancements
    # ==========================================
    s12 = prs.slides.add_slide(blank_layout)
    set_bg(s12)
    add_header(s12, "11. Future Enhancements & Innovation Roadmap", "TECHNOLOGY ROADMAP", 12)

    enhancements = [
        ("AI-Based Maid Recommendations", "Machine learning engine recommending helpers based on regional culinary tastes, family timings, and ratings.", Inches(0.8), Inches(1.5)),
        ("Multilingual Voice Booking", "Voice-driven booking in Indian vernacular languages: Telugu, Hindi, Tamil, and English for accessibility.", Inches(4.8), Inches(1.5)),
        ("WhatsApp Booking Bot", "Direct automated booking, slot rescheduling, and arrival alerts via WhatsApp Business API.", Inches(8.8), Inches(1.5)),
        ("Household Subscription Plans", "Discounted recurring packages for regular families (e.g. Daily Maid + Cook monthly bundle).", Inches(0.8), Inches(4.2)),
        ("Real-Time GPS Arrival Tracking", "Live interactive map showing the domestic worker en-route with estimated arrival time (ETA).", Inches(4.8), Inches(4.2)),
        ("Multi-City Expansion", "Scaling the platform to Tier-2 and Tier-3 Indian cities with localized domestic worker training academies.", Inches(8.8), Inches(4.2)),
    ]
    for title, desc, left, top in enhancements:
        add_card(s12, left.inches, top.inches, 3.7, 2.5, title)
        tb = s12.shapes.add_textbox(left + Inches(0.25), top + Inches(0.7), Inches(3.2), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = desc
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MUTED

    set_notes(s12, "Our technical roadmap introduces AI matching, vernacular voice booking in Telugu, Hindi, and English, WhatsApp automation, and live GPS worker tracking to ensure wide accessibility across India.")

    # ==========================================
    # SLIDE 13: 12. Expected Project Outcome & Final Vision
    # ==========================================
    s13 = prs.slides.add_slide(blank_layout)
    set_bg(s13)
    add_header(s13, "12. Expected Outcomes & Long-Term Market Vision", "IMPACT & VISION", 13)

    add_card(s13, 0.8, 1.5, 5.6, 5.3, "The 'Urban Company' for Domestic Help", border_color=BLUE)
    t13_l = s13.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf13_l = t13_l.text_frame
    tf13_l.word_wrap = True
    impacts = [
        ("Organizing the Unorganized:", "Formalizes India's massive domestic worker sector into a transparent, safe, and structured digital marketplace."),
        ("Urban Company Paradigm:", "Adopts the reliable on-demand model of Urban Company but tailored specifically for daily maid booking and cooking in Indian households."),
        ("Worker Dignity & Inclusion:", "Domestic helpers receive steady incomes, fair wages, direct digital bank payments, and social security."),
        ("Household Peace of Mind:", "Families enjoy safe, vetted domestic assistance without the anxiety of unexpected leaves, security risks, or price haggling.")
    ]
    for idx, (title, desc) in enumerate(impacts):
        p = tf13_l.paragraphs[0] if idx == 0 else tf13_l.add_paragraph()
        p.text = f"✦ {title} {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_DARK
        p.space_after = Pt(10)

    add_card(s13, 6.9, 1.5, 5.6, 5.3, "Sustainable Revenue Model", border_color=EMERALD)
    t13_r = s13.shapes.add_textbox(Inches(7.2), Inches(2.2), Inches(5.0), Inches(4.3))
    tf13_r = t13_r.text_frame
    tf13_r.word_wrap = True
    rev = [
        ("Platform Safety Fee:", "Nominal safety and verification fee (₹29) per booking."),
        ("Service Commission:", "10-15% commission on on-demand and emergency dispatch bookings."),
        ("Recurring Subscription Plans:", "Monthly fee on recurring daily maid and cook management."),
        ("Value-Added Upgrades:", "High-margin specialized services (Deep degreasing, infant care kits).")
    ]
    for idx, (title, desc) in enumerate(rev):
        p = tf13_r.paragraphs[0] if idx == 0 else tf13_r.add_paragraph()
        p.text = f"✓ {title} {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_DARK
        p.space_after = Pt(10)

    set_notes(s13, "Our final vision is to build the 'Urban Company for Everyday Domestic Help'. By providing structure, transparency, and dignity of labor, Sparkle Home transforms a fragmented market into a dependable, high-growth digital service ecosystem.")

    # ==========================================
    # SLIDE 14: Conclusion & Q&A Slide
    # ==========================================
    s14 = prs.slides.add_slide(blank_layout)
    set_bg(s14, NAVY)

    c_box = s14.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.3), Inches(3.0))
    ctf14 = c_box.text_frame
    ctf14.word_wrap = True
    
    p_c1 = ctf14.paragraphs[0]
    p_c1.text = "Thank You!"
    p_c1.font.size = Pt(52)
    p_c1.font.bold = True
    p_c1.font.color.rgb = WHITE
    p_c1.font.name = "Arial"

    p_c2 = ctf14.add_paragraph()
    p_c2.text = "Sparkle Home — A Smart Maid & Domestic Home Services Booking Platform"
    p_c2.font.size = Pt(20)
    p_c2.font.bold = True
    p_c2.font.color.rgb = BLUE
    p_c2.space_before = Pt(10)

    p_c3 = ctf14.add_paragraph()
    p_c3.text = '"Your Home, Our Care – Book Trusted Helpers at Your Convenience."'
    p_c3.font.size = Pt(15)
    p_c3.font.italic = True
    p_c3.font.color.rgb = TEXT_LIGHT
    p_c3.space_before = Pt(6)

    # Summary box
    add_card(s14, 1.5, 4.6, 10.3, 2.0, bg_color=RGBColor(0x16, 0x22, 0x38), border_color=BLUE)
    t_end = s14.shapes.add_textbox(Inches(1.8), Inches(4.8), Inches(9.7), Inches(1.6))
    tf_end = t_end.text_frame
    pe1 = tf_end.paragraphs[0]
    pe1.text = "PROJECT SUMMARY & LIVE ACCESS"
    pe1.font.size = Pt(11)
    pe1.font.bold = True
    pe1.font.color.rgb = AMBER

    pe2 = tf_end.add_paragraph()
    pe2.text = "• GitHub Repository: https://github.com/darshitha02/sparklehomeservice"
    pe2.font.size = Pt(11.5)
    pe2.font.color.rgb = WHITE

    pe3 = tf_end.add_paragraph()
    pe3.text = "• Live Application: http://localhost:5000 | Open for Viva Voce & Technical Defense"
    pe3.font.size = Pt(11.5)
    pe3.font.color.rgb = WHITE

    set_notes(s14, "Thank you very much. The platform is running live at http://localhost:5000, and all source code and presentations are available on GitHub. I am now open for viva voce questions and demonstration.")

    # Save
    prs.save(output_filepath)
    print(f"Presentation successfully created at: {output_filepath}")

if __name__ == "__main__":
    base_dir = r"C:\Users\manik\.gemini\antigravity\scratch\sparklehome"
    target1 = os.path.join(base_dir, "Sparkle_Home_Project_Presentation.pptx")
    target2 = os.path.join(base_dir, "SparkleHome_Domestic_Services_Presentation.pptx")
    target3 = os.path.join(base_dir, "SparkleHome_Project_Presentation.pptx")
    
    build_presentation(target1)
    build_presentation(target2)
    build_presentation(target3)
