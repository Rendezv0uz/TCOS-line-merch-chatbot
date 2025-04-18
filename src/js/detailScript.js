// import { total } from './cartScript';
// const decreaseQuantityBtn = document.getElementById('.decrease-quantity-btn');
// const increaseQuantityBtn = document.getElementById('.increase-quantity-btn');
// const { response } = require('express');
// const fs = require('fs');
// const http = require('http');
// const replaceModule = require('../module/replaceInfo.js');

let product;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // Fetch the product data
  fetch('/data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      product = data.find((item) => item.id === id);

      if (product) {
        if (product.requireSize) {
          const tshirtSizeDiv = document.createElement('div');
          tshirtSizeDiv.className = 'tshirtSize';
          tshirtSizeDiv.innerHTML = `
            <img src="../assets/realproduct/tshirt/shirtsize.svg">
              <select id="sizeSelection" name="size-select">
                <option class="size" value="S">S</option>
                <option class="size" value="M">M</option>
                <option class="size" value="L">L</option>
                <option class="size" value="XL">XL</option>
                <option class="size" value="XXL">XXL</option>
                <option class="size" value="XXXL">3XL</option>
              </select>
          `;
          const wrapper = document.querySelector('.wrapper-withoutLine');
          const secondCartWrapper =
            wrapper.querySelectorAll('.cartAmountWrapper')[1];
          wrapper.insertBefore(tshirtSizeDiv, secondCartWrapper);
        }
        document.querySelector('.name').textContent = product.productName;
        document.querySelector('.price').textContent = `฿${product.price}`;
        document.querySelector('.description').textContent =
          product.description;
        document.getElementById('imageProduct').src = product.imageFinal;
        // document.querySelector('.image-1').src = product.imageTopLeftSrc;
        // document.querySelector('.image-2').src = product.imageTopRightSrc;
        // document.querySelector('.image-3').src = product.imageBottomRightSrc;
        // for (let i = 1; i <= 6; i++) {
        //   const imageElement = document.getElementById(`slide${i}`);
        //   const imageSrc = product.imageSlides[i - 1];
        //   if (imageElement && imageSrc) {
        //     imageElement.src = imageSrc;
        //   }
        // }
      }
      // else {
      //   console.error('Product not found with ID:', id);
      // }
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
      document.querySelector('.description').textContent =
        'Error loading product details.';
    });
});

function goHome() {
  window.location.href = 'main.html';
}

//quantity Part

let defaultCart = {
  umbrella: 0,
  blanket: 0,
  cardholder: 0,
  keychains: 0,
  bandanas: 0,
  tshirt: {
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
    XXXL: 0,
  },
};

let quantity = 1;
let size = null;
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : structuredClone(defaultCart);
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateProductAmount(productId, size = null, newAmount) {
  const cart = getCart();
  if (size) {
    //tshirt
    if (!cart[productId]) cart[productId] = {}; //productId = tshirt here
    if (!cart[productId][size]) cart[productId][size] = 0;
    cart[productId][size] += newAmount;
  } else {
    //not tshirt
    if (!cart[productId]) cart[productId] = 0;
    cart[productId] += newAmount;
  }
  saveCart(cart);
}

function resetCart() {
  quantity = 1;
  // document.querySelector('.amount-afterclick').textContent = String(quantity).padStart(2,'0')
  updateCart();
}

function updateCart() {
  document.querySelector('.amount-afterclick').textContent = String(
    quantity
  ).padStart(2, '0');
  // updateTotal();
}

function increaseQuantity() {
  quantity++;
  updateCart();
  disableButtonTemporarily(document.querySelector('.plus'));
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    updateCart();
    disableButtonTemporarily(document.querySelector('.minus'));
  }
}

function disableButtonTemporarily(button) {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 200); // Disable the button for x second
}

document.querySelector('.plus').addEventListener('click', () => {
  setTimeout(() => {
    increaseQuantity();
  }, 300);
});

document.querySelector('.minus').addEventListener('click', () => {
  setTimeout(() => {
    decreaseQuantity();
  }, 300);
});

document.getElementById('addToBasketButton').addEventListener('click', () => {
  setTimeout(() => {
    const sizeSelect = document.getElementById('sizeSelection');
    const size = sizeSelect ? sizeSelect.value : null;
    updateProductAmount(product.id, size, quantity);
    resetCart();
    goHome();
  }, 300);
});

document.getElementById('resetButton').addEventListener('click', () => {
  setTimeout(() => {
    resetCart();
  }, 300);
});
//go back button
document.querySelector('.btn-back').addEventListener('click', goHome);

//export

/*

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.scroll-image .auto-slide');
  let currentIndex = 0;
  const totalImages = images.length;

  function showNextImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].classList.add('active');
  }

  // Show the first image
  images[currentIndex].classList.add('active');

  // Loop every 3 seconds
  setInterval(showNextImage, 3000);

  // Quantity buttons
});

document
  .querySelector('.decrease-quantity-btn')
  ?.addEventListener('click', decreaseQuantity);
document
  .querySelector('.increase-quantity-btn')
  ?.addEventListener('click', increaseQuantity);
*/

// export
// Carousel

// let currentIndex = 0;

// const carouselElem = document.querySelector('.carousel-container');
// const imageElems = document.querySelectorAll('.carousel-container img');
// const previousBtnElem = document.querySelector('.btn-prev');
// const nextBtnElem = document.querySelector('.btn-next');
// const indicatorsContainer = document.getElementById("carousel-indicators");

// // Create indicators
// imageElems.forEach((_, i) => {
//   const dot = document.createElement("span");
//   dot.classList.add("dot");
//   if (i === 0) dot.classList.add("active");
//   indicatorsContainer.appendChild(dot);
// });

// function updateIndicators(index) {
//   const dots = document.querySelectorAll(".carousel-indicators .dot");
//   dots.forEach((dot, i) => {
//     dot.classList.toggle("active", i === index);
//   });
// }

// function displayImage(carouselElem, imageElems, newIndex, direction) {
//   const lastIndex = imageElems.length - 1;

//   // ตรวจสอบว่ากดข้ามขอบหรือไม่
//   if (newIndex < 0) {
//     newIndex = lastIndex;
//     const imageWidth = imageElems[0].clientWidth;
//     carouselElem.scrollBy({ left: 2 * imageWidth * -direction, behavior: 'smooth' });
//   } else if (newIndex > lastIndex) {
//     newIndex = 0;
//     const imageWidth = imageElems[0].clientWidth;
//     carouselElem.scrollBy({ left: 2 * imageWidth * -direction, behavior: 'smooth' });
//   } else {
//     const imageWidth = imageElems[0].clientWidth;
//     carouselElem.scrollBy({ left: imageWidth * direction, behavior: 'smooth' });
//   }

//   currentIndex = newIndex;
//   updateIndicators(currentIndex);
// }

// previousBtnElem.addEventListener('click', () => displayImage(carouselElem, imageElems, currentIndex - 1, -1));
// nextBtnElem.addEventListener('click', () => displayImage(carouselElem, imageElems, currentIndex + 1, 1));
