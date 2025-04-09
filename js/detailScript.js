import { total } from './cartScript';
const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
const decreaseQuantityBtn = document.getElementById('.decrease-quantity-btn');
const increaseQuantityBtn = document.getElementById('.increase-quantity-btn');
// TODO: fetch product detail from backend using id variable
const product = {
  name: 'Item Name',
  description: 'testttttttttttttttttttttt',
  imageUrl: '',
  price: '129',
};
const productDetail = document.getElementById('product-details');
const totalPrice = document.getElementById('total');

function setUpProductDetail() {
  productDetail.children[0].innerHTML = product.name;
  productDetail.children[1].innerHTML = `฿${product.price}`;
  productDetail.children[2].innerHTML = product.description;
  totalPrice.innerHTML = `฿${product.price}`;
}

let quantity = 1;

function increaseQuantity() {
  quantity++;
  updateCart();
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    updateCart();
  }
}

function updateCart() {
  document.getElementById('quantity').textContent = quantity;
  updateTotal();
}

function updateTotal() {
  let total = quantity * product.price;
  document.getElementById('total').textContent = `฿${total}`;
}

function renderQuantity() {
  document.getElementById('quantity').innerHTML = quantity;
}

function goBack() {
  window.history.back();
}

setUpProductDetail();
renderQuantity();

document.querySelector('.reset-btn').addEventListener('click', resetCart());

export function resetCart() {
  total = 0;
}

document.addEventListener('DOMContentLoaded', () => {
  decreaseQuantityBtn.addEventListener('click', decreaseQuantity);
  increaseQuantityBtn.addEventListener('click', increaseQuantity);
});

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
