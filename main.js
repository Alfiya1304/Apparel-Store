// Initialize the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price }); // Add product to cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount(); // Update cart count display
    alert(itemName + " has been added to your cart!"); // Alert user
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.length; // Get cart count
    const countElements = document.querySelectorAll('#cart-count'); // Get all cart count elements
    countElements.forEach(countElement => {
        countElement.textContent = cartCount; // Update cart count in navbar
    });
}

// Function to load cart items on the cart.html page
function loadCartItems() {
    const cartList = document.getElementById('cart-list');
    const totalAmount = document.getElementById('total-amount');
    cartList.innerHTML = ''; // Clear existing cart items
    let total = 0; // Initialize total

    // Display each item in the cart
    cart.forEach((item, index) => {
        cartList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} - ₹${item.price}
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
            </li>
        `;
        total += item.price; // Calculate total
    });

    totalAmount.textContent = total; // Display total amount
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    loadCartItems(); // Reload cart items
}

// Event listener to update cart count on page load
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount(); // Update cart count
    if (document.getElementById('cart-list')) {
        loadCartItems(); // Load cart items if on cart.html
    }
});

// Function to redirect to order page with pizza details
function redirectToOrderPage() {
    const selectedPizzas = cart.map(item => item.name);
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    
    // Create a query string with pizza names and total amount
    const queryString = new URLSearchParams({
        pizzaName: selectedPizzas.join(', '), // Join pizza names as a single string
        totalAmount: totalAmount // Pass the total amount
    }).toString();
    
    // Debugging: Log the query string to the console
    console.log("Redirecting to order page with query:", queryString);

    // Redirect to order.html with the query string
    window.location.href = 'order.html?' + queryString;
}

// Sign In functionality
document.getElementById('sign-in-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve email and password values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Implement your sign-in logic here
    // For demonstration, we'll assume any non-empty credentials are valid
    if (email && password) {
        // Redirect to options.html on successful sign-in
        window.location.href = 'options.html';
    } else {
        alert("Please enter valid credentials.");
    }
});
