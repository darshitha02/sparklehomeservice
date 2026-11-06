const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');

const services = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'services.json'), 'utf-8'));
const workers = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'workers.json'), 'utf-8'));
const bookings = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'bookings.json'), 'utf-8'));
const disputes = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'disputes.json'), 'utf-8'));

function getBaseHtml(title, content, extraScripts = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            },
            amber: {
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706'
            },
            emerald: {
              500: '#10b981',
              600: '#059669',
              700: '#047857'
            }
          },
          fontFamily: {
            heading: ['Outfit', 'sans-serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif']
          }
        }
      }
    }
  </script>

  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: 'Outfit', sans-serif;
    }
    .badge-verified {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
    .badge-emergency {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white pb-16 md:pb-0">

  <!-- TOP ANNOUNCEMENT BAR -->
  <div class="bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-900 text-white text-xs py-2 px-4 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-900 uppercase tracking-wide">
          ✦ Trust First
        </span>
        <span class="hidden sm:inline text-slate-200">
          All helpers 100% Aadhaar & Police Verified. Instant booking in Hyderabad, Bengaluru, Mumbai & Delhi NCR.
        </span>
        <span class="sm:hidden text-slate-200">
          Verified domestic maids, cooks & nannies in 60 mins.
        </span>
      </div>
      <div class="flex items-center gap-4 text-[11px] text-slate-300">
        <a href="/emergency" class="flex items-center gap-1 text-red-300 hover:text-white font-semibold">
          <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Emergency 1-Hr Help</span>
        </a>
        <span class="text-slate-500">|</span>
        <a href="/presentation" class="hover:text-white font-medium flex items-center gap-1">
          <i data-lucide="presentation" class="w-3.5 h-3.5 text-blue-300"></i>
          <span>Project PPT Deck</span>
        </a>
      </div>
    </div>
  </div>

  <!-- MAIN NAVIGATION BAR -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- BRAND LOGO -->
        <a href="/" class="flex items-center gap-3 group">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <i data-lucide="sparkles" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
                Sparkle<span class="text-brand-600">Home</span>
              </span>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                Smart Maid
              </span>
            </div>
            <p class="text-[11px] text-slate-500 -mt-1 hidden sm:block font-medium">
              Your Home, Our Care • Trusted Helpers
            </p>
          </div>
        </a>

        <!-- DESKTOP NAVIGATION LINKS -->
        <nav class="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <a href="/services" class="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <i data-lucide="layers" class="w-4 h-4 text-slate-400"></i>
            <span>Services (6)</span>
          </a>
          <a href="/helpers" class="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <i data-lucide="users" class="w-4 h-4 text-slate-400"></i>
            <span>Browse Helpers</span>
          </a>
          <a href="/book" class="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <i data-lucide="calendar-check" class="w-4 h-4 text-slate-400"></i>
            <span>Book Now</span>
          </a>
          <a href="/bookings" class="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <i data-lucide="receipt" class="w-4 h-4 text-slate-400"></i>
            <span>My Bookings</span>
          </a>
          <a href="/worker/portal" class="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <i data-lucide="briefcase" class="w-4 h-4 text-slate-400"></i>
            <span>Worker Portal</span>
          </a>
          <a href="/admin" class="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <i data-lucide="shield" class="w-4 h-4 text-slate-400"></i>
            <span>Admin</span>
          </a>
        </nav>

        <!-- HEADER ACTIONS -->
        <div class="hidden sm:flex items-center gap-3">
          <a href="/emergency" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors">
            <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>Emergency SOS</span>
          </a>
          <a href="/book" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <i data-lucide="calendar" class="w-4 h-4"></i>
            <span>Book a Helper</span>
          </a>
        </div>

        <!-- MOBILE HAMBURGER BUTTON -->
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" aria-label="Toggle Menu">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>

      </div>
    </div>

    <!-- MOBILE MENU DRAWER OVERLAY -->
    <div id="mobile-menu" class="hidden lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
      <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
        <a href="/services" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700">
          <i data-lucide="layers" class="w-4 h-4 text-brand-600"></i>
          <span>Our Services</span>
        </a>
        <a href="/helpers" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700">
          <i data-lucide="users" class="w-4 h-4 text-brand-600"></i>
          <span>Browse Maids</span>
        </a>
        <a href="/book" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700">
          <i data-lucide="calendar-check" class="w-4 h-4 text-brand-600"></i>
          <span>Book Schedule</span>
        </a>
        <a href="/bookings" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700">
          <i data-lucide="receipt" class="w-4 h-4 text-brand-600"></i>
          <span>My Bookings</span>
        </a>
        <a href="/worker/portal" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700">
          <i data-lucide="briefcase" class="w-4 h-4 text-brand-600"></i>
          <span>Worker Portal</span>
        </a>
        <a href="/admin" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700">
          <i data-lucide="shield" class="w-4 h-4 text-brand-600"></i>
          <span>Admin Center</span>
        </a>
      </div>
      <div class="pt-2 flex flex-col gap-2">
        <a href="/emergency" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 border border-red-200">
          <i data-lucide="zap" class="w-4 h-4 text-red-600"></i>
          <span>Need Emergency Help (Arrives in 60 mins)</span>
        </a>
        <a href="/presentation" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200">
          <i data-lucide="presentation" class="w-4 h-4 text-brand-600"></i>
          <span>View Project Presentation Slides</span>
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN PAGE CONTENT -->
  <main class="flex-grow">
    ${content}
  </main>

  <!-- MOBILE STICKY BOTTOM NAVIGATION BAR -->
  <div class="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 lg:hidden shadow-lg py-2 px-3">
    <div class="grid grid-cols-5 text-center text-[10px] font-semibold text-slate-600">
      <a href="/" class="flex flex-col items-center gap-1 text-brand-600">
        <i data-lucide="home" class="w-5 h-5"></i>
        <span>Home</span>
      </a>
      <a href="/helpers" class="flex flex-col items-center gap-1 hover:text-brand-600">
        <i data-lucide="search" class="w-5 h-5"></i>
        <span>Helpers</span>
      </a>
      <a href="/book" class="flex flex-col items-center gap-1 text-white bg-brand-600 rounded-xl py-1 px-1 -mt-3 shadow-md shadow-brand-600/30">
        <i data-lucide="calendar-plus" class="w-5 h-5"></i>
        <span>Book</span>
      </a>
      <a href="/bookings" class="flex flex-col items-center gap-1 hover:text-brand-600">
        <i data-lucide="clock" class="w-5 h-5"></i>
        <span>Bookings</span>
      </a>
      <a href="/worker/portal" class="flex flex-col items-center gap-1 hover:text-brand-600">
        <i data-lucide="user-check" class="w-5 h-5"></i>
        <span>Worker</span>
      </a>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
        
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
            </div>
            <span class="font-heading font-extrabold text-2xl text-white">
              Sparkle<span class="text-brand-400">Home</span>
            </span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
            India's premier smart maid and domestic help booking platform. Connecting urban households with verified domestic workers: house cleaners, cooks, babysitters, laundry pros, and elderly companions.
          </p>
          <div class="flex items-center gap-3 pt-2 text-xs text-slate-400">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> Police Verified
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i> Hyperlocal Search
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
              <i data-lucide="credit-card" class="w-3.5 h-3.5 text-blue-400"></i> Razorpay & Cash
            </span>
          </div>
        </div>

        <!-- 6 Core Services -->
        <div class="space-y-3">
          <h4 class="text-white font-heading font-bold text-sm tracking-wider uppercase">
            Domestic Services
          </h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="/helpers?service=house_cleaning" class="hover:text-white transition-colors">House Cleaning</a></li>
            <li><a href="/helpers?service=cooking_services" class="hover:text-white transition-colors">Cooking Services</a></li>
            <li><a href="/helpers?service=dishwashing" class="hover:text-white transition-colors">Dishwashing & Hygiene</a></li>
            <li><a href="/helpers?service=laundry_services" class="hover:text-white transition-colors">Laundry & Steam Ironing</a></li>
            <li><a href="/helpers?service=babysitting" class="hover:text-white transition-colors">Babysitting & Childcare</a></li>
            <li><a href="/helpers?service=elderly_assistance" class="hover:text-white transition-colors">Elderly Assistance</a></li>
          </ul>
        </div>

        <!-- Platform Links -->
        <div class="space-y-3">
          <h4 class="text-white font-heading font-bold text-sm tracking-wider uppercase">
            Platform Roles
          </h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="/book" class="hover:text-white transition-colors">Customer Booking Flow</a></li>
            <li><a href="/bookings" class="hover:text-white transition-colors">Manage Bookings</a></li>
            <li><a href="/worker/portal" class="hover:text-white transition-colors">Maid / Worker Portal</a></li>
            <li><a href="/worker/portal" class="hover:text-white transition-colors">Register as Helper</a></li>
            <li><a href="/admin" class="hover:text-white transition-colors">Admin Verification Desk</a></li>
            <li><a href="/emergency" class="hover:text-white transition-colors">Emergency Dispatch</a></li>
          </ul>
        </div>

        <!-- Locations & Academic -->
        <div class="space-y-3">
          <h4 class="text-white font-heading font-bold text-sm tracking-wider uppercase">
            Project & Locations
          </h4>
          <p class="text-xs text-slate-400">
            Active Hubs: Hyderabad, Bengaluru, Mumbai, Delhi NCR, Pune.
          </p>
          <div class="pt-2">
            <a href="/presentation" class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 transition-colors w-full justify-center">
              <i data-lucide="presentation" class="w-4 h-4"></i>
              <span>View PPT Presentation</span>
            </a>
          </div>
          <div class="pt-1">
            <a href="/download-ppt" class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors w-full justify-center">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download .PPTX File</span>
            </a>
          </div>
        </div>

      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © 2026 Sparkle Home Platform. Built for Indian Households & Domestic Worker Empowerment.
        </div>
        <div class="flex items-center gap-6">
          <a href="/presentation" class="hover:text-slate-300">Viva Guide</a>
          <a href="/admin" class="hover:text-slate-300">Admin Login</a>
          <a href="/worker/portal" class="hover:text-slate-300">Helper KYC</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- GLOBAL NOTIFICATION TOAST -->
  <div id="toast" class="fixed top-5 right-5 z-50 transform translate-y-[-150%] transition-transform duration-300 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 pointer-events-none">
    <div id="toast-icon" class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
      <i data-lucide="check" class="w-4 h-4"></i>
    </div>
    <div class="flex-grow">
      <div id="toast-title" class="font-bold text-sm">Success</div>
      <div id="toast-message" class="text-xs text-slate-300 mt-0.5">Your action has been completed.</div>
    </div>
  </div>

  <script>
    lucide.createIcons();

    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    function showToast(title, message, type = 'success') {
      const toast = document.getElementById('toast');
      const toastTitle = document.getElementById('toast-title');
      const toastMessage = document.getElementById('toast-message');
      const toastIcon = document.getElementById('toast-icon');

      toastTitle.textContent = title;
      toastMessage.textContent = message;

      if (type === 'success') {
        toastIcon.className = 'w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5';
        toastIcon.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
      } else if (type === 'error') {
        toastIcon.className = 'w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5';
        toastIcon.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
      } else {
        toastIcon.className = 'w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5';
        toastIcon.innerHTML = '<i data-lucide="info" class="w-4 h-4"></i>';
      }
      lucide.createIcons();

      toast.classList.remove('translate-y-[-150%]', 'pointer-events-none');
      setTimeout(() => {
        toast.classList.add('translate-y-[-150%]', 'pointer-events-none');
      }, 3500);
    }
  </script>
  ${extraScripts}
</body>
</html>`;
}

// ==========================================
// 1. GENERATE INDEX.HTML
// ==========================================
const featuredWorkers = workers.slice(0, 4);
const indexContent = `
<!-- HERO SECTION WITH INTERACTIVE SEARCH -->
<section class="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-10 pb-20 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <div class="lg:col-span-7 space-y-6">
        <div class="inline-flex items-center gap-2 bg-brand-100/90 text-brand-800 border border-brand-200 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <span class="w-2.5 h-2.5 rounded-full bg-brand-600 animate-pulse"></span>
          <span>Verified Domestic Workers • Police & Aadhaar Authenticated</span>
        </div>

        <h1 class="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.12]">
          Your Home, Our Care. <br class="hidden sm:inline"/>
          <span class="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Book Trusted Helpers
          </span> <br/>
          at Your Convenience.
        </h1>

        <p class="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
          Connect with verified domestic maids, hygienic home cooks, compassionate babysitters, laundry pros, and elderly care attendants. Transparent pricing, zero double-bookings, and flexible hourly or monthly plans.
        </p>

        <!-- Quick Search Engine Card -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 space-y-3">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="search" class="w-3.5 h-3.5 text-brand-600"></i>
            <span>Quick Helper Finder</span>
          </div>
          
          <form action="/helpers" method="GET" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Select City</label>
              <select name="city" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="">All Indian Metros</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Service Required</label>
              <select name="service" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="">All 6 Domestic Services</option>
                ${services.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
              </select>
            </div>

            <div class="flex items-end">
              <button type="submit" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-1.5">
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
                <span>Find Helpers</span>
              </button>
            </div>
          </form>

          <div class="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span class="text-slate-400 font-medium">Popular:</span>
            <a href="/helpers?service=house_cleaning" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 font-medium transition-colors">
              🧹 Maid Cleaning
            </a>
            <a href="/helpers?service=cooking_services" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 font-medium transition-colors">
              🍳 Daily Cook
            </a>
            <a href="/helpers?service=babysitting" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 font-medium transition-colors">
              👶 Verified Nanny
            </a>
            <a href="/emergency" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 font-bold hover:bg-red-100 transition-colors flex items-center gap-1">
              <i data-lucide="zap" class="w-3 h-3 text-red-600"></i> SOS Help
            </a>
          </div>
        </div>

        <div class="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80">
          <div>
            <div class="font-heading font-extrabold text-2xl text-slate-900">12,500+</div>
            <div class="text-xs text-slate-500 font-medium">Verified Helpers</div>
          </div>
          <div>
            <div class="font-heading font-extrabold text-2xl text-brand-600 flex items-center gap-1">
              <span>4.9★</span>
              <span class="text-xs font-normal text-slate-500">(38k Reviews)</span>
            </div>
            <div class="text-xs text-slate-500 font-medium">Customer Rating</div>
          </div>
          <div>
            <div class="font-heading font-extrabold text-2xl text-slate-900">&lt; 60 mins</div>
            <div class="text-xs text-slate-500 font-medium">Instant Dispatch</div>
          </div>
        </div>

      </div>

      <div class="lg:col-span-5 relative">
        <div class="relative mx-auto max-w-md">
          <div class="absolute -top-10 -right-10 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                  <i data-lucide="award" class="w-6 h-6"></i>
                </div>
                <div>
                  <h3 class="font-heading font-bold text-slate-900 text-base">Sparkle Home Guarantee</h3>
                  <p class="text-xs text-slate-500">Zero Agency Haggling • Fixed Rates</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active 24x7
              </span>
            </div>

            <!-- Spotlight Worker -->
            <div class="bg-gradient-to-br from-slate-50 to-brand-50/40 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div class="flex items-center gap-3">
                <img src="${featuredWorkers[0].avatar}" alt="${featuredWorkers[0].name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md">
                <div class="flex-grow">
                  <div class="flex items-center gap-1.5">
                    <h4 class="font-heading font-bold text-slate-900 text-sm">${featuredWorkers[0].name}</h4>
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                      <i data-lucide="check" class="w-3 h-3 mr-0.5"></i> Verified
                    </span>
                  </div>
                  <p class="text-xs text-slate-500">${featuredWorkers[0].locality}, ${featuredWorkers[0].city}</p>
                  <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 mt-1">
                    <span class="text-amber-500 flex items-center">
                      <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 inline mr-0.5"></i>
                      ${featuredWorkers[0].rating}
                    </span>
                    <span class="text-slate-300">•</span>
                    <span>${featuredWorkers[0].experience_years} yrs experience</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                <div>
                  <span class="text-slate-400">Starting from</span>
                  <div class="font-bold text-brand-700 text-sm">₹${featuredWorkers[0].hourly_rate}/hour</div>
                </div>
                <div>
                  <span class="text-slate-400">Monthly package</span>
                  <div class="font-bold text-slate-800 text-sm">₹${featuredWorkers[0].monthly_rate}/mo</div>
                </div>
                <a href="/book?worker_id=${featuredWorkers[0].id}" class="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors">
                  Instant Book
                </a>
              </div>
            </div>

            <div class="space-y-2.5 text-xs text-slate-600">
              <div class="flex items-center gap-2.5">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                </div>
                <span><strong>No Double-Bookings:</strong> Worker availability calendar locks slots in real time.</span>
              </div>
              <div class="flex items-center gap-2.5">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                </div>
                <span><strong>Aadhaar & Police Vetted:</strong> Every domestic worker's KYC is verified before listing.</span>
              </div>
              <div class="flex items-center gap-2.5">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                </div>
                <span><strong>Secure Payments & OTP:</strong> Pay via UPI, Cards or Cash with OTP service start.</span>
              </div>
            </div>

            <div class="pt-2">
              <a href="/helpers" class="w-full block text-center py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide uppercase transition-colors shadow-lg">
                View All ${workers.length}+ Available Domestic Helpers →
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- 6 SERVICES SECTION -->
<section class="py-20 bg-white border-t border-slate-200/80">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto space-y-3 mb-16">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
        <i data-lucide="layers" class="w-3.5 h-3.5"></i>
        <span>Complete Domestic Catalog</span>
      </div>
      <h2 class="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
        6 Pillars of Sparkle Home Care
      </h2>
      <p class="text-slate-600 text-sm sm:text-base">
        Select from specialized domestic assistance designed to handle every daily household chore with verified care.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${services.map(s => `
      <div class="group bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 group-hover:scale-110 transition-transform">
              <i data-lucide="${s.icon}" class="w-6 h-6"></i>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
              ${s.badge}
            </span>
          </div>

          <h3 class="font-heading font-bold text-xl text-slate-900 group-hover:text-brand-600 transition-colors">
            ${s.name}
          </h3>
          <p class="text-xs font-medium text-brand-700 mt-1 mb-3">
            ${s.tagline}
          </p>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            ${s.description}
          </p>

          <div class="space-y-1.5 mb-6 bg-white/80 p-3 rounded-2xl border border-slate-200/60">
            <span class="text-[11px] font-bold text-slate-700 block mb-1">What's Included:</span>
            ${s.tasks.slice(0, 3).map(t => `
            <div class="flex items-start gap-2 text-[11px] text-slate-600">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
              <span>${t}</span>
            </div>`).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200/80 flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-400">Hourly / Monthly</div>
            <div class="text-sm font-extrabold text-slate-900">
              ₹${s.hourly_rate}<span class="text-xs font-normal text-slate-500">/hr</span>
              <span class="text-slate-300 font-light mx-1">|</span>
              <span class="text-brand-700">₹${s.monthly_rate}</span><span class="text-xs font-normal text-slate-500">/mo</span>
            </div>
          </div>
          <a href="/book?service_id=${s.id}" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-brand-600 transition-colors shadow-sm">
            Book Service
          </a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="py-20 bg-slate-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto space-y-3 mb-16">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-900 text-brand-300 border border-brand-700">
        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
        <span>Simple 60-Second Process</span>
      </div>
      <h2 class="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
        How Sparkle Home Works
      </h2>
      <p class="text-slate-400 text-sm">
        From search to spotless home in 4 seamless digital steps.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 relative">
        <div class="text-4xl font-extrabold text-brand-500/40 mb-3 font-mono">01</div>
        <h3 class="font-heading font-bold text-lg text-white mb-2">Select Service</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Choose from House Cleaning, Cooking, Dishwashing, Laundry, Babysitting, or Elderly Assistance.
        </p>
      </div>

      <div class="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 relative">
        <div class="text-4xl font-extrabold text-brand-500/40 mb-3 font-mono">02</div>
        <h3 class="font-heading font-bold text-lg text-white mb-2">Pick Verified Helper</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Filter by your locality, compare verified credentials, read genuine customer reviews and rates.
        </p>
      </div>

      <div class="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 relative">
        <div class="text-4xl font-extrabold text-brand-500/40 mb-3 font-mono">03</div>
        <h3 class="font-heading font-bold text-lg text-white mb-2">Schedule & Pay</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Select preferred date and morning/evening time slot. Pay securely via Razorpay UPI, Card, or Cash.
        </p>
      </div>

      <div class="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 relative">
        <div class="text-4xl font-extrabold text-brand-500/40 mb-3 font-mono">04</div>
        <h3 class="font-heading font-bold text-lg text-white mb-2">Service & Review</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Helper arrives on time, verifies OTP, performs tasks with excellence. Rate and review after service.
        </p>
      </div>
    </div>

    <div class="mt-12 text-center">
      <a href="/book" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 transition-all hover:scale-105">
        <i data-lucide="sparkles" class="w-4 h-4"></i>
        <span>Book Your First Domestic Helper Now</span>
      </a>
    </div>
  </div>
</section>

<!-- EMERGENCY SOS BANNER -->
<section class="py-12 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-inner">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
    <div class="flex items-center gap-4">
      <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
        <i data-lucide="alarm-clock" class="w-7 h-7"></i>
      </div>
      <div>
        <h3 class="font-heading font-extrabold text-2xl text-white">Need Urgent Domestic Help in 60 Minutes?</h3>
        <p class="text-red-100 text-xs sm:text-sm mt-0.5">
          Surprise guests or regular maid absent? Tap our emergency dispatch for rapid helper arrival.
        </p>
      </div>
    </div>
    <a href="/emergency" class="px-6 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-bold text-xs sm:text-sm shadow-lg whitespace-nowrap transition-colors flex items-center gap-2">
      <i data-lucide="zap" class="w-4 h-4 text-red-600"></i>
      <span>Request 1-Hour Emergency Maid</span>
    </a>
  </div>
</section>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), getBaseHtml('Sparkle Home — Smart Maid & Domestic Help Booking Platform', indexContent));
console.log('✓ index.html generated');

// ==========================================
// 2. GENERATE SERVICES.HTML
// ==========================================
const servicesContent = `
<div class="bg-gradient-to-b from-brand-50/60 to-white py-12 border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
      <i data-lucide="sparkles" class="w-3.5 h-3.5 text-brand-600"></i>
      <span>Transparent Hourly & Monthly Rates</span>
    </span>
    <h1 class="font-heading font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight">
      Domestic Services Built for Indian Homes
    </h1>
    <p class="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
      From daily floor sweeping and authentic home-cooked meals to tender infant supervision and senior care.
    </p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    ${services.map(s => `
    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-5">
          <div class="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/25">
            <i data-lucide="${s.icon}" class="w-7 h-7"></i>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            ${s.badge}
          </span>
        </div>

        <h3 class="font-heading font-bold text-2xl text-slate-900 mb-1">${s.name}</h3>
        <p class="text-xs font-semibold text-brand-600 mb-3">${s.tagline}</p>
        <p class="text-xs text-slate-600 leading-relaxed mb-6">${s.description}</p>

        <div class="space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
          <span class="text-xs font-bold text-slate-800 block mb-2">Scope of Work:</span>
          ${s.tasks.map(task => `
          <div class="flex items-start gap-2 text-xs text-slate-600">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
            <span>${task}</span>
          </div>`).join('')}
        </div>
      </div>

      <div class="pt-5 border-t border-slate-100 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-400 font-medium">Hourly On-Demand</div>
            <div class="text-lg font-extrabold text-slate-900">₹${s.hourly_rate}<span class="text-xs font-normal text-slate-500">/hr</span></div>
          </div>
          <div class="text-right">
            <div class="text-[11px] text-slate-400 font-medium">Monthly Plan</div>
            <div class="text-lg font-extrabold text-brand-700">₹${s.monthly_rate}<span class="text-xs font-normal text-slate-500">/mo</span></div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <a href="/helpers?service=${s.id}" class="py-2.5 px-3 rounded-xl text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            View Maids
          </a>
          <a href="/book?service_id=${s.id}" class="py-2.5 px-3 rounded-xl text-center text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 transition-colors">
            Book Now
          </a>
        </div>
      </div>
    </div>`).join('')}
  </div>
</div>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'services.html'), getBaseHtml('Domestic Services Catalog — Sparkle Home', servicesContent));
console.log('✓ services.html generated');

// ==========================================
// 3. GENERATE HELPERS.HTML
// ==========================================
const helpersContent = `
<div class="bg-slate-900 text-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl space-y-2">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
        <span>100% Police & Identity Verified Helpers</span>
      </span>
      <h1 class="font-heading font-extrabold text-3xl sm:text-4xl text-white">
        Find Domestic Helpers & Maids Near You
      </h1>
      <p class="text-slate-400 text-xs sm:text-sm">
        Compare profiles, hourly rates, languages spoken, and genuine client ratings.
      </p>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    
    <!-- LEFT FILTER SIDEBAR -->
    <div class="lg:col-span-3">
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-28">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 class="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
            <i data-lucide="sliders" class="w-4 h-4 text-brand-600"></i>
            <span>Filter Helpers</span>
          </h3>
          <button id="reset-filters" class="text-xs text-brand-600 hover:underline font-semibold">
            Reset
          </button>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-bold text-slate-700">Metro City</label>
          <select id="filter-city" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Cities</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-bold text-slate-700">Service Required</label>
          <select id="filter-service" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">All Services</option>
            ${services.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
          </select>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Max Hourly Rate</span>
            <span id="rate-display" class="text-brand-600 font-extrabold">₹350/hr</span>
          </div>
          <input type="range" id="filter-rate" min="150" max="350" step="10" value="350" class="w-full accent-brand-600 cursor-pointer">
          <div class="flex justify-between text-[10px] text-slate-400">
            <span>₹150</span>
            <span>₹250</span>
            <span>₹350</span>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 space-y-2.5">
          <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
            <input type="checkbox" id="filter-verified" checked class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500">
            <span>Police & Aadhaar Verified Only</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
            <input type="checkbox" id="filter-available" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500">
            <span>Available Today Only</span>
          </label>
        </div>

      </div>
    </div>

    <!-- RIGHT WORKERS GRID -->
    <div class="lg:col-span-9 space-y-6">
      
      <div class="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200">
        <div class="text-xs font-semibold text-slate-600">
          Showing <span id="worker-count" class="font-bold text-slate-900">${workers.length}</span> verified helpers
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">Sort by:</span>
          <select id="sort-select" class="text-xs font-bold text-slate-700 border-none bg-transparent focus:outline-none cursor-pointer">
            <option value="rating">Highest Rated</option>
            <option value="price_low">Lowest Price</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      <div id="workers-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${workers.map(w => `
        <div class="worker-card bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
             data-id="${w.id}"
             data-city="${w.city}"
             data-services="${w.services.join(',')}"
             data-rate="${w.hourly_rate}"
             data-rating="${w.rating}"
             data-experience="${w.experience_years}"
             data-verified="${w.verified ? 'true' : 'false'}"
             data-available="${w.available_now ? 'true' : 'false'}">
          
          <div>
            <div class="relative mb-4">
              <img src="${w.avatar}" alt="${w.name}" class="w-full h-48 rounded-2xl object-cover shadow-sm">
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-3 h-3 text-amber-400"></i>
                  ${w.city}
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
                  <i data-lucide="check" class="w-3 h-3"></i> Verified
                </span>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <h3 class="font-heading font-bold text-lg text-slate-900">${w.name}</h3>
                <div class="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
                  <span>${w.rating}</span>
                  <span class="text-slate-400 font-normal">(${w.reviews_count})</span>
                </div>
              </div>
              <p class="text-xs text-slate-500 flex items-center gap-1">
                <i data-lucide="compass" class="w-3 h-3 text-slate-400"></i>
                ${w.locality}
              </p>
            </div>

            <div class="flex flex-wrap gap-1.5 my-3">
              ${w.services.map(s => `
              <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-100 capitalize">
                ${s.replace(/_/g, ' ')}
              </span>`).join('')}
            </div>

            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              ${w.bio}
            </p>

            <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span class="font-semibold text-slate-700">${w.experience_years} yrs experience</span>
              <span>${w.languages.join(', ')}</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <div class="text-[10px] text-slate-400">Rate</div>
              <div class="text-base font-extrabold text-slate-900">₹${w.hourly_rate}<span class="text-xs font-normal text-slate-500">/hr</span></div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openWorkerModal('${w.id}')" class="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                Profile
              </button>
              <a href="/book?worker_id=${w.id}" class="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 transition-colors">
                Book
              </a>
            </div>
          </div>

        </div>`).join('')}
      </div>

    </div>

  </div>
</div>

<!-- WORKER PROFILE MODAL -->
<div id="worker-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
    <button onclick="closeWorkerModal()" class="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
      <i data-lucide="x" class="w-5 h-5"></i>
    </button>

    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <img id="m-avatar" src="" alt="Worker" class="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500 shadow-md">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <h2 id="m-name" class="font-heading font-extrabold text-2xl text-slate-900">Name</h2>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
            ✓ Aadhaar & Police Verified
          </span>
        </div>
        <p id="m-loc" class="text-xs text-slate-500">Locality, City</p>
        <div class="flex items-center gap-3 text-xs font-bold text-slate-700 pt-1">
          <span class="text-amber-500 flex items-center gap-1">
            <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
            <span id="m-rating">4.9</span>
          </span>
          <span class="text-slate-300">•</span>
          <span id="m-exp">7 yrs Experience</span>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">About Helper</h4>
      <p id="m-bio" class="text-xs text-slate-600 leading-relaxed"></p>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
        <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          <span>Police Record: Clean</span>
        </div>
        <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center gap-2">
          <i data-lucide="file-check" class="w-4 h-4 text-blue-600"></i>
          <span>Aadhaar: Verified</span>
        </div>
        <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
          <i data-lucide="clock" class="w-4 h-4 text-amber-600"></i>
          <span>Zero Double-Booking</span>
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <div class="text-xs text-slate-400">Transparent Pricing</div>
        <div class="text-lg font-extrabold text-slate-900">
          <span id="m-hourly">₹220</span><span class="text-xs font-normal text-slate-500">/hr</span>
          <span class="text-slate-300 mx-2">|</span>
          <span id="m-monthly" class="text-brand-600">₹4,200</span><span class="text-xs font-normal text-slate-500">/mo</span>
        </div>
      </div>
      <a id="m-book-btn" href="#" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider text-center shadow-md transition-colors">
        Proceed to Book This Helper →
      </a>
    </div>
  </div>
</div>
`;

const helpersScripts = `
<script>
  const workersData = ${JSON.stringify(workers)};

  function openWorkerModal(workerId) {
    const worker = workersData.find(w => w.id === workerId);
    if (!worker) return;

    document.getElementById('m-avatar').src = worker.avatar;
    document.getElementById('m-name').textContent = worker.name;
    document.getElementById('m-loc').textContent = worker.locality + ', ' + worker.city;
    document.getElementById('m-rating').textContent = worker.rating;
    document.getElementById('m-exp').textContent = worker.experience_years + ' Years Experience';
    document.getElementById('m-bio').textContent = worker.bio;
    document.getElementById('m-hourly').textContent = '₹' + worker.hourly_rate;
    document.getElementById('m-monthly').textContent = '₹' + worker.monthly_rate;
    document.getElementById('m-book-btn').href = '/book?worker_id=' + worker.id;

    document.getElementById('worker-modal').classList.remove('hidden');
    lucide.createIcons();
  }

  function closeWorkerModal() {
    document.getElementById('worker-modal').classList.add('hidden');
  }

  const filterCity = document.getElementById('filter-city');
  const filterService = document.getElementById('filter-service');
  const filterRate = document.getElementById('filter-rate');
  const rateDisplay = document.getElementById('rate-display');
  const filterVerified = document.getElementById('filter-verified');
  const filterAvailable = document.getElementById('filter-available');
  const workerCards = document.querySelectorAll('.worker-card');
  const workerCount = document.getElementById('worker-count');

  // Check URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('city')) filterCity.value = urlParams.get('city');
  if (urlParams.get('service')) filterService.value = urlParams.get('service');

  function applyFilters() {
    const city = filterCity.value.toLowerCase();
    const service = filterService.value;
    const maxRate = parseInt(filterRate.value);
    const verifiedOnly = filterVerified.checked;
    const availableOnly = filterAvailable.checked;

    rateDisplay.textContent = '₹' + maxRate + '/hr';

    let visibleCount = 0;

    workerCards.forEach(card => {
      const cCity = card.dataset.city.toLowerCase();
      const cServices = card.dataset.services.split(',');
      const cRate = parseInt(card.dataset.rate);
      const cVerified = card.dataset.verified === 'true';
      const cAvailable = card.dataset.available === 'true';

      let match = true;
      if (city && !cCity.includes(city)) match = false;
      if (service && !cServices.includes(service)) match = false;
      if (cRate > maxRate) match = false;
      if (verifiedOnly && !cVerified) match = false;
      if (availableOnly && !cAvailable) match = false;

      if (match) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    workerCount.textContent = visibleCount;
  }

  filterCity.addEventListener('change', applyFilters);
  filterService.addEventListener('change', applyFilters);
  filterRate.addEventListener('input', applyFilters);
  filterVerified.addEventListener('change', applyFilters);
  filterAvailable.addEventListener('change', applyFilters);

  document.getElementById('reset-filters').addEventListener('click', () => {
    filterCity.value = '';
    filterService.value = '';
    filterRate.value = 350;
    filterVerified.checked = false;
    filterAvailable.checked = false;
    applyFilters();
  });

  applyFilters();
</script>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'helpers.html'), getBaseHtml('Find Verified Domestic Helpers — Sparkle Home', helpersContent, helpersScripts));
console.log('✓ helpers.html generated');

// ==========================================
// 4. GENERATE BOOK.HTML
// ==========================================
const bookContent = `
<div class="bg-gradient-to-b from-brand-50/60 to-white py-10 border-b border-slate-200">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
      <i data-lucide="shield-check" class="w-3.5 h-3.5 text-brand-600"></i>
      <span>Guaranteed Verified Helper</span>
    </span>
    <h1 class="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
      Schedule Your Domestic Service
    </h1>
    <p class="text-slate-600 text-xs sm:text-sm">
      Transparent pricing, conflict-free scheduling, and secure digital or cash payment.
    </p>
  </div>
</div>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
    <div class="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      
      <form id="booking-form" class="space-y-6">
        
        <!-- STEP 1: SERVICE & FREQUENCY -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span class="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">1</span>
            <h3 class="font-heading font-bold text-slate-900 text-base">Select Service & Frequency</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Service Required *</label>
              <select id="book-service" required class="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                ${services.map(s => `
                <option value="${s.id}" data-hourly="${s.hourly_rate}" data-monthly="${s.monthly_rate}">
                  ${s.name} (₹${s.hourly_rate}/hr)
                </option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Booking Frequency *</label>
              <select id="book-plan" class="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="One-Time Booking">One-Time On-Demand (2-3 Hours)</option>
                <option value="Daily Recurring (Monthly)">Daily Maid Plan (Monthly Subscription)</option>
                <option value="Weekly Clean (4 Weeks)">Weekly Deep Clean (4 Visits)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- STEP 2: HELPER PREFERENCE -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span class="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">2</span>
            <h3 class="font-heading font-bold text-slate-900 text-base">Helper Preference</h3>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Select Helper</label>
            <select id="book-worker" class="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">⚡ Auto-Assign Nearest Available Verified Helper</option>
              ${workers.map(w => `
              <option value="${w.id}">
                ${w.name} (${w.city} • ${w.rating}★ • ₹${w.hourly_rate}/hr)
              </option>`).join('')}
            </select>
            <p class="text-[11px] text-slate-500 mt-1">
              All helpers carry valid Aadhaar, police verification, and undergo background checks.
            </p>
          </div>
        </div>

        <!-- STEP 3: SCHEDULE -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span class="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">3</span>
            <h3 class="font-heading font-bold text-slate-900 text-base">Date & Preferred Slot</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Service Date *</label>
              <input type="date" id="book-date" required class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Time Window *</label>
              <select id="book-slot" required class="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="07:00 AM - 09:30 AM">Morning: 07:00 AM - 09:30 AM</option>
                <option value="10:00 AM - 12:30 PM">Mid-day: 10:00 AM - 12:30 PM</option>
                <option value="02:00 PM - 04:30 PM">Afternoon: 02:00 PM - 04:30 PM</option>
                <option value="05:30 PM - 08:00 PM">Evening: 05:30 PM - 08:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <!-- STEP 4: CONTACT -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span class="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">4</span>
            <h3 class="font-heading font-bold text-slate-900 text-base">Household Location & Details</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
              <input type="text" id="cust-name" required placeholder="e.g. Ramesh Kumar" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Mobile Number (For OTP) *</label>
              <input type="tel" id="cust-phone" required placeholder="e.g. 9876543210" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">House Address / Flat No. & Landmark *</label>
            <textarea id="cust-address" required rows="2" placeholder="e.g. Flat 304, Green Heights, Kondapur, Hyderabad" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Special Cooking / Cleaning Instructions (Optional)</label>
            <input type="text" id="cust-instructions" placeholder="e.g. Please bring mild detergent; child asleep till 8 AM" class="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
          </div>
        </div>

        <!-- STEP 5: PAYMENT -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span class="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">5</span>
            <h3 class="font-heading font-bold text-slate-900 text-base">Payment Method</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label class="flex items-center gap-2 p-3 rounded-2xl border border-brand-500 bg-brand-50/50 cursor-pointer">
              <input type="radio" name="payment_method" value="UPI (Razorpay)" checked class="text-brand-600">
              <div class="text-xs">
                <span class="font-bold block text-slate-900">UPI Instant</span>
                <span class="text-slate-500 text-[10px]">GPay / PhonePe / Paytm</span>
              </div>
            </label>

            <label class="flex items-center gap-2 p-3 rounded-2xl border border-slate-200 hover:border-brand-300 cursor-pointer">
              <input type="radio" name="payment_method" value="Credit/Debit Card" class="text-brand-600">
              <div class="text-xs">
                <span class="font-bold block text-slate-900">Cards</span>
                <span class="text-slate-500 text-[10px]">Visa / Mastercard</span>
              </div>
            </label>

            <label class="flex items-center gap-2 p-3 rounded-2xl border border-slate-200 hover:border-brand-300 cursor-pointer">
              <input type="radio" name="payment_method" value="Cash on Delivery" class="text-brand-600">
              <div class="text-xs">
                <span class="font-bold block text-slate-900">Pay After Service</span>
                <span class="text-slate-500 text-[10px]">Cash to Helper</span>
              </div>
            </label>
          </div>
        </div>

        <button type="submit" class="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.01]">
          Confirm & Book Verified Helper Now →
        </button>

      </form>

    </div>

    <!-- RIGHT SUMMARY -->
    <div class="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-28">
      
      <div class="pb-3 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-heading font-bold text-slate-900 text-base">Fare Breakdown</h3>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">100% Transparent</span>
      </div>

      <div class="space-y-3 text-xs text-slate-600">
        <div class="flex justify-between">
          <span>Service Base Fare</span>
          <span id="summary-base" class="font-bold text-slate-900">₹398</span>
        </div>
        <div class="flex justify-between">
          <span>Platform & Safety Fee</span>
          <span class="font-bold text-slate-900">₹29</span>
        </div>
        <div class="flex justify-between">
          <span>Taxes & GST (5%)</span>
          <span id="summary-tax" class="font-bold text-slate-900">₹20</span>
        </div>
        <div class="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
          <span>Total Payable</span>
          <span id="summary-total" class="text-xl text-brand-600">₹447</span>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-[11px] text-slate-600">
        <div class="flex items-center gap-2 font-bold text-slate-800">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          <span>Sparkle Home Care Guarantee</span>
        </div>
        <p>
          • 4-Digit OTP ensures only your assigned helper enters.<br>
          • No cancellation charges if cancelled 2 hrs before.<br>
          • Automated replacement maid if assigned helper is sick.
        </p>
      </div>

    </div>

  </div>
</div>

<!-- CONFIRMATION MODAL -->
<div id="booking-success-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-5 animate-scale">
    <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
      <i data-lucide="check" class="w-8 h-8"></i>
    </div>
    
    <div>
      <h3 class="font-heading font-extrabold text-2xl text-slate-900">Booking Confirmed!</h3>
      <p class="text-xs text-slate-500 mt-1">Your domestic service has been scheduled successfully.</p>
    </div>

    <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
      <div class="flex justify-between border-b border-slate-200/70 pb-1.5">
        <span class="text-slate-400">Booking Reference:</span>
        <span id="res-booking-id" class="font-mono font-bold text-brand-700">SH-XXXX</span>
      </div>
      <div class="flex justify-between border-b border-slate-200/70 pb-1.5">
        <span class="text-slate-400">Start Service OTP:</span>
        <span id="res-otp" class="font-mono font-extrabold text-emerald-600 text-sm">9999</span>
      </div>
      <div class="flex justify-between border-b border-slate-200/70 pb-1.5">
        <span class="text-slate-400">Assigned Helper:</span>
        <span id="res-worker" class="font-bold text-slate-800">Helper Name</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-400">Total Amount:</span>
        <span id="res-amount" class="font-bold text-slate-900">₹447</span>
      </div>
    </div>

    <div class="flex flex-col gap-2 pt-2">
      <a href="/bookings" class="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-colors">
        Track in My Bookings →
      </a>
      <a href="/" class="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
        Return to Home
      </a>
    </div>
  </div>
</div>
`;

const bookScripts = `
<script>
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('book-date').value = tomorrow.toISOString().split('T')[0];

  const serviceSelect = document.getElementById('book-service');
  const planSelect = document.getElementById('book-plan');
  const workerSelect = document.getElementById('book-worker');
  const baseSummary = document.getElementById('summary-base');
  const taxSummary = document.getElementById('summary-tax');
  const totalSummary = document.getElementById('summary-total');

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('service_id')) serviceSelect.value = urlParams.get('service_id');
  if (urlParams.get('worker_id')) workerSelect.value = urlParams.get('worker_id');

  function calculateFare() {
    const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
    const hourly = parseInt(selectedOpt.dataset.hourly || 199);
    const monthly = parseInt(selectedOpt.dataset.monthly || 3500);
    const plan = planSelect.value;

    let base = 0;
    if (plan.includes('Monthly')) {
      base = monthly;
    } else if (plan.includes('Weekly')) {
      base = hourly * 8;
    } else {
      base = hourly * 2;
    }

    const platformFee = 29;
    const tax = Math.round(base * 0.05);
    const total = base + platformFee + tax;

    baseSummary.textContent = '₹' + base;
    taxSummary.textContent = '₹' + tax;
    totalSummary.textContent = '₹' + total;
  }

  serviceSelect.addEventListener('change', calculateFare);
  planSelect.addEventListener('change', calculateFare);
  calculateFare();

  document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
    const workerOpt = workerSelect.options[workerSelect.selectedIndex];
    const workerName = workerSelect.value ? workerOpt.text.split('(')[0].trim() : 'Lakshmi Devi (Assigned)';

    const total = parseInt(totalSummary.textContent.replace('₹', '')) || 447;
    const randId = 'SH-' + Math.floor(1000 + Math.random() * 9000);
    const randOtp = Math.floor(1000 + Math.random() * 9000);

    const payload = {
      id: randId,
      service_id: serviceSelect.value,
      service_name: selectedOpt.text.split('(')[0].trim(),
      plan_type: planSelect.value,
      worker_id: workerSelect.value || 'w_101',
      worker_name: workerName,
      worker_phone: '+91 98765 ' + Math.floor(10000 + Math.random() * 90000),
      date: document.getElementById('book-date').value,
      time_slot: document.getElementById('book-slot').value,
      customer_name: document.getElementById('cust-name').value,
      customer_phone: document.getElementById('cust-phone').value,
      customer_address: document.getElementById('cust-address').value,
      special_instructions: document.getElementById('cust-instructions').value,
      payment_method: document.querySelector('input[name="payment_method"]:checked').value,
      payment_status: 'Confirmed',
      status: 'Confirmed',
      otp: randOtp,
      total_amount: total,
      created_at: new Date().toLocaleDateString()
    };

    // Try API if available, else store locally
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.booking) {
          payload.id = data.booking.id;
          payload.otp = data.booking.otp;
        }
      }
    } catch(err) {
      // Netlify static fallback
    }

    // Save to localStorage for client-side state
    const existing = JSON.parse(localStorage.getItem('sparkle_bookings') || '[]');
    existing.unshift(payload);
    localStorage.setItem('sparkle_bookings', JSON.stringify(existing));

    document.getElementById('res-booking-id').textContent = payload.id;
    document.getElementById('res-otp').textContent = payload.otp;
    document.getElementById('res-worker').textContent = payload.worker_name;
    document.getElementById('res-amount').textContent = '₹' + payload.total_amount;

    document.getElementById('booking-success-modal').classList.remove('hidden');
    lucide.createIcons();
  });
