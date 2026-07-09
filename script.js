// ==============================
// Ambil elemen utama
// ==============================
const navbar = document.getElementById("navbar");
const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll(".navbar__link");
const sections = document.querySelectorAll("section, header");
const revealElements = document.querySelectorAll(".reveal");
const backToTopButton = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

// ==============================
// Menu mobile
// ==============================
navbarToggle.addEventListener("click", () => {
  const isOpen = navbarMenu.classList.toggle("show");

  navbarToggle.classList.toggle("active", isOpen);
  navbarToggle.setAttribute("aria-expanded", isOpen.toString());
});

// ==============================
// Smooth scrolling untuk navigasi
// ==============================
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    const navbarHeight = navbar.offsetHeight;
    const targetPosition = targetSection.offsetTop - navbarHeight + 2;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    navbarMenu.classList.remove("show");
    navbarToggle.classList.remove("active");
    navbarToggle.setAttribute("aria-expanded", "false");
  });
});

// ==============================
// Active menu saat scroll
// ==============================
function setActiveMenu() {
  const scrollPosition = window.scrollY + navbar.offsetHeight + 80;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ==============================
// Efek navbar dan tombol Back to Top
// ==============================
function handleScrollEffects() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  backToTopButton.classList.toggle("show", window.scrollY > 480);
  setActiveMenu();
}

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==============================
// Animasi saat elemen muncul
// ==============================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ==============================
// Form kontak sederhana
// ==============================
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  contactStatus.textContent = "Terima kasih, pesan Anda sudah siap dikirim.";
  contactForm.reset();

  setTimeout(() => {
    contactStatus.textContent = "";
  }, 4000);
});

// ==============================
// Event scroll dan load halaman
// ==============================
window.addEventListener("scroll", handleScrollEffects);
window.addEventListener("load", handleScrollEffects);
