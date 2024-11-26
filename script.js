const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const confirmOrderButton = document.getElementById("confirm-order");
const cartModal = document.getElementById("cart-modal");
const submitDeliveryButton = document.getElementById("submit-delivery");
const checkoutButton = document.getElementById("checkout");
const cartCount = document.getElementById("cart-count");
const cartIcon = document.getElementById("cart-icon");
const deliveryForm = document.getElementById("delivery-form");
const closeCartButton = document.getElementById("close-cart");
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const products = document.querySelectorAll('.product');

let totalPrice = 0;
let deliveryDetails = {};
let cart = [];

function renderCart() {
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (event) => {
            const itemIndex = parseInt(button.dataset.index);
            removeFromCart(itemIndex);
        })

    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "block" : "none";
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    totalPrice -= removedItem.price;
    renderCart();
}

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const product = button.parentElement;
        const productName = product.querySelector("h2").textContent;
        const productPrice = parseFloat(
            product.querySelector(".price").textContent.replace("$", "")
        );

        cart.push({ name: productName, price: productPrice });

        const cartItem = document.createElement("p");
        cartItem.textContent = `${productName} - $${productPrice}`;
        cartItems.appendChild(cartItem);

        cartCount.textContent = cart.length;
        cartCount.style.display = "block";

        totalPrice += productPrice;
        totalPriceElement.textContent = totalPrice.toFixed(2);
        renderCart();
    });
});

cartIcon.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
});

closeCartButton.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

checkoutButton.addEventListener("click", () => {
    if (totalPrice > 0) {
        alert("Thank you for your purchase!");
        cart = [];
        cartItems.innerHTML = "";
        totalPrice = 0;
        totalPriceElement.textContent = "0.00";
        cartCount.textContent = "0";
        cartCount.style.display = "none";
    } else {
        alert("Your cart is empty!");
    }
});

confirmOrderButton.addEventListener("click", () => {
    if (totalPrice > 0 && cart.length > 0) {
        if (!deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
            alert("Please provide delivery details before confirming your order.");
            return;
        }

        alert(`
      Order confirmed!
      Name: ${deliveryDetails.name}
      Address: ${deliveryDetails.address}
      Phone: ${deliveryDetails.phone}
      Total: $${totalPrice.toFixed(2)}

      Your items will be delivered soon!
    `);

        cart = [];
        cartItems.innerHTML = "";
        totalPrice = 0;
        totalPriceElement.textContent = "0.00";
        cartCount.textContent = "0";
        cartCount.style.display = "none";
        deliveryDetails = {};

        deliveryForm.reset();
        deliveryForm.querySelectorAll("input").forEach((input) => (input.disabled = false));
        submitDeliveryButton.disabled = false;
    } else {
        alert("Your cart is empty! Please add items to confirm an order.");
    }
});

submitDeliveryButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !address || !phone) {
        alert("Please fill in all delivery details!");
        return;
    }

    deliveryDetails = { name, address, phone };
    alert("Delivery details saved successfully!");

    deliveryForm.querySelectorAll("input").forEach((input) => (input.disabled = true));
    submitDeliveryButton.disabled = true;
});

function filterProducts() {
    const query = searchBar.value.toLowerCase();
    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

searchBar.addEventListener('input', filterProducts);
searchButton.addEventListener('click', () => {
    filterProducts();
});