</script>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'book.html'), getBaseHtml('Book Domestic Service — Sparkle Home', bookContent, bookScripts));
console.log('✓ book.html generated');

// ==========================================
// 5. GENERATE BOOKINGS.HTML
// ==========================================
const bookingsContent = `
<div class="bg-slate-900 text-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="font-heading font-extrabold text-3xl text-white">
          Manage Your Bookings
        </h1>
        <p class="text-slate-400 text-xs sm:text-sm">
          Track helper arrival, view start OTPs, reschedule slots, and submit reviews.
        </p>
      </div>
      <a href="/book" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-colors w-fit">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Book Another Service</span>
      </a>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  
  <div class="flex items-center gap-2 mb-8 border-b border-slate-200 pb-3 text-xs font-bold">
    <button onclick="filterBookings('all')" id="tab-all" class="booking-tab active px-4 py-2 rounded-xl bg-brand-600 text-white shadow-sm">
      All Bookings (<span id="count-all">${bookings.length}</span>)
    </button>
    <button onclick="filterBookings('Confirmed')" id="tab-confirmed" class="booking-tab px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
      Upcoming / Confirmed
    </button>
    <button onclick="filterBookings('Completed')" id="tab-completed" class="booking-tab px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
      Completed
    </button>
  </div>

  <div id="bookings-container" class="space-y-6">
    <!-- Populated by JavaScript from initial + localStorage -->
  </div>

</div>

<!-- REVIEW MODAL -->
<div id="review-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="font-heading font-extrabold text-xl text-slate-900">Rate Service</h3>
      <button onclick="closeReviewModal()" class="text-slate-400 hover:text-slate-600">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <p class="text-xs text-slate-600">
      How was your experience with <span id="rev-worker-name" class="font-bold text-slate-900"></span>?
    </p>

    <div class="flex items-center justify-center gap-3 py-2 text-amber-400">
      <i data-lucide="star" class="w-8 h-8 fill-amber-400 cursor-pointer"></i>
      <i data-lucide="star" class="w-8 h-8 fill-amber-400 cursor-pointer"></i>
      <i data-lucide="star" class="w-8 h-8 fill-amber-400 cursor-pointer"></i>
      <i data-lucide="star" class="w-8 h-8 fill-amber-400 cursor-pointer"></i>
      <i data-lucide="star" class="w-8 h-8 fill-amber-400 cursor-pointer"></i>
    </div>

    <div>
      <label class="block text-xs font-bold text-slate-700 mb-1">Feedback Comments</label>
      <textarea rows="3" placeholder="Share your experience (punctuality, cleaning quality, cooking taste...)" class="w-full text-xs p-3 rounded-xl border border-slate-300"></textarea>
    </div>

    <button onclick="submitReview()" class="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-colors">
      Submit Rating & Feedback
    </button>
  </div>
</div>
`;

const bookingsScripts = `
<script>
  const initialBookings = ${JSON.stringify(bookings)};

  function getCombinedBookings() {
    const local = JSON.parse(localStorage.getItem('sparkle_bookings') || '[]');
    // Filter duplicates by id
    const localIds = new Set(local.map(b => b.id));
    const merged = [...local, ...initialBookings.filter(b => !localIds.has(b.id))];
    return merged;
  }

  function renderBookings(statusFilter = 'all') {
    const list = getCombinedBookings();
    document.getElementById('count-all').textContent = list.length;
    const container = document.getElementById('bookings-container');
    container.innerHTML = '';

    const filtered = statusFilter === 'all' ? list : list.filter(b => {
      if (statusFilter === 'Confirmed') return b.status === 'Confirmed' || b.status === 'In Progress';
      return b.status === statusFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div class="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">No bookings found for this category.</div>';
      return;
    }

    filtered.forEach(b => {
      const card = document.createElement('div');
      card.className = 'booking-card bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow';
      
      let statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">' + b.status + '</span>';
      if (b.status === 'Confirmed') {
        statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>Confirmed & Assigned</span>';
      } else if (b.status === 'Completed') {
        statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5"></i>Service Completed</span>';
      } else if (b.status === 'Cancelled') {
        statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">Cancelled</span>';
      }

      card.innerHTML = \`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div class="flex items-center gap-3">
            <span class="font-mono font-extrabold text-sm text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-xl">
              \${b.id}
            </span>
            <span class="text-xs text-slate-400 font-medium">Booked on \${b.created_at || 'Recently'}</span>
          </div>
          <div>\${statusBadge}</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
          <div class="md:col-span-5 space-y-2">
            <h3 class="font-heading font-extrabold text-xl text-slate-900">\${b.service_name}</h3>
            <div class="text-xs text-brand-700 font-semibold">\${b.plan_type}</div>
            <div class="flex items-center gap-2 text-xs text-slate-600 pt-1">
              <i data-lucide="calendar" class="w-4 h-4 text-slate-400"></i>
              <span><strong>Date:</strong> \${b.date}</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-600">
              <i data-lucide="clock" class="w-4 h-4 text-slate-400"></i>
              <span><strong>Slot:</strong> \${b.time_slot}</span>
            </div>
            <div class="flex items-start gap-2 text-xs text-slate-600">
              <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"></i>
              <span>\${b.customer_address}</span>
            </div>
          </div>

          <div class="md:col-span-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Domestic Helper</div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                <i data-lucide="user-check" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="font-heading font-bold text-sm text-slate-900">\${b.worker_name}</div>
                <div class="text-xs text-slate-500">\${b.worker_phone}</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
              <span class="text-slate-500">Service OTP:</span>
              <span class="font-mono font-extrabold text-brand-700 text-sm tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">\${b.otp}</span>
            </div>
            <p class="text-[10px] text-slate-400 italic">Share OTP only when helper arrives at your home.</p>
          </div>

          <div class="md:col-span-3 text-right space-y-3">
            <div>
              <div class="text-xs text-slate-400">Total Bill</div>
              <div class="font-extrabold text-2xl text-slate-900">₹\${b.total_amount}</div>
              <div class="text-[11px] font-semibold text-emerald-600">\${b.payment_status || 'Paid'}</div>
            </div>

            <div class="flex flex-col gap-2">
              \${b.status === 'Confirmed' || b.status === 'In Progress' ? \`
                <button onclick="cancelBooking('\${b.id}')" class="w-full py-2 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors">
                  Cancel Booking
                </button>
              \` : \`
                <button onclick="openReviewModal('\${b.id}', '\${b.worker_name}')" class="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-white"></i>
                  <span>Leave Rating</span>
                </button>
              \`}
            </div>
          </div>
        </div>
      \`;
      container.appendChild(card);
    });

    lucide.createIcons();
  }

  function filterBookings(status) {
    const tabs = document.querySelectorAll('.booking-tab');
    tabs.forEach(t => {
      t.classList.remove('bg-brand-600', 'text-white');
      t.classList.add('bg-slate-100', 'text-slate-700');
    });

    if (status === 'all') {
      document.getElementById('tab-all').classList.add('bg-brand-600', 'text-white');
    } else if (status === 'Confirmed') {
      document.getElementById('tab-confirmed').classList.add('bg-brand-600', 'text-white');
    } else {
      document.getElementById('tab-completed').classList.add('bg-brand-600', 'text-white');
    }

    renderBookings(status);
  }

  function cancelBooking(id) {
    if (!confirm('Are you sure you want to cancel booking ' + id + '?')) return;
    
    const list = getCombinedBookings();
    const item = list.find(b => b.id === id);
    if (item) {
      item.status = 'Cancelled';
      localStorage.setItem('sparkle_bookings', JSON.stringify(list));
      showToast('Booking Cancelled', 'Booking ' + id + ' has been cancelled.');
      renderBookings();
    }
  }

  function openReviewModal(id, workerName) {
    document.getElementById('rev-worker-name').textContent = workerName;
    document.getElementById('review-modal').classList.remove('hidden');
    lucide.createIcons();
  }

  function closeReviewModal() {
    document.getElementById('review-modal').classList.add('hidden');
  }

  function submitReview() {
    closeReviewModal();
    showToast('Review Submitted', 'Thank you! Your feedback helps keep Sparkle Home helpers top tier.');
  }

  renderBookings();
</script>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'bookings.html'), getBaseHtml('My Bookings — Sparkle Home', bookingsContent, bookingsScripts));
console.log('✓ bookings.html generated');

// ==========================================
// 6. GENERATE WORKER.HTML
// ==========================================
const worker = workers[0];
const workerContent = `
<div class="bg-gradient-to-b from-brand-900 to-slate-900 text-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
          <i data-lucide="briefcase" class="w-3.5 h-3.5"></i>
          <span>Worker & Partner Interface</span>
        </span>
        <h1 class="font-heading font-extrabold text-3xl text-white">
          Domestic Helper Workspace
        </h1>
        <p class="text-slate-400 text-xs sm:text-sm">
          Control your schedule, accept incoming requests, and track weekly direct bank earnings.
        </p>
      </div>

      <div class="flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700 text-xs font-bold">
        <button onclick="switchView('dashboard')" id="btn-dash" class="px-4 py-2 rounded-xl bg-brand-600 text-white transition-colors">
          Helper Dashboard
        </button>
        <button onclick="switchView('register')" id="btn-reg" class="px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-colors">
          New Helper Registration
        </button>
      </div>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

  <!-- VIEW 1: DASHBOARD -->
  <div id="view-dashboard" class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
        <div class="flex items-center gap-4">
          <img src="${worker.avatar}" alt="${worker.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-md">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-extrabold text-xl text-slate-900">${worker.name}</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                ✓ Verified
              </span>
            </div>
            <p class="text-xs text-slate-500">${worker.locality}, ${worker.city}</p>
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span class="text-amber-500 flex items-center">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 mr-0.5"></i>
                ${worker.rating} (${worker.reviews_count} ratings)
              </span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-slate-700 block">Duty Status</span>
            <span id="duty-label" class="text-xs font-semibold text-emerald-600">
              ● Available Today
            </span>
          </div>
          <button onclick="toggleDuty()" id="duty-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors">
            Toggle Status
          </button>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">This Month</span>
          <div class="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <i data-lucide="wallet" class="w-5 h-5"></i>
          </div>
        </div>
        <div>
          <div class="font-heading font-extrabold text-3xl text-slate-900">₹24,800</div>
          <p class="text-[11px] text-emerald-600 font-semibold mt-1">✓ Payout transferred to Bank</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Jobs Completed</span>
          <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <i data-lucide="check-circle" class="w-5 h-5"></i>
          </div>
        </div>
        <div>
          <div class="font-heading font-extrabold text-3xl text-slate-900">148</div>
          <p class="text-[11px] text-slate-500 mt-1">100% Punctuality rating</p>
        </div>
      </div>
    </div>

    <!-- REQUESTS -->
    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 class="font-heading font-extrabold text-xl text-slate-900 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Booking Requests</span>
          </h3>
          <p class="text-xs text-slate-500">Customers nearby requesting your domestic services.</p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
          2 Pending Requests
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3" id="req-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
              House Cleaning + Dishwashing
            </span>
            <span class="font-bold text-slate-900 text-sm">₹649 Fare</span>
          </div>
          <div>
            <h4 class="font-heading font-bold text-base text-slate-900">Aparna CyberLife, Gachibowli</h4>
            <p class="text-xs text-slate-500">Customer: Vikram Sharma (3 BHK Apartment)</p>
            <p class="text-xs text-slate-600 mt-1"><strong>Time:</strong> Tomorrow, 08:00 AM - 10:30 AM</p>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <button onclick="handleRequest('req-1', 'accepted')" class="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors">
              Accept Request
            </button>
            <button onclick="handleRequest('req-1', 'declined')" class="py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors">
              Decline
            </button>
          </div>
        </div>

        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3" id="req-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              Daily Cooking (Monthly Plan)
            </span>
            <span class="font-bold text-emerald-600 text-sm">₹4,500/Month</span>
          </div>
          <div>
            <h4 class="font-heading font-bold text-base text-slate-900">My Home Bhooja, Hitec City</h4>
            <p class="text-xs text-slate-500">Customer: Neha Gupta (North Indian Meals for 2)</p>
            <p class="text-xs text-slate-600 mt-1"><strong>Daily Slot:</strong> 06:30 PM - 08:00 PM</p>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <button onclick="handleRequest('req-2', 'accepted')" class="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors">
              Accept Request
            </button>
            <button onclick="handleRequest('req-2', 'declined')" class="py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- VIEW 2: REGISTRATION -->
  <div id="view-register" class="hidden max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
    <div class="space-y-2 pb-4 border-b border-slate-100">
      <h3 class="font-heading font-extrabold text-2xl text-slate-900">
        Register as a Domestic Service Provider
      </h3>
      <p class="text-xs sm:text-sm text-slate-500">
        Earn dignified income with full transparency, direct UPI/bank payouts, and zero middlemen exploitation.
      </p>
    </div>

    <form id="worker-reg-form" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Full Name (As per Aadhaar) *</label>
          <input type="text" id="w-name" required placeholder="e.g. Sarita Devi" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Mobile Number (For WhatsApp & SMS) *</label>
          <input type="tel" id="w-phone" required placeholder="e.g. 9811223344" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Operating City *</label>
          <select id="w-city" class="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Locality / Neighborhood *</label>
          <input type="text" id="w-locality" required placeholder="e.g. Madhapur / Kukatpally" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-2">Select Services You Offer *</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <label class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer hover:bg-brand-50">
            <input type="checkbox" name="services" value="house_cleaning" checked class="text-brand-600 rounded">
            <span>House Cleaning</span>
          </label>
          <label class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer hover:bg-brand-50">
            <input type="checkbox" name="services" value="cooking_services" checked class="text-brand-600 rounded">
            <span>Cooking Services</span>
          </label>
          <label class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer hover:bg-brand-50">
            <input type="checkbox" name="services" value="dishwashing" checked class="text-brand-600 rounded">
            <span>Dishwashing</span>
          </label>
          <label class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer hover:bg-brand-50">
            <input type="checkbox" name="services" value="laundry_services" class="text-brand-600 rounded">
            <span>Laundry & Ironing</span>
          </label>
          <label class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer hover:bg-brand-50">
            <input type="checkbox" name="services" value="babysitting" class="text-brand-600 rounded">
            <span>Babysitting</span>
          </label>
          <label class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer hover:bg-brand-50">
            <input type="checkbox" name="services" value="elderly_assistance" class="text-brand-600 rounded">
            <span>Elderly Care</span>
          </label>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Expected Rate / Hour (₹)</label>
          <input type="number" id="w-hourly" value="220" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Monthly Package (₹)</label>
          <input type="number" id="w-monthly" value="4500" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
          <input type="number" id="w-exp" value="5" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300">
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
        <div class="flex items-center gap-2 text-xs font-bold text-amber-900">
          <i data-lucide="shield-alert" class="w-4 h-4 text-amber-600"></i>
          <span>Mandatory Identity Verification (KYC)</span>
        </div>
        <p class="text-[11px] text-amber-800 leading-relaxed">
          Sparkle Home verifies 100% of helpers. Upload photo and enter 12-digit Aadhaar number for police verification.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <input type="text" placeholder="12-Digit Aadhaar No. (e.g. 5412 XXXX 8910)" class="text-xs p-2.5 rounded-xl border border-amber-300 bg-white">
          <input type="file" class="text-xs p-1.5 rounded-xl border border-amber-300 bg-white cursor-pointer">
        </div>
      </div>

      <button type="submit" class="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all">
        Submit Registration for Verification →
      </button>
    </form>
  </div>

