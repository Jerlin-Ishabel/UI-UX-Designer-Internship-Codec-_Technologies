const menuItems = [
  { name: "🍕 Pizza", price: 250 },
  { name: "🍔 Burger", price: 150 },
  { name: "🍝 Pasta", price: 200 },
  { name: "🍟 Fries", price: 100 },
  { name: "🥗 Salad", price: 120 },
  { name: "🍣 Sushi", price: 300 },
  { name: "🥪 Sandwich", price: 130 },
  { name: "🌮 Tacos", price: 180 },
  { name: "🌯 Wrap", price: 160 },
  { name: "🍨 Ice Cream", price: 90 }
];

const menuList = document.getElementById("menuList");
const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");
const statusText = document.getElementById("statusText");

let cart = [];
let total = 0;

menuItems.forEach((item, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${item.name} - ₹${item.price}</span>
    <button onclick="addToCart(${index})">Add</button>
  `;
  menuList.appendChild(li);
});

function addToCart(index) {
  const item = menuItems[index];
  cart.push(item);
  total += item.price;
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });
  totalPrice.textContent = `Total: ₹${total}`;
}

function placeOrder() {
  if (cart.length === 0) {
    statusText.textContent = "⚠️ Please add items to your cart first.";
    statusText.style.background = "#fee2e2"; // light red
    return;
  }

  statusText.textContent = "👨‍🍳 Preparing your food...";
  statusText.style.background = "#fef3c7"; // light yellow

  setTimeout(() => {
    statusText.textContent = "🚚 Out for delivery...";
    statusText.style.background = "#d1fae5"; // light green
  }, 3000);

  setTimeout(() => {
    statusText.textContent = "✅ Delivered! Enjoy your meal!";
    statusText.style.background = "#e0f2fe"; // light blue
  }, 6000);
}
