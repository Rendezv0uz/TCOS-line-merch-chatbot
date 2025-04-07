let quantity = 1;
let price = 129;
let shipping = 30;

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
  document.getElementById("cart-quantity").textContent = quantity;
  updateTotal();
}

function updateTotal() {
  let supportAmount = parseFloat(document.getElementById("support").value) || 0;
  let total = quantity * price + shipping + supportAmount;
  document.getElementById("total").textContent = `${total}฿`;
}

function goHome() {
  window.location.href = "main.html";
}

function continueShopping() {
  window.location.href = "main.html"; // Change to your home page
}

function confirmOrder() {
  alert("คำสั่งซื้อของคุณได้รับการยืนยันแล้ว!");
}