</div>
`;

const workerScripts = `
<script>
  let isAvailable = true;

  function switchView(view) {
    if (view === 'dashboard') {
      document.getElementById('view-dashboard').classList.remove('hidden');
      document.getElementById('view-register').classList.add('hidden');
      document.getElementById('btn-dash').className = 'px-4 py-2 rounded-xl bg-brand-600 text-white transition-colors';
      document.getElementById('btn-reg').className = 'px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-colors';
    } else {
      document.getElementById('view-dashboard').classList.add('hidden');
      document.getElementById('view-register').classList.remove('hidden');
      document.getElementById('btn-reg').className = 'px-4 py-2 rounded-xl bg-brand-600 text-white transition-colors';
      document.getElementById('btn-dash').className = 'px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-colors';
    }
    lucide.createIcons();
  }

  function toggleDuty() {
    isAvailable = !isAvailable;
    const label = document.getElementById('duty-label');
    const btn = document.getElementById('duty-btn');

    if (isAvailable) {
      label.textContent = '● Available Today';
      label.className = 'text-xs font-semibold text-emerald-600';
      btn.className = 'px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors';
      showToast('Duty Status', 'You are now marked Available Today.');
    } else {
      label.textContent = '● On Leave';
      label.className = 'text-xs font-semibold text-slate-400';
      btn.className = 'px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-600 hover:bg-slate-700 shadow-sm transition-colors';
      showToast('Duty Status', 'You are now marked On Leave.', 'info');
    }
  }

  function handleRequest(reqId, action) {
    const el = document.getElementById(reqId);
    if (action === 'accepted') {
      el.innerHTML = '<div class="p-4 text-center font-bold text-xs text-emerald-700 bg-emerald-100 rounded-xl">✓ Request Accepted! Customer has been notified.</div>';
      showToast('Booking Accepted', 'Added to your upcoming job schedule.');
    } else {
      el.remove();
      showToast('Request Declined', 'Request removed from your queue.', 'info');
    }
  }

  document.getElementById('worker-reg-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Registration Submitted!', 'Your profile is sent for Admin KYC & Police verification.');
    setTimeout(() => {
      switchView('dashboard');
    }, 1200);
  });
