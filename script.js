const CONTACT = {
  email: "wallacerodrigo57@gmail.com",
  phone: "+55 (61) 99199-8105",
  phoneHref: "+5561991998105",
};

function applyContact() {
  const email = document.getElementById("email-link");
  const phone = document.getElementById("phone-link");

  if (email) {
    email.textContent = CONTACT.email;
    email.href = `mailto:${CONTACT.email}`;
  }

  if (phone) {
    phone.textContent = CONTACT.phone;
    phone.href = `tel:${CONTACT.phoneHref}`;
  }
}

function initPrint() {
  const print = () => window.print();
  document.getElementById("btn-print")?.addEventListener("click", print);
  document.getElementById("btn-print-footer")?.addEventListener("click", print);
}

function initNavScroll() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initSkills() {
  const skills = document.querySelectorAll("#skills-list li");
  if (!skills.length) return;

  const play = () => {
    skills.forEach((skill, index) => {
      skill.style.animationDelay = `${index * 35}ms`;
      skill.classList.add("is-on");
    });
  };

  const section = document.getElementById("formacao");
  if (!section || !("IntersectionObserver" in window)) {
    play();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      play();
      observer.disconnect();
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  applyContact();
  initPrint();
  initNavScroll();
  initReveals();
  initSkills();
  initSmoothAnchors();
});
