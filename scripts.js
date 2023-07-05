enableScrollListener();
setInterval(updateClock, 100);

function resizeHeader() {
  var header = document.getElementById("header")
  var toggle= document.getElementById("toggle-switch")
  var slider = document.getElementById("slider")
  var scrollTreshold = 50;
  var scrollValue = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollValue > scrollTreshold || scrollValue > scrollTreshold) { 
    header.classList.add('small-header');
    toggle.classList.add('small-toggle');
    slider.classList.add('small-slider');
  } else{
    header.classList.remove('small-header');
    toggle.classList.remove('small-toggle');
    slider.classList.remove('small-slider');
  }
}

function enableScrollListener() {
  window.addEventListener('scroll', function() {resizeHeader()});
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

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
