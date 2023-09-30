setInterval(updateClock, 100);

//on page load
document.addEventListener('DOMContentLoaded', function () {
  // initialize swipers
  initSwiper('edu');
  initSwiper('perso');

  // set the saved theme
  setSavedTheme();

  // update projects links based on the device
  updateProjectsLinks();

  // Add scroll events
  window.addEventListener('scroll', function () {
    resizeHeader();
    refreshProgressBar();
  });

  // Add click events
  document.getElementById('hamburger').addEventListener('click', function () {
    toggleDropdown();
  });
  document.querySelectorAll('.menu-item-about').forEach(item => {
    item.addEventListener('click', function () {
      scrollToSection('about');
    });
  });
  document.querySelectorAll('.menu-item-projects').forEach(item => {
    item.addEventListener('click', function () {
      scrollToSection('projects-perso');
    });
  });
  document.querySelectorAll('.menu-item-contact').forEach(item => {
    item.addEventListener('click', function () {
      scrollToSection('contact');
    });
  });
  document.querySelectorAll('.menu-item-dropdown').forEach(item => {
    item.addEventListener('click', function () {
      toggleDropdown();
    });
  });
  document.getElementById('theme-checkbox').addEventListener('click', function () {
    toggleTheme();
  });
  document.querySelectorAll('.link-projects-perso').forEach(item => {
    item.addEventListener('click', function () {
      scrollToSection('projects-perso');
    });
  });
  document.querySelectorAll('.link-projects-edu').forEach(item => {
    item.addEventListener('click', function () {
      scrollToSection('projects-edu');
    });
  });
});

// handle the resize event for the header
function resizeHeader() {
  let header = document.getElementById("header")
  let toggle = document.getElementById("toggle-switch")
  let scrollTreshold = 50;
  let scrollValue = window.scrollY || document.documentElement.scrollTop;
  if (scrollValue > scrollTreshold) {
    header.classList.add('small-header');
    toggle.classList.add('small-toggle');
  } else {
    header.classList.remove('small-header');
    toggle.classList.remove('small-toggle');
  }
}

// set the theme based on the saved theme
function setSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeCheckbox = document.getElementById('theme-checkbox');
  if (savedTheme) {
    if (savedTheme==='light-theme') {
      themeCheckbox.click();
      toggleTheme();
    }
  }
}

// toggle the theme
function toggleTheme() {
  let body = document.querySelector('body');
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
  localStorage.setItem('theme', body.classList);
}

// update the clock
function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = " : " + minutes;
  document.getElementById("seconds").innerHTML = " : " + seconds;
}

// toggle the dropdown menu
function toggleDropdown() {
  let dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// initialize the swiper
function initSwiper(suffix) {
  const swiper = new Swiper('.swiper-'+suffix, {
    loop: true,
    slidePerView: 1,
    centeredSlides: true,
    spaceBetween: 50,

    keyboard : {
      enabled: true,
      onlyInViewport: false,
    },

    pagination: {
      el: '.swiper-pagination-'+suffix,
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next-'+suffix,
      prevEl: '.swiper-button-prev-'+suffix,
    },
  });
}

// scroll to a section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  window.scrollTo(0,0,behavior='instant');
  const yValue = section.getBoundingClientRect().top + window.scrollY - 50;
  window.scrollTo({
    top: yValue,
    behavior: 'instant'
  });
}

// refresh the progress bar
function refreshProgressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}

// update projects links
function updateProjectsLinks() {
  const links = document.querySelectorAll('.project-link .link');
  console.log(links);
  var mediaQuery = window.matchMedia('(max-width: 767px)');

  if (mediaQuery.matches) {
    console.log('mobile');
    links.forEach(link => {
      link.innerHTML = 'Lien Github';
    });
  }
}