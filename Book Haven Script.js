// Subscribe feature for all pages
function validateSubscription() {
  const email = document.getElementById("subscribe-email").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email)) {
    alert("Thank you for subscribing.");
    document.getElementById("subscribe-email").value = ""; // Clear the input
    return false; // Prevent form submission/reload
  } else {
    alert("Please enter a valid email address.");
    return false;
  }
}

// Gallery cart functionality with sessionStorage
let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

function updateCartDisplay() {
  document.getElementById("cart-count").textContent = cartItems.length;
}

function addToCart(item = "Book Item") {
  cartItems.push(item);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("Item added to the cart");
  updateCartDisplay();
}

function openCartModal() {
  let modalContent = '<h3>Your Cart</h3>';

  cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    modalContent += '<p>Your cart is empty.</p>';
  } else {
    modalContent += '<ul>';
    cartItems.forEach((item, index) => {
      modalContent += `<li>${item}</li>`;
    });
    modalContent += '</ul>';
  }

  modalContent += `
    <button onclick="processOrder()">Process Order</button>
    <button onclick="clearCart()">Clear Cart</button>
    <button onclick="closeCartModal()">Close</button>
  `;

  const modal = document.createElement("div");
  modal.id = "cart-modal";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "white";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  modal.style.zIndex = 1000;
  modal.innerHTML = modalContent;

  document.body.appendChild(modal);
}

function closeCartModal() {
  const modal = document.getElementById("cart-modal");
  if (modal) {
    modal.remove();
  }
}

function clearCart() {
  cartItems = [];
  sessionStorage.removeItem("cartItems");
  alert("Cart is cleared!");
  closeCartModal();
  updateCartDisplay();
}

function processOrder() {
  cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const name = localStorage.getItem("lastName") || "Customer";
  if (cartItems.length > 0) {
    const orderSummary = cartItems.join(", ");
    alert(`Thank you for your order, ${name}!\nYour items: ${orderSummary}`);
    cartItems = [];
    sessionStorage.removeItem("cartItems");
    closeCartModal();
    updateCartDisplay();
  } else {
    alert("Your cart is empty.");
  }
}

// Contact form submission with localStorage
function submitMessage() {
  const form = document.querySelector("form");
  const name = form.querySelector("input[name='name']")?.value || "";
  const message = form.querySelector("textarea[name='message']")?.value || "";

  if (name && message) {
    const feedback = { name, message, timestamp: new Date().toISOString() };
    localStorage.setItem(`feedback_${Date.now()}`, JSON.stringify(feedback));
    localStorage.setItem("lastName", name); // Store name for personalization
  }

  alert(`Thank you for your message, ${name}!`);
  form.reset();
}
