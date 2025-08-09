function addToCart(productName) {
  const message = document.getElementById("cart-message");
  message.innerText = `${productName} has been added to your cart! ✅`;

  // Auto-hide after 3 seconds
  setTimeout(() => {
    message.innerText = "";
  }, 3000);
}
