// set vars
const
  track = document.querySelector('.carousel__track'),
  slides = Array.from(track.children),
  nextButton = document.querySelector('.carousel__button--right'),
  prevButton = document.querySelector('.carousel__button--left'),
  dotsNav = document.querySelector('.carousel__nav'),
  dots = Array.from(dotsNav.children),
  slideSize = slides[0].getBoundingClientRect().width;

// arrange slides next to each other
// function to set slides at the proper left point
const setSlidePosition = (slide, index) => {
  slide.style.left = slideSize * index + 'px';
}
// apply above function to each slide
slides.forEach(setSlidePosition);

// function to move to the target slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

// function to hightlight the target dot
const updateDot = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

// function to hide/show nav
const navDisplay = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

// When click left, move slides to the left
prevButton.addEventListener('click', () => {
  // get current slide
  const
    currentSlide = track.querySelector('.current-slide'),
    prevSlide = currentSlide.previousElementSibling,
    currentDot = dotsNav.querySelector('.current-slide'),
    prevDot = currentDot.previousElementSibling,
    prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDot(currentDot, prevDot);
  navDisplay(slides, prevButton, nextButton, prevIndex);
});

// When click right, move slides to the right
nextButton.addEventListener('click', () => {
  // get current slide
  const
    currentSlide = track.querySelector('.current-slide'),
    nextSlide = currentSlide.nextElementSibling,
    currentDot = dotsNav.querySelector('.current-slide'),
    nextDot = currentDot.nextElementSibling,
    nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDot(currentDot, nextDot);
  navDisplay(slides, prevButton, nextButton, nextIndex);
});

// when click on nav indicator, move to that slide
dotsNav.addEventListener('click', e => {
  // what indicator was clicked on
  const targetDot = e.target.closest('.carousel__indicator');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide'),
    currentDot = dotsNav.querySelector('.current-slide'),
    targetIndex = dots.findIndex(dot => dot === targetDot),
    targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDot(currentDot, targetDot);
  navDisplay(slides, prevButton, nextButton, targetIndex);

});

/* Menu Background & Scroll Top */
const navWrapper = document.querySelector('.nav-wrapper'),
  scrollUp = document.querySelector('.scroll-top'),
  bigLogo = document.querySelector('.desktop-logo'),
  navBrand = document.querySelector('.navbar-brand');

window.addEventListener('resize', () => {
  if (window.innerWidth < 992) {
    bigLogo.style.display = "none";
  } else if (window.innerWidth >= 992 && window.scrollY === 0) {
    navWrapper.classList.remove('show');
    navBrand.classList.add('d-lg-none');
    bigLogo.style.display = "block";
  }
});

window.addEventListener('scroll', () => {
  if (window.innerWidth >= 992 && window.scrollY > 100) {
    scrollUp.classList.add('show');
    navWrapper.classList.add('show');
    bigLogo.style.display = "none";
    navBrand.classList.remove('d-lg-none');
  } else if (window.innerWidth >= 992 && window.scrollY < 100) {
    scrollUp.classList.remove('show');
    navWrapper.classList.remove('show');
    bigLogo.style.display = "block";
    navBrand.classList.add('d-lg-none');
  } else if (window.scrollY > 100) {
    scrollUp.classList.add('show');
  } else if (window.scrollY < 100) {
    scrollUp.classList.remove('show');
  }
});


/* special animation */
const staffWrapper = document.querySelector('.staff-wrapper');
const aboutUsStaff = document.querySelectorAll('.staff');
const winHeight = window.innerHeight;
const hydrafacialContent = document.querySelector('.hydrafacial-content');

window.addEventListener('scroll', () => {
  if (staffWrapper.getBoundingClientRect().top < winHeight / 1.2) {
    aboutUsStaff.forEach((staff, i) => {
      setTimeout(() => {
        staff.classList.add("show");
      }, i * 350);
    });
  } else {
    aboutUsStaff.forEach((staff, i) => {
      setTimeout(() => {
        staff.classList.remove("show");
      }, i * 350);
    });
  }

  if (hydrafacialContent.getBoundingClientRect().top < winHeight / 1) {
    hydrafacialContent.classList.add('show');
  } else {
    hydrafacialContent.classList.remove('show');
  }
});