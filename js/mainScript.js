let currentIndex = 0;

const carouselElem = document.querySelector(".carousel-container");
const imageElems = document.querySelectorAll(".carousel-container img");
const previousBtnElem = document.querySelector(".btn-prev");
const nextBtnElem = document.querySelector(".btn-next");
const indicatorsContainer = document.getElementById("carousel-indicators");

// Create indicators
imageElems.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  indicatorsContainer.appendChild(dot);
});

function updateIndicators(index) {
  const dots = document.querySelectorAll(".carousel-indicators .dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function displayImage(carouselElem, imageElems, newIndex, direction) {
  const lastIndex = imageElems.length - 1;

  if (newIndex < 0) {
    newIndex = lastIndex;
    const imageWidth = imageElems[0].clientWidth;
    carouselElem.scrollBy({
      left: 2 * imageWidth * -direction,
      behavior: "smooth",
    });
  } else if (newIndex > lastIndex) {
    newIndex = 0;
    const imageWidth = imageElems[0].clientWidth;
    carouselElem.scrollBy({
      left: 2 * imageWidth * -direction,
      behavior: "smooth",
    });
  } else {
    const imageWidth = imageElems[0].clientWidth;
    carouselElem.scrollBy({ left: imageWidth * direction, behavior: "smooth" });
  }

  currentIndex = newIndex;
  updateIndicators(currentIndex);
}

previousBtnElem.addEventListener("click", () =>
  displayImage(carouselElem, imageElems, currentIndex - 1, -1)
);
nextBtnElem.addEventListener("click", () =>
  displayImage(carouselElem, imageElems, currentIndex + 1, 1)
);

setInterval(() => {
  nextBtnElem.click();
}, 3000);

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.querySelectorAll(".carousel-image");
//   //   let dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
//   //   for (i = 0; i < dots.length; i++) {
//   //     dots[i].className = dots[i].className.replace(" active", "");
//   //   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }
