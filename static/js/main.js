/**
 * SparkleHome Interactive Engine
 */

// Toast Notifications Helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-teal-700 text-white'
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  toast.className = `toast flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl font-medium text-sm transition-all duration-300 ${bgColors[type] || bgColors.success}`;
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">${icons[type]}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Interactive Before / After Image Slider
function initBeforeAfterSlider() {
  const container = document.querySelector('.comparison-slider-container');
  if (!container) return;

  const afterImgBox = container.querySelector('.img-after');
  const handle = container.querySelector('.slider-handle');

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(pos, 100));

    afterImgBox.style.width = `${pos}%`;
    handle.style.left = `${pos}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch support for mobile devices
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
  });
}

// Quick Estimate Helper for Homepage Hero
async function calculateQuickEstimate(serviceId, homeType) {
  try {
    const res = await fetch('/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        home_type: homeType,
        addons: []
      })
    });
    const data = await res.json();
    if (data.success) {
      return data.breakdown.final_amount;
    }
  } catch (err) {
    console.error('Estimate error:', err);
  }
  return null;
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
