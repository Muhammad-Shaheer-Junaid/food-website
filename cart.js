// Fetch cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Get the container where the cart items will be displayed
let cartContainer = document.getElementById('cart-items-container');

// Check if there are items in the cart
if (cartItems.length > 0) {
  // Loop through the cart items and create HTML for each product
  cartItems.forEach(item => {
    cartContainer.innerHTML += `
    <div class="col-md-4 mb-4 card">
      <div class="card h-100 shadow-sm">
        <img src="${item.product_url}" class="card-img-top" alt="${item.product_name}">
        <div class="card-body">
          <h5 class="card-title">${item.product_name}</h5>
          <p class="card-text">${item.product_des}</p>
          <p class="card-text fw-bold">Rs ${item.product_price}</p>
          <button onclick="removeFromCart('${item.id}')" class="btn btn-danger">Remove from Cart</button>
        </div>
      </div>
    </div>`;
  });
} else {
  // If the cart is empty, show a message
  cartContainer.innerHTML = '<p>Your cart is empty.</p>';
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  // Filter out the item from the cart based on the product ID
  cartItems = cartItems.filter(item => item.id !== productId);

  // Update localStorage with the new cart
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Reload the page to reflect the changes
  window.location.reload();
}

// Function to clear the cart
function clearCart() {
  // Remove all items from localStorage
  localStorage.removeItem('cartItems');
  cartItems = []; // Clear the cart array

  // Reload the page to reflect the changes
  window.location.reload();
}

// Function to simulate checkout (for now, just a message)
function checkout() {
  Swal.fire({
    icon: 'success',
    title: 'Proceeding to Checkout',
    text: 'This is a demo. You would now proceed to the payment page.',
    timer: 2000,
    showConfirmButton: false
  });
}