</script>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'worker.html'), getBaseHtml('Domestic Helper & Maid Portal — Sparkle Home', workerContent, workerScripts));
console.log('✓ worker.html generated');

// ==========================================
// 7. GENERATE ADMIN.HTML
// ==========================================
const adminContent = `
<div class="bg-slate-900 text-white py-10 border-b border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          <i data-lucide="shield" class="w-3.5 h-3.5"></i>
          <span>Super Admin Operations</span>
        </div>
        <h1 class="font-heading font-extrabold text-3xl text-white">
          Platform Operations & Verification Desk
        </h1>
        <p class="text-slate-400 text-xs sm:text-sm">
          Oversee KYC verifications, monitor live booking dispatches, resolve disputes, and track platform revenue.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          System Live (Hyderabad & Metro Hubs)
        </span>
      </div>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
  
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
      <div class="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">${bookings.length}</div>
      <span class="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
        <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +18% this week
      </span>
    </div>

    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Domestic Helpers</span>
      <div class="font-heading font-extrabold text-2xl sm:text-3xl text-brand-600">${workers.length}</div>
      <span class="text-[11px] text-slate-500 font-medium">Across 4 Metros</span>
    </div>

    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Verified (KYC)</span>
      <div class="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600">${workers.filter(w => w.verified).length}</div>
      <span class="text-[11px] text-emerald-600 font-semibold">100% Police vetted</span>
    </div>

    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Gross Volume</span>
      <div class="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">₹6,245</div>
      <span class="text-[11px] text-brand-600 font-semibold">Razorpay & Cash</span>
    </div>

    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2 col-span-2 lg:col-span-1">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Disputes</span>
      <div class="font-heading font-extrabold text-2xl sm:text-3xl text-amber-600">1</div>
      <span class="text-[11px] text-amber-700 font-semibold">Requires Attention</span>
    </div>
  </div>

  <!-- WORKER QUEUE -->
  <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
    <div class="flex items-center justify-between pb-4 border-b border-slate-100">
      <div>
        <h3 class="font-heading font-extrabold text-xl text-slate-900 flex items-center gap-2">
          <i data-lucide="shield-check" class="w-5 h-5 text-brand-600"></i>
          <span>Worker KYC & Identity Approval Queue</span>
        </h3>
        <p class="text-xs text-slate-500">Review submitted Aadhaar and criminal background checks before approving workers to take jobs.</p>
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
        Review Queue
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px]">
          <tr>
            <th class="py-3 px-4 rounded-l-xl">Worker Name</th>
            <th class="py-3 px-4">City / Area</th>
            <th class="py-3 px-4">Services</th>
            <th class="py-3 px-4">Expected Rates</th>
            <th class="py-3 px-4">Aadhaar / Background</th>
            <th class="py-3 px-4">Current Status</th>
            <th class="py-3 px-4 rounded-r-xl text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
          ${workers.map(w => `
          <tr class="hover:bg-slate-50/80 transition-colors" id="row-worker-${w.id}">
            <td class="py-4 px-4 flex items-center gap-3">
              <img src="${w.avatar}" class="w-9 h-9 rounded-xl object-cover">
              <div>
                <div class="font-bold text-slate-900">${w.name}</div>
                <div class="text-[11px] text-slate-400">${w.experience_years} yrs experience</div>
              </div>
            </td>
            <td class="py-4 px-4">${w.locality}, ${w.city}</td>
            <td class="py-4 px-4">
              <div class="flex flex-wrap gap-1">
                ${w.services.slice(0, 2).map(s => `
                <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">${s.replace(/_/g, ' ')}</span>`).join('')}
              </div>
            </td>
            <td class="py-4 px-4 font-bold text-slate-900">₹${w.hourly_rate}/hr • ₹${w.monthly_rate}/mo</td>
            <td class="py-4 px-4">
              <span class="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                <i data-lucide="check" class="w-3.5 h-3.5"></i> Clean Police Record
              </span>
            </td>
            <td class="py-4 px-4 status-cell">
              ${w.verified ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Approved & Active
              </span>` : `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Pending KYC
              </span>`}
            </td>
            <td class="py-4 px-4 text-right action-cell">
              ${!w.verified ? `
              <button onclick="approveWorker('${w.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors">
                Approve KYC
              </button>` : `
              <span class="text-xs text-slate-400 font-semibold">Verified</span>`}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <i data-lucide="receipt" class="w-5 h-5 text-brand-600"></i>
          <span>Live Bookings Monitor</span>
        </h3>
        <span class="text-xs text-slate-400 font-medium">Real-time status tracking</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th class="py-2.5 px-3 rounded-l-lg">ID</th>
              <th class="py-2.5 px-3">Customer</th>
              <th class="py-2.5 px-3">Service</th>
              <th class="py-2.5 px-3">Helper</th>
              <th class="py-2.5 px-3">Amount</th>
              <th class="py-2.5 px-3 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
            ${bookings.map(b => `
            <tr>
              <td class="py-3 px-3 font-mono font-bold text-brand-700">${b.id}</td>
              <td class="py-3 px-3">
                <div class="font-bold text-slate-900">${b.customer_name}</div>
                <div class="text-[10px] text-slate-400">${b.customer_phone}</div>
              </td>
              <td class="py-3 px-3">${b.service_name}</td>
              <td class="py-3 px-3 font-semibold">${b.worker_name}</td>
              <td class="py-3 px-3 font-bold text-slate-900">₹${b.total_amount}</td>
              <td class="py-3 px-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}">
                  ${b.status}
                </span>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 class="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <i data-lucide="life-buoy" class="w-5 h-5 text-amber-600"></i>
          <span>Disputes & Feedback</span>
        </h3>
      </div>

      <div class="space-y-4">
        ${disputes.map(d => `
        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs" id="disp-${d.id}">
          <div class="flex items-center justify-between">
            <span class="font-mono font-bold text-slate-700">${d.id}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${d.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${d.status}
            </span>
          </div>
          <div class="font-bold text-slate-900">${d.subject}</div>
          <p class="text-slate-500 text-[11px] leading-relaxed">${d.details}</p>
          ${d.status !== 'Resolved' ? `
          <button onclick="resolveDispute('disp-${d.id}')" class="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors mt-2">
            Mark Dispute Resolved
          </button>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </div>

</div>
`;

const adminScripts = `
<script>
  function approveWorker(id) {
    const row = document.getElementById('row-worker-' + id);
    if (row) {
      row.querySelector('.status-cell').innerHTML = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved & Active</span>';
      row.querySelector('.action-cell').innerHTML = '<span class="text-xs text-slate-400 font-semibold">Verified</span>';
      showToast('Worker Approved', 'Worker KYC documents verified successfully.');
    }
  }

  function resolveDispute(dispElementId) {
    const el = document.getElementById(dispElementId);
    el.innerHTML = '<div class="p-3 text-center text-xs font-bold text-emerald-700 bg-emerald-100 rounded-xl">✓ Marked as Resolved by Admin</div>';
    showToast('Dispute Resolved', 'Ticket closed successfully.');
  }
</script>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'admin.html'), getBaseHtml('Admin Control Center — Sparkle Home', adminContent, adminScripts));
console.log('✓ admin.html generated');

// ==========================================
// 8. GENERATE EMERGENCY.HTML
// ==========================================
const emergencyContent = `
<div class="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white py-14">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
      <span>SOS Rapid Dispatch System</span>
    </div>
    <h1 class="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
      Emergency 1-Hour Domestic Help
    </h1>
    <p class="text-red-100 max-w-xl mx-auto text-xs sm:text-sm">
      Regular maid absent or unexpected dinner guests? Get a verified domestic helper at your doorstep within 60 minutes.
    </p>
  </div>
</div>

<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
  <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
    <div class="flex items-center justify-between pb-4 border-b border-slate-100">
      <div>
        <h3 class="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
          <i data-lucide="zap" class="w-5 h-5 text-amber-500"></i>
          <span>Helpers on Instant Standby in Your City</span>
        </h3>
        <p class="text-xs text-slate-500">Ready to dispatch immediately upon confirmation.</p>
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
        ${workers.length} Available Now
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${workers.slice(0, 4).map(w => `
      <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
        <img src="${w.avatar}" class="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm">
        <div class="flex-grow">
          <div class="flex items-center justify-between">
            <h4 class="font-heading font-bold text-sm text-slate-900">${w.name}</h4>
            <span class="text-amber-500 font-bold text-xs">${w.rating}★</span>
          </div>
          <p class="text-xs text-slate-500">${w.locality} (&lt; 3.5 km)</p>
          <div class="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
            <span class="font-extrabold text-brand-700 text-xs">₹${w.hourly_rate}/hr</span>
            <a href="/book?worker_id=${w.id}" class="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-sm transition-colors">
              Dispatch Now
            </a>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <div class="bg-gradient-to-br from-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
    <div class="space-y-1">
      <h3 class="font-heading font-extrabold text-xl text-white">
        Request Immediate Standby Dispatch
      </h3>
      <p class="text-xs text-slate-400">
        Enter your address and our automated dispatch engine will assign the closest verified helper.
      </p>
    </div>

    <form action="/book" method="GET" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-900">
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">Service Needed Immediately</label>
          <select name="service_id" class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-white border border-slate-700">
            <option value="house_cleaning">House Cleaning (Emergency broom & mop)</option>
            <option value="cooking_services">Cooking Services (Dinner / Guest prep)</option>
            <option value="dishwashing">Dishwashing (Utensil pile clearance)</option>
            <option value="babysitting">Babysitting (Urgent evening supervision)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">Estimated Arrival Requirement</label>
          <input type="text" value="Under 45 - 60 Minutes" readonly class="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
        </div>
      </div>

      <button type="submit" class="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all">
        Proceed to Instant SOS Booking →
      </button>
    </form>
  </div>
</div>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'emergency.html'), getBaseHtml('Emergency 1-Hour Domestic Help — Sparkle Home', emergencyContent));
console.log('✓ emergency.html generated');

