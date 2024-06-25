(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

// Text animation using anime.js
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i + 1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  var closeBtn = document.querySelectorAll(".close"),
  card = document.querySelectorAll(".card"),
  btnActions = document.querySelectorAll(".btn");

closeBtn.forEach(function(el) {
el.addEventListener("click", closeCard);
});

card.forEach(function(el) {
el.addEventListener("click", openCard);
});

btnActions.forEach(function(el) {
el.addEventListener("click", clickBtn);
});

function closeCard(event) {
event.stopPropagation();
event.target.closest(".card").classList.add("closed");

}

function openCard(event) {
if (event.currentTarget.classList.contains("closed")) {
  event.currentTarget.classList.remove("closed");
} 
}

function clickBtn(event) {
if (event.currentTarget.classList.contains("clicked")) {
  event.currentTarget.classList.remove("clicked");
} else {
  event.currentTarget.classList.add("clicked");
}
}
