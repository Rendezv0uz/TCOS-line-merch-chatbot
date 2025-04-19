let currentIndex = 0;

const carouselElem = document.querySelector('.carousel-container');
const imageElems = document.querySelectorAll('.carousel-image');
// const previousBtnElem = document.querySelector('.btn-prev');
const nextBtnElem = document.querySelector('.btn-next');
const indicatorsContainer = document.getElementById('carousel-indicators');
const imageBox2 = document.querySelector('.box2');
const imageBox = document.querySelectorAll('.box');

// imageBox2.addEventListener('click', () => {
//   alert('Image Box 2 clicked!');
// });

// imageBox.forEach((box) => {
//   box.addEventListener('click', () => {
//     alert('Image Box clicked!');
//   });
// });

// Create indicators
imageElems.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  indicatorsContainer.appendChild(dot);
});

function updateIndicators(index) {
  const dots = document.querySelectorAll('.carousel-indicators .dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

/*function displayImage(carouselElem, imageElems, newIndex, direction) {
  const lastIndex = imageElems.length - 1;

  if (newIndex < 0) {
    newIndex = lastIndex;
    const imageWidth = imageElems[0].clientWidth;
    carouselElem.scrollBy({
      left: 2 * imageWidth * -direction,
      behavior: 'smooth',
    });
  } else if (newIndex > lastIndex) {
    newIndex = 0;
    const imageWidth = imageElems[0].clientWidth;
    carouselElem.scrollBy({
      left: 2 * imageWidth * -direction,
      behavior: 'smooth',
    });
  } else {
    const imageWidth = imageElems[0].clientWidth;
    carouselElem.scrollBy({ left: imageWidth * direction, behavior: 'smooth' });
  }

  currentIndex = newIndex;
  updateIndicators(currentIndex);
}*/

function displayImage(imageElems, newIndex) {
  const lastIndex = imageElems.length - 1;
  if (newIndex < 0) {
    currentIndex = lastIndex;
  } else if (newIndex > lastIndex) {
    currentIndex = 0;
  } else {
    currentIndex = newIndex;
  }

  imageElems.forEach((img, i) => {
    img.classList.remove('active');
  });

  // Apply active class to the current image and fade in
  imageElems[currentIndex].classList.add('active');

  updateIndicators(currentIndex);
}

// previousBtnElem.addEventListener('click', () =>
//   displayImage(imageElems, currentIndex - 1)
// );
nextBtnElem.addEventListener('click', () =>
  displayImage(imageElems, currentIndex + 1)
);
nextBtnElem.click(); // Trigger the click event to show the first image
setInterval(() => {
  nextBtnElem.click();
}, 5000);

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
