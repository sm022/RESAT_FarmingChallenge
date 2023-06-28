document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".happyfolio-banner-slider");

  let slideWidth = 0;
  let currentSlide = 0;

  function slideToSlide(index) {
    const slideWrapper = carousel.querySelector(".swiper-wrapper");
    const slides = slideWrapper.querySelectorAll(".swiper-slide");
    slides.forEach(function(slide) {
      const hiddenTitle = slide.querySelector(".hidden-title");
      const imageTag = hiddenTitle.querySelector("img");
      slide.style.transform = `translateX(-${index * slideWidth}px)`;
      if (imageTag) {
        const imageSrc = imageTag.getAttribute("src");
        const imageAlt = imageTag.getAttribute("alt");
        hiddenTitle.innerHTML = `<img src="${imageSrc}" alt="${imageAlt}">`;
      }
    });
    currentSlide = index;
  }

  function slideNext() {
    const slideWrapper = carousel.querySelector(".swiper-wrapper");
    const slides = slideWrapper.querySelectorAll(".swiper-slide");
    if (currentSlide === slides.length - 1) {
      slideToSlide(0);
    } else {
      slideToSlide(currentSlide + 1);
    }
  }

  function slidePrev() {
    const slideWrapper = carousel.querySelector(".swiper-wrapper");
    const slides = slideWrapper.querySelectorAll(".swiper-slide");
    if (currentSlide === 0) {
      slideToSlide(slides.length - 1);
    } else {
      slideToSlide(currentSlide - 1);
    }
  }

  function setSlideWidth() {
    const slideWrapper = carousel.querySelector(".swiper-wrapper");
    const slides = slideWrapper.querySelectorAll(".swiper-slide");
    slideWidth = slides[0].offsetWidth;
    slideToSlide(currentSlide);
  }

  const prevButton = carousel.querySelector(".swiper-button-prev");
  const nextButton = carousel.querySelector(".swiper-button-next");
  prevButton.addEventListener("click", slidePrev);
  nextButton.addEventListener("click", slideNext);

  window.addEventListener("load", setSlideWidth);
});
