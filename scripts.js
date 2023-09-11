setInterval(updateClock, 100);

document.addEventListener('DOMContentLoaded', function () {
  initSwiper();
  setSavedTheme();
  window.addEventListener('scroll', function () {
    resizeHeader();
    refreshProgressBar();
  });
});

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

function toggleDropdown() {
  let dropdown = document.getElementById("dropdown");
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
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}