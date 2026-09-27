// Loading screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1600);
});

// Aaj ki date + midnight (12:00 AM) — apni submission date ke hisaab se year/month/day adjust karo
const eventDate = new Date(2026, 9, 5, 3, 59, 59).getTime(); 
// Note: month 0-indexed hai (8 = September). Apni actual submission date daal do.

const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "<p class='text-2xl font-cinzel text-amber-400'>The Portal Has Opened</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(hours).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}, 1000);

const registerForm = document.getElementById("registerForm");
const successMsg = document.getElementById("successMsg");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  registerForm.classList.add("hidden");
  successMsg.classList.remove("hidden");
});

// Navbar background on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // animate once only
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((el) => observer.observe(el));

// Custom portal cursor (desktop only)
if (window.matchMedia("(min-width: 768px)").matches) {
  const ring = document.getElementById("cursorRing");
  const dot = document.getElementById("cursorDot");

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  // Smooth trailing effect for the ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow ring on hover over interactive elements
  const hoverTargets = document.querySelectorAll("a, button, input, .highlight-card");
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("cursor-hover"));
  });
}

// Portal zoom transition to Register section
const portalBtn = document.getElementById("portalBtn");
const heroSection = document.getElementById("hero");
const registerSection = document.getElementById("register");
const portalOverlay = document.getElementById("portalOverlay");

portalBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Step 1: start zoom + fade
  heroSection.classList.add("portal-zoom");

  // Step 2: black flash covers screen
  setTimeout(() => {
    portalOverlay.classList.add("active");
  }, 800);

  // Step 3: jump to register section while screen is black
  setTimeout(() => {
    registerSection.scrollIntoView({ behavior: "instant" });
  }, 1400);

  // Step 4: fade black overlay out, reveal register form
  setTimeout(() => {
    portalOverlay.classList.remove("active");
    heroSection.classList.remove("portal-zoom");
  }, 1900);
});