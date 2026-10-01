const TAG_CLOUDS = {
  "#skills": [
    "Autonomie",
    "Curiosité",
    "Investissement",
    "Esprit d'équipe",
    "Créativité",
    "Compétences techniques",
    "Résolution de problèmes",
  ],
  "#passions": [
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
};

let tagClouds = [];

//on page load
document.addEventListener("DOMContentLoaded", function () {
  initSwiper("edu");
  initSwiper("perso");
  setSavedTheme();
  updateDynamicTexts();
  watchSectionHeights();
  startTagClouds();
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
  document.getElementById("age").textContent = Math.abs(
    diff.getUTCFullYear() - 1970
  );
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

  // nothing to do if the size did not change (e.g. mobile address bar)
  if (
    tagClouds.length &&
    tagClouds.every((cloud, i) => cloud.config.radius === radii[i])
  ) {
    return;
  }

  tagClouds.forEach((cloud) => {
    cloud.pause();
    cloud.destroy();
  });
  tagClouds = Object.entries(TAG_CLOUDS).map(([selector, texts], i) =>
    TagCloud(selector, texts, {
      radius: radii[i],
      maxSpeed: "slow",
      initSpeed: "slow",
      itemClass: "tag",
    })
  );
}
