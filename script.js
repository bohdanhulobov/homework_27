document.addEventListener("DOMContentLoaded", () => {
  const imagePaths = [
    "media/1.jpg",
    "media/2.png",
    "media/3.jpg",
    "media/4.webp",
    "media/5.jpg",
    "media/6.jpg",
    "media/7.jpg",
    "media/8.jpg",
    "media/9.png",
  ];

  const slidesContainer = document.querySelector(".slides");

  function createSlides() {
    imagePaths.forEach((path, index) => {
      const slide = document.createElement("div");

      slide.classList.add("slide");

      const img = document.createElement("img");

      img.src = path;
      img.alt = `Slide ${index + 1}`;

      slide.appendChild(img);
      slidesContainer.appendChild(slide);
    });
  }

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const pausePlayButton = document.querySelector(".pause-play");
  const indicatorsContainer = document.querySelector(".indicators");

  let currentIndex = 0;
  let intervalId;
  let isPaused = false;
  let touchStartX = null;

  function createIndicators(imagePaths) {
    imagePaths.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");

      if (index === 0) indicator.classList.add("active");

      indicator.addEventListener("click", () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateIndicators() {
    document.querySelectorAll(".indicator").forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    updateIndicators();
    resetAutoSlide();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
    goToSlide(currentIndex);
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 3000);
  }

  function pauseAutoSlide() {
    clearInterval(intervalId);
  }

  function resetAutoSlide() {
    if (!isPaused) {
      pauseAutoSlide();
      startAutoSlide();
    }
  }

  function togglePausePlay() {
    if (isPaused) {
      startAutoSlide();
      pausePlayButton.textContent = "Pause";
    } else {
      pauseAutoSlide();
      pausePlayButton.textContent = "Play";
    }
    isPaused = !isPaused;
  }

  function handleKeydown(event) {
    if (event.key === "ArrowRight") nextSlide();
    if (event.key === "ArrowLeft") prevSlide();
    resetAutoSlide();
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    if (!touchStartX) return;
    const touchEndX = event.touches[0].clientX;
    const touchDiff = touchStartX - touchEndX;
    if (touchDiff > 50) {
      nextSlide();
      touchStartX = null;
    } else if (touchDiff < -50) {
      prevSlide();
      touchStartX = null;
    }
    resetAutoSlide();
  }

  createSlides();
  createIndicators(imagePaths);
  startAutoSlide();

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
  pausePlayButton.addEventListener("click", togglePausePlay);

  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
});
