// import { resetCart } from './detailScript';
let total;
let quantity = 1;
let price = 129;
let shipping = 30;
const emsBtn = document.querySelector('.viaEms');
const staffBtn = document.querySelector('.viaStaff');
const totalPrice = document.getElementById('total');



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
  document.getElementById('cart-quantity').textContent = quantity;
  updateTotal();
}

function updateTotal() {
  let supportAmount = parseFloat(document.getElementById('support').value) || 0;
  let total = quantity * price + shipping + supportAmount;
  document.getElementById('total').textContent = `${total}฿`;
}

function goHome() {
  window.location.href = 'main.html';
}

function continueShopping() {
  window.location.href = 'main.html'; // Change to your home page
}

function confirmOrder() {
  window.location.href = 'payment.html'
  resetCart();
}

function resetCart() {
  document.getElementById('total').textContent = `0฿`;
}

document.querySelector('.confirming').addEventListener('click', confirmOrder)

function handleClick(clickedBtn, otherBtn) {
  clickedBtn.classList.add('beingClicked');
  otherBtn.classList.remove('beingClicked');
}

emsBtn.addEventListener('click', () => {
  handleClick(emsBtn, staffBtn);
});

staffBtn.addEventListener('click', () => {
  handleClick(staffBtn, emsBtn);
});

document.querySelector('.continueShop').addEventListener('click', goHome)
document.querySelector('.btn-back').addEventListener('click', goHome)
// const LIFF_ID = 'YOUR_LIFF_ID'; // Replace with your actual LIFF ID

// async function initLiff() {
//   try {
//     await liff.init({ liffId: LIFF_ID });

//     // Setup button listener after LIFF is ready
//     document
//       .getElementById('confirmBtn')
//       .addEventListener('click', async () => {
//         const price = 199;

//         if (liff.isInClient()) {
//           await liff.sendMessages([
//             {
//               type: 'text',
//               text: `Order confirmed ✅\nTotal: ฿${price}`,
//             },
//           ]);
//         }

//         liff.closeWindow();
//       });
//   } catch (err) {
//     console.error('LIFF init failed', err);
//   }
// }