// ==========================================
// 9. GENERATE NETLIFY.TOML & _REDIRECTS
// ==========================================
const netlifyToml = `[build]
  publish = "."

[[redirects]]
  from = "/services"
  to = "/services.html"
  status = 200

[[redirects]]
  from = "/helpers"
  to = "/helpers.html"
  status = 200

[[redirects]]
  from = "/book"
  to = "/book.html"
  status = 200

[[redirects]]
  from = "/bookings"
  to = "/bookings.html"
  status = 200

[[redirects]]
  from = "/worker/portal"
  to = "/worker.html"
  status = 200

[[redirects]]
  from = "/admin"
  to = "/admin.html"
  status = 200

[[redirects]]
  from = "/emergency"
  to = "/emergency.html"
  status = 200

[[redirects]]
  from = "/presentation"
  to = "/presentation.html"
  status = 200

[[redirects]]
  from = "/download-ppt"
  to = "/Sparkle_Home_Project_Presentation.pptx"
  status = 200
`;

const redirects = `/services /services.html 200
/helpers /helpers.html 200
/book /book.html 200
/bookings /bookings.html 200
/worker/portal /worker.html 200
/admin /admin.html 200
/emergency /emergency.html 200
/presentation /presentation.html 200
/download-ppt /Sparkle_Home_Project_Presentation.pptx 200
`;

fs.writeFileSync(path.join(ROOT_DIR, 'netlify.toml'), netlifyToml);
fs.writeFileSync(path.join(ROOT_DIR, '_redirects'), redirects);
console.log('✓ netlify.toml and _redirects generated');

console.log('All static files successfully built for Netlify deployment!');
