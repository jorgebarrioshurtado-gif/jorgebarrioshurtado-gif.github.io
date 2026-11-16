// ─── TYPEWRITER EFFECT ───
const roles = ["Storyteller", "Problem Solver", "Critical Thinker", "Visual Communicator"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const rotatingEl = document.getElementById("rotating-text");

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    rotatingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800); // pause before deleting
      return;
    }
  } else {
    rotatingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}

// Start after a short delay
setTimeout(typeWriter, 800);


// ─── NAV SHADOW ON SCROLL ───
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


// ─── FADE-IN ON SCROLL ───
const fadeEls = document.querySelectorAll(
  ".project-card, .skill-group, .contact-card, .about-grid, .hero-stat-card"
);

fadeEls.forEach(el => el.classList.add("fade-in"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80); // staggered delay
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach(el => observer.observe(el));


// ─── SMOOTH ACTIVE NAV HIGHLIGHT ───
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.style.color = "var(--orange)";
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));
