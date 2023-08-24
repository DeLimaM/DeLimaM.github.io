setInterval(updateClock, 100);
let sections;
let menuItems;

document.addEventListener('DOMContentLoaded', function () {
  initSwiper();
  sections = document.querySelectorAll('.tracked-section');
  menuItems = document.querySelectorAll('.menu-item');
  enableScrollListener();
});

function updateTrackedSections() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (sectionTop <= window.pageYOffset + 50 && sectionTop + sectionHeight > window.pageYOffset + 50) {
      current = section.getAttribute('id');
    }
  });
  menuItems.forEach(item => {
    item.classList.remove('active');
    if (item.classList.contains(current)) {
      item.classList.add('active');
    }
  });
}

function resizeHeader() {
  var header = document.getElementById("header")
  var toggle = document.getElementById("toggle-switch")
  var scrollTreshold = 50;
  var scrollValue = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollValue > scrollTreshold) {
    header.classList.add('small-header');
    toggle.classList.add('small-toggle');
  } else {
    header.classList.remove('small-header');
    toggle.classList.remove('small-toggle');
  }
}

function enableScrollListener() {
  window.addEventListener('scroll', function () { 
    resizeHeader();
    updateTrackedSections();
  });
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

    autoplay: {
      delay: 5000,
    },

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

function scrollToYPosition(yPosition) {
  window.scrollTo(0, yPosition);
}