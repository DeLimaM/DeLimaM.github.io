setInterval(updateClock, 100);
let sections;

document.addEventListener('DOMContentLoaded', function () {
  initSwiper();
  setSavedTheme();
  sections = document.querySelectorAll('.tracked-section');
  window.addEventListener('scroll', function () {
    resizeHeader();
    refreshProgressBar();
  });
});

function resizeHeader() {
  var header = document.getElementById("header")
  var toggle = document.getElementById("toggle-switch")
  var scrollTreshold = 50;
  var scrollValue = window.scrollY || document.documentElement.scrollTop;
  if (scrollValue > scrollTreshold) {
    header.classList.add('small-header');
    toggle.classList.add('small-toggle');
  } else {
    header.classList.remove('small-header');
    toggle.classList.remove('small-toggle');
  }
}

function setSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeCheckbox = document.getElementById('theme-checkbox');
  if (savedTheme) {
    if (savedTheme==='light-theme') {
      themeCheckbox.click();
    }
  }
}

function toggleTheme() {
  var body = document.querySelector('body');
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
  localStorage.setItem('theme', body.classList);
}

function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = " : " + minutes;
  document.getElementById("seconds").innerHTML = " : " + seconds;
}

function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidePerView: 1,
    centeredSlides: true,
    spaceBetween: 50,

    keyboard : {
      enabled: true,
      onlyInViewport: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  window.scrollTo(0,0,behavior='instant');
  const yValue = section.getBoundingClientRect().top + window.scrollY - 50;
  window.scrollTo({
    top: yValue,
    behavior: 'instant'
  });
}

function refreshProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}