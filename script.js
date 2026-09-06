/**
 * Currículo — Wallace Rodrigo
 * Ajuste aqui seus dados de contato reais.
 */
const CONTACT = {
  email: "seu.email@exemplo.com",
  phone: "+55 (61) 99999-9999",
  phoneHref: "+5561999999999",
};

const THEME_KEY = "cv-theme";

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

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById("btn-theme");
  if (btn) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    btn.textContent = theme === "dark" ? "Tema claro" : "Tema escuro";
  }
}

function initTheme() {
  setTheme(getPreferredTheme());
  document.getElementById("btn-theme")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function initPrint() {
  document.getElementById("btn-print")?.addEventListener("click", () => {
    window.print();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
      // Deixa o navegador abrir o diálogo nativo; útil para PDF.
      return;
    }
  });
}

function animateSkills() {
  const skills = document.querySelectorAll("#skills-list li");
  skills.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 40}ms`;
    skill.classList.add("is-visible");
  });
}

function yearStamp() {
  // Garante datas relativas coerentes se precisar expandir no futuro.
  document.documentElement.dataset.generated = new Date().toISOString().slice(0, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  applyContact();
  initTheme();
  initPrint();
  animateSkills();
  yearStamp();
});
