let total = 0;
// let quantity = 1;
const defaultCart = {
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
let cart;
let priceDetail;
let price = 0;
let supportAmount = 0;
const emsBtn = document.querySelector('.viaEms');
const staffBtn = document.querySelector('.viaStaff');
const totalPrice = document.getElementById('total');

document.addEventListener('DOMContentLoaded', async () => {
  const storedCart = localStorage.getItem('cart');
  cart = storedCart ? JSON.parse(storedCart) : null;
  // console.log(cart);
  const priceFetch = await fetch('/data/data.json');
  const priceArray = await priceFetch.json();
  priceDetail = Object.fromEntries(priceArray.map((p) => [p.id, p]));
  // console.log(priceDetail)
  Object.entries(cart).forEach(([productId, quantityOrSize]) => {
    switch (productId) {
      case 'cardholder':
      case 'candanas':
      case 'keychains':
      case 'blanket':
      case 'umbrella':
        if (quantityOrSize > 0) {
          document.querySelector('.cart').insertAdjacentHTML(
            'afterbegin',
            `<img src="${
              priceDetail[productId].cartImageSrc
            }" id="supportMoney">
          <div class="blankPrice blankPriceMerch-${productId}">
          <div class="amount amountMerch-${productId}">X${cart[productId]}</div>
          <div class="priceOne priceMerch-${productId}">฿${
              priceDetail[productId].price * cart[productId]
            }</div>
          <div class="btn-group">
            <button class="increase-btn-template">+</button>
          <button class="decrease-btn-template">-</button>
          </div>
          <div class="line"></div>
        </div>`
          );
        }
        break;
      case 'tshirt':
        Object.entries(quantityOrSize).forEach(([size, quantityTshirt]) => {
          if (quantityTshirt > 0) {
            document.querySelector('.cart').insertAdjacentHTML(
              'afterbegin',
              `<div><img src="${
                priceDetail[productId].cartImageSrc
              }" alt="tshirt${size}" id="supportMoney">
                    <div class="blankPrice blankPriceMerch-tshirt">
                    <div class="amount amountMerch-${size}">X${quantityTshirt} <span id="shirtsize">(${size})</span></div>
                    
                    <div class="priceOne priceMerch-${size}">฿${
                priceDetail[productId].price * quantityTshirt
              }</div>
                    <div class="btn-group">
                      <button class="increase-btn-template">+</button>
                    <button class="decrease-btn-template">-</button>
                    </div>
                    
                    <div class="line"></div>
                  </div>`
            );
          }
        });
        break;

      default:
        console.warn(`Unknown product : ${productId}`);
    }
    //total
  });
});

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

function updateTotal() {
  let price = 0;
  let shippingCost = emsBtn.classList.contains('beingClicked') ? 60 : 0;

  // Count amounts of each product
  const productAmounts = {
    umbrella: 0,
    bandanas: 0,
    keychains: 0,
    cardholder: 0,
    blanket: 0,
    tshirt: 0,
  };

  // Calculate base price and count amounts
  Object.entries(cart).forEach(([productName, priceOrSize]) => {
    if (productName === 'tshirt') {
      Object.entries(priceOrSize).forEach(([size, amount]) => {
        if (amount > 0) {
          price += amount * priceDetail[productName].price;
          productAmounts.tshirt += amount;
        }
      });
    } else {
      if (priceOrSize > 0) {
        price += priceOrSize * priceDetail[productName].price;
        productAmounts[productName] = priceOrSize;
      }
    }
  });

  // Apply discounts in order of priority

  // 1. Full Set Discount (all 6 items)
  let fullSetCount = Math.min(
    productAmounts.umbrella,
    productAmounts.bandanas,
    productAmounts.keychains,
    productAmounts.cardholder,
    productAmounts.blanket,
    productAmounts.tshirt
  );
  if (fullSetCount > 0) {
    price -= fullSetCount * 75;
    // Subtract used items
    productAmounts.umbrella -= fullSetCount;
    productAmounts.bandanas -= fullSetCount;
    productAmounts.keychains -= fullSetCount;
    productAmounts.cardholder -= fullSetCount;
    productAmounts.blanket -= fullSetCount;
    productAmounts.tshirt -= fullSetCount;
  }

  // 2. Shirt + Umbrella Discount (฿9)
  let shirtUmbrellaCount = Math.min(
    productAmounts.tshirt,
    productAmounts.umbrella
  );
  if (shirtUmbrellaCount > 0) {
    price -= shirtUmbrellaCount * 9;
    productAmounts.tshirt -= shirtUmbrellaCount;
    productAmounts.umbrella -= shirtUmbrellaCount;
  }

  // 3. Cardholder + Keychains + Bandana Discount (฿18)
  let smallBundleCount = Math.min(
    productAmounts.cardholder,
    productAmounts.keychains,
    productAmounts.bandanas
  );
  if (smallBundleCount > 0) {
    price -= smallBundleCount * 18;
    productAmounts.cardholder -= smallBundleCount;
    productAmounts.keychains -= smallBundleCount;
    productAmounts.bandanas -= smallBundleCount;
  }

  total = supportAmount + shippingCost + price;
  document.getElementById('total').textContent = `${total}฿`;
}

function goHome() {
  window.location.href = '/';
}

function continueShopping() {
  window.location.href = '/'; // Change to your home page
}

const StringDefaultCart = JSON.stringify(defaultCart);
function confirmOrder() {
  if (!cart) return;
  if (JSON.stringify(cart) === StringDefaultCart) return;
  if (
    staffBtn.classList.contains('beingClicked') ||
    emsBtn.classList.contains('beingClicked')
  ) {
    window.location.href = 'payment.html';
  } else {
    return;
  }
}

/*
document.querySelector('.decrease-btn-template').addEventListener('click',()=>{
  updateTotal();
})

document.querySelector('.increase-btn-template').addEventListener('click',()=>{
  updateTotal();
})
*/

//support
function updateSupportDisplay() {
  document
    .querySelector('.supportme')
    .nextElementSibling.querySelector(
      '.priceOne'
    ).textContent = `฿${supportAmount}`;
}
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('supportMoney')
    .nextElementSibling.querySelector('.increase-btn-template')
    .addEventListener('click', () => {
      supportAmount++;
      updateSupportDisplay();
      updateTotal();
    });
  document
    .getElementById('supportMoney')
    .nextElementSibling.querySelector('.decrease-btn-template')
    .addEventListener('click', () => {
      if (supportAmount > 0) {
        supportAmount--;
      }
      updateSupportDisplay();
      updateTotal();
    });
});

//4 big circle buttons
document.querySelector('.confirming').addEventListener('click', confirmOrder);

function handleClick(clickedBtn, otherBtn) {
  clickedBtn.classList.add('beingClicked');
  otherBtn.classList.remove('beingClicked');
}

emsBtn.addEventListener('click', () => {
  handleClick(emsBtn, staffBtn);
  updateTotal();
});

staffBtn.addEventListener('click', () => {
  handleClick(staffBtn, emsBtn);
  updateTotal();
});

document.querySelector('.continueShop').addEventListener('click', goHome);
// document.querySelector('.btn-back').addEventListener('click', goHome);

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
