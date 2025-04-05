const cartItems = [
  { id: 1, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 2, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 3, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 4, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 5, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 6, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 7, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 8, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
  { id: 9, title: "Shirt", price: 100, image: "../shop/tshirt.png" },
];

const cartItemsContainer = document.getElementById("cart-items");
const checkoutList = document.getElementById("checkout-list");
const totalPriceElement = document.getElementById("total-price");

function renderCart() {
  cartItemsContainer.innerHTML = "";
  checkoutList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    // Create cart item card
    const card = document.createElement("div");
    card.className = "cart-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <p>Title : ${item.title}</p>
      <p>Price : $${item.price}</p>
      <button onclick="removeItem(${item.id})">Remove From Cart</button>
    `;
    cartItemsContainer.appendChild(card);

    // Add to checkout list
    const listItem = document.createElement("p");
    listItem.innerText = `${item.id}. ${item.title} $${item.price}`;
    checkoutList.appendChild(listItem);

    total += item.price;
  });

  totalPriceElement.textContent = total;
}

function removeItem(id) {
  const index = cartItems.findIndex((item) => item.id === id);
  if (index > -1) {
    cartItems.splice(index, 1);
    renderCart();
  }
}

document.getElementById("checkoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  // Optional: Clear the cart here if needed
  localStorage.removeItem("cart"); // remove cart from localStorage

  // Redirect to Razorpay payment page
  window.location.href = "/razorpay/razorpay.html";
});


renderCart();
