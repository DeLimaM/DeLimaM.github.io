//on page load
document.addEventListener("DOMContentLoaded", function () {
  // initialize swipers
  initSwiper("edu");
  initSwiper("perso");

  // set the saved theme
  setSavedTheme();

  // update projects links based on the device
  updateProjectsLinks();

  // update dynamic texts
  updateDynamicTexts();

  // Add transition to colored elements
  addTransitionToColoredElements();

  // Add scroll events
  window.addEventListener("scroll", function () {
    resizeHeader();
    refreshProgressBar();
  });
  refreshProgressBar();

  // Start the tag cloud
  startTagCloud();

  // Add click events
  document.getElementById("hamburger").addEventListener("click", function () {
    toggleDropdown();
  });
  document.querySelectorAll(".menu-item-about").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("about");
    });
  });
  document.querySelectorAll(".menu-item-projects").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("projects-perso");
    });
  });
  document.querySelectorAll(".menu-item-contact").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("contact");
    });
  });
  document.querySelectorAll(".menu-item-dropdown").forEach((item) => {
    item.addEventListener("click", function () {
      toggleDropdown();
    });
  });
  document
    .getElementById("theme-checkbox")
    .addEventListener("click", function () {
      toggleTheme();
    });
  document.querySelectorAll(".link-projects-perso").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("projects-perso");
    });
  });
  document.querySelectorAll(".link-projects-edu").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("projects-edu");
    });
  });
  document.querySelectorAll(".link-about").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("about");
    });
  });
  document.querySelectorAll(".link-experience").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("experience");
    });
  });
  document.querySelectorAll(".link-skills-passions").forEach((item) => {
    item.addEventListener("click", function () {
      scrollToSection("skills-passions");
    });
  });

  const numberOfSections = document.querySelectorAll("section").length - 1;
});

// handle the resize event for the header
function resizeHeader() {
  let header = document.getElementById("header");
  let toggle = document.getElementById("toggle-switch");
  let scrollTreshold = 50;
  let scrollValue = window.scrollY || document.documentElement.scrollTop;
  if (scrollValue > scrollTreshold) {
    header.classList.add("small-header");
    toggle.classList.add("small-toggle");
  } else {
    header.classList.remove("small-header");
    toggle.classList.remove("small-toggle");
  }
}

// set the theme based on the saved theme
function setSavedTheme() {
  let body = document.querySelector("body");
  let savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList = savedTheme;
  }
  document.getElementById("theme-checkbox").checked =
    body.classList.contains("light-theme");
}

// toggle the theme
function toggleTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  }
  localStorage.setItem("theme", body.classList);
}

// toggle the dropdown menu
function toggleDropdown() {
  let dropdown = document.getElementById("dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// initialize the swiper
function initSwiper(suffix) {
  const swiper = new Swiper(".swiper-" + suffix, {
    loop: true,
    slidePerView: 1,
    centeredSlides: true,
    spaceBetween: 50,

    keyboard: {
      enabled: true,
      onlyInViewport: false,
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
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  window.scrollTo(0, 0, (behavior = "instant"));
  const yValue =
    section.getBoundingClientRect().top +
    window.scrollY -
    (6 * window.innerHeight) / 100;
  window.scrollTo({
    top: yValue,
    behavior: "instant",
  });
}

// refresh the progress bar
function refreshProgressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  let percentagePerSection =
    100 / Math.max(document.querySelectorAll("section").length - 1, 1);
  let progressInterval =
    Math.round(scrolled / percentagePerSection) * percentagePerSection;
  document.getElementById("progress-bar").style.width = progressInterval + "%";
}

// update projects links
function updateProjectsLinks() {
  const links = document.querySelectorAll(".project-link .link");
  var mediaQuery = window.matchMedia("(max-width: 767px)");

  if (mediaQuery.matches) {
    links.forEach((link) => {
      link.innerHTML = "Lien Github";
    });
  }
}

// update the .dynamic class texts
function updateDynamicTexts() {
  // update the age
  const ageText = document.getElementById("age");
  const diff = new Date(Date.now() - new Date("2004-03-22"));
  ageText.innerHTML = Math.abs(diff.getUTCFullYear() - 1970);

  // update the copyright footer
  const yearText = document.getElementById("copyright");
  yearText.innerHTML = new Date().getFullYear();
}

// Add transition to colored elements
function addTransitionToColoredElements() {
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    const styles = window.getComputedStyle(element);

    // check if any of the color-related properties are not the default
    if (
      styles.color !== "rgb(0, 0, 0)" ||
      styles.backgroundColor !== "rgba(0, 0, 0, 0)" ||
      styles.borderColor !== "rgba(0, 0, 0, 0)"
    ) {
      // add transition without overwriting the existing ones
      element.style.transition = "all 0.3s ease-in-out";
    }
  });
}

// Start the tag cloud
function startTagCloud() {
  var options = {
    radius: 200,
    maxSpeed: "slow",
    initSpeed: "slow",
    itemClass: "tag",
  };

  var container = ".tag-cloud#skills";
  var texts = [
    "Autonomie",
    "Curiosité",
    "Investissement",
    "Esprit d'équipe",
    "Créativité",
  ];
  TagCloud(container, texts, options);

  var container = ".tag-cloud#passions";
  var texts = [
    "Sciences",
    "Technologie",
    "Hardware",
    "Jeux Vidéos",
    "Cinéma",
    "Spatial",
    "Data",
    "Développement Web",
  ];
  TagCloud(container, texts, options);
}
