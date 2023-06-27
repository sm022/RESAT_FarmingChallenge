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
  
  // 자동 슬라이드 기능 추가
  let timer = setInterval(slideNext, 2000); // 2초 간격으로 슬라이드
  
  // 마우스가 캐러셀 영역에 진입하면 타이머 정지, 이탈하면 다시 시작
  carousel.addEventListener("mouseenter", function() {
    clearInterval(timer);
  });
  
  carousel.addEventListener("mouseleave", function() {
    timer = setInterval(slideNext, 2000);
  });
});
