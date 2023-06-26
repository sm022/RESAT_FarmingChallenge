document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const wrapper = document.querySelector(".carousel-wrapper");
  const prevArrow = document.querySelector(".arrow.left");
  const nextArrow = document.querySelector(".arrow.right");

  const slideWidth = carousel.clientWidth;
  let currentSlide = 0;

  function slideToSlide(index) {
    carousel.style.transform = `translateX(-${index * slideWidth}px)`;
    currentSlide = index;
  }

  function slideNext() {
    if (currentSlide === carousel.children.length - 1) {
      slideToSlide(0);
    } else {
      slideToSlide(currentSlide + 1);
    }
  }

  function slidePrev() {
    if (currentSlide === 0) {
      slideToSlide(carousel.children.length - 1);
    } else {
      slideToSlide(currentSlide - 1);
    }
  }

  nextArrow.addEventListener("click", slideNext);
  prevArrow.addEventListener("click", slidePrev);
});
