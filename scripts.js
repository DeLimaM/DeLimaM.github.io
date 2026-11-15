const TAG_CLOUDS = {
  "#skills": {
    fr: [
      "Autonomie",
      "Curiosité",
      "Investissement",
      "Esprit d'équipe",
      "Créativité",
      "Compétences techniques",
      "Résolution de problèmes",
    ],
    en: [
      "Autonomy",
      "Curiosity",
      "Commitment",
      "Team spirit",
      "Creativity",
      "Technical skills",
      "Problem solving",
    ],
  },
  "#passions": {
    fr: [
      "Automobile",
      "Spatial",
      "Sciences",
      "Technologie",
      "Hardware",
      "Jeux Vidéos",
      "Data",
      "Développement Web",
      "Développement Bas Niveau",
    ],
    en: [
      "Cars",
      "Space",
      "Science",
      "Technology",
      "Hardware",
      "Video games",
      "Data",
      "Web development",
      "Low-level development",
    ],
  },
};

// attributes holding French text, translated by a data-en-* twin
// (alt -> data-en-alt, data-label -> data-en-label); "text" is the text content
const TRANSLATED_ATTRIBUTES = [
  "alt",
  "title",
  "aria-label",
  "content",
  "data-label",
  "text",
];

let tagClouds = [];
let tagCloudsLanguage = null;

//on page load
document.addEventListener("DOMContentLoaded", function () {
  initSwiper("edu");
  initSwiper("perso");
  initSwiper("pro");
  setSavedTheme();
  setLanguage(document.documentElement.lang);
  updateDynamicTexts();
  watchSectionHeights();
  refreshHeader();

  window.addEventListener("scroll", refreshHeader, { passive: true });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(startTagClouds, 200);
  });

  document.getElementById("hamburger").addEventListener("click", function () {
    toggleDropdown();
  });
  document
    .getElementById("theme-checkbox")
    .addEventListener("change", function () {
      toggleTheme();
    });
  document
    .getElementById("lang-checkbox")
    .addEventListener("change", function () {
      toggleLanguage();
    });

  // every internal anchor goes through scrollToSection
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      scrollToSection(link.hash.slice(1));
      toggleDropdown(false);
    });
  });
});

// handle the header size and the progress bar
function refreshHeader() {
  const scrollValue = window.scrollY;
  document
    .getElementById("header")
    .classList.toggle("small-header", scrollValue > 50);

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollValue / height) * 100;
  const percentagePerSection =
    100 /
    Math.max(document.querySelectorAll(".stacking-section").length - 1, 1);
  const progressInterval =
    Math.round(scrolled / percentagePerSection) * percentagePerSection;
  document.getElementById("progress-bar").style.width = progressInterval + "%";
}

// publish each section height, used by the CSS to compute its sticky offset
function watchSectionHeights() {
  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      section.style.setProperty("--section-h", section.offsetHeight + "px");
    });
  });
  document
    .querySelectorAll(".stacking-section")
    .forEach((section) => observer.observe(section));
}

// set the theme based on the saved theme
function setSavedTheme() {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.className = savedTheme;
  }
  document.getElementById("theme-checkbox").checked =
    body.classList.contains("light-theme");
}

// toggle the theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  localStorage.setItem("theme", body.className);
}

// switch the language, and remember it
function toggleLanguage() {
  const lang = document.documentElement.lang === "en" ? "fr" : "en";
  localStorage.setItem("lang", lang);
  setLanguage(lang);
}

// show the page in a language: the CSS hides the elements of the other one,
// the translated attributes and the tag clouds are updated here
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.getElementById("lang-checkbox").checked = lang === "en";

  TRANSLATED_ATTRIBUTES.forEach((attribute) => {
    const key = attribute.replace(/^data-/, "");
    document.querySelectorAll(`[data-en-${key}]`).forEach((element) => {
      // the French text is the original one, saved before its first change
      if (!element.hasAttribute(`data-fr-${key}`)) {
        element.setAttribute(`data-fr-${key}`, readAttribute(element, attribute));
      }
      writeAttribute(
        element,
        attribute,
        element.getAttribute(`data-${lang}-${key}`)
      );
    });
  });

  startTagClouds();
}

function readAttribute(element, attribute) {
  return attribute === "text"
    ? element.textContent
    : element.getAttribute(attribute);
}

function writeAttribute(element, attribute, value) {
  if (attribute === "text") {
    element.textContent = value;
  } else {
    element.setAttribute(attribute, value);
  }
}

// toggle the dropdown menu (force: true to open, false to close)
function toggleDropdown(force) {
  const isOpen = document
    .getElementById("dropdown")
    .classList.toggle("open", force);
  document
    .getElementById("hamburger")
    .setAttribute("aria-expanded", String(isOpen));
}

// initialize the swiper
function initSwiper(suffix) {
  new Swiper(".swiper-" + suffix, {
    loop: true,
    centeredSlides: true,
    spaceBetween: 50,

    keyboard: {
      enabled: true,
    },

    pagination: {
      el: ".swiper-pagination-" + suffix,
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next-" + suffix,
      prevEl: ".swiper-button-prev-" + suffix,
    },
  });
}

// scroll to a section
// The sections are sticky: their position is only reliable when measured
// from the top of the page, hence the scroll to 0 first.
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  window.scrollTo({ top: 0, behavior: "instant" });
  const yValue =
    section.getBoundingClientRect().top -
    parseFloat(getComputedStyle(section).scrollMarginTop);
  window.scrollTo({ top: yValue, behavior: "instant" });
}

// update the dynamic texts
function updateDynamicTexts() {
  const diff = new Date(Date.now() - new Date("2004-03-22"));
  const age = Math.abs(diff.getUTCFullYear() - 1970);
  document.querySelectorAll(".age").forEach((element) => {
    element.textContent = age;
  });
  document.getElementById("copyright").textContent = new Date().getFullYear();
}

// (re)start the tag clouds, sized to fit their cell
function startTagClouds() {
  // side by side, each cloud can use the screen height; stacked, only half of it
  const grid = document.querySelector("#skills-passions .grid");
  const stacked =
    getComputedStyle(grid).gridTemplateColumns.split(" ").length === 1;
  const radii = Object.keys(TAG_CLOUDS).map((selector) => {
    const box = document.querySelector(selector).parentElement;
    const fontSize = parseFloat(getComputedStyle(box).fontSize);
    // leave room for the longest word on both sides of the sphere
    const radius = Math.min(
      box.clientWidth / 2 - 4 * fontSize,
      window.innerHeight * (stacked ? 0.15 : 0.28)
    );
    return Math.round(Math.max(radius, 90));
  });

  // nothing to do if neither the size (e.g. mobile address bar) nor the
  // language changed
  const lang = document.documentElement.lang;
  if (
    tagClouds.length &&
    tagCloudsLanguage === lang &&
    tagClouds.every((cloud, i) => cloud.config.radius === radii[i])
  ) {
    return;
  }

  tagClouds.forEach((cloud) => {
    cloud.pause();
    cloud.destroy();
  });
  tagCloudsLanguage = lang;
  tagClouds = Object.entries(TAG_CLOUDS).map(([selector, texts], i) =>
    TagCloud(selector, texts[lang], {
      radius: radii[i],
      maxSpeed: "slow",
      initSpeed: "slow",
      itemClass: "tag",
    })
  );
}
