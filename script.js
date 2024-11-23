const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

let totalPrice = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const product = button.parentElement;
        const productName = product.querySelector("h2").textContent;
        const productPrice = parseFloat(product.querySelector(".price").textContent.replace("$", ""));

        const cartItem = document.createElement("p");
        cartItem.textContent = `${productName} - $${productPrice}`;
        cartItems.appendChild(cartItem);

        totalPrice += productPrice;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    });
});

document.getElementById("checkout").addEventListener("click", () => {
    if (totalPrice > 0) {
        alert("Thank you for your purchase!");
        cartItems.innerHTML = "";
        totalPrice = 0;
        totalPriceElement.textContent = "0.00";
    } else {
        alert("Your cart is empty!");
    }
});

const confirmOrderButton = document.getElementById("confirm-order");

confirmOrderButton.addEventListener("click", () => {
    const cartItemsContent = cartItems.innerHTML;
    const selectedPaymentMethod = paymentmethodSelect.value;

    if (totalPrice > 0 && cartItemsContent) {
        alert("Order confirmed! Your items will be delivered soon.");

        cartItems.innerHTML = "";
        totalPrice = 0;
        totalPriceElement.textContent = "0.00";
    } else {
        alert("Your cart is empty! Please add items to confirm an order.");
    }
});


const deliveryForm = document.getElementById("delivery-form");
const submitDeliveryButton = document.getElementById("submit-delivery");

let deliveryDetails = {};

submitDeliveryButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const location = document.getElementById("location").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !address || !location || !phone || !email) {
        alert("Please fill in all delivery details!");
        return;
    }

    deliveryDetails = { name, address, location, phone, email };
    alert("Delivery details saved successfully!");
    deliveryForm.querySelectorAll("input").forEach(input => input.disabled = true);
    submitDeliveryButton.disabled = true;
});

confirmOrderButton.addEventListener("click", () => {
    const cartItemsContent = cartItems.innerHTML;
    const selectedPaymentMethod = paymentMethodSelect.value;

    if (totalPrice > 0 && cartItemsContent) {
        if (Object.keys(deliveryDetails).length === 0) {
            alert("Please provide delivery details before confirming your order.");
            return;
        }

        alert(`
      Order confirmed!
      Name: ${deliveryDetails.name}
      Address: ${deliveryDetails.address}
      Location: ${deliveryDetails.location}
      Phone: ${deliveryDetails.phone}
      Email: ${deliveryDetails.email}
      Payment Method: ${selectedPaymentMethod}
      Total: $${totalPrice.toFixed(2)}

      Your items will be delivered soon!
    `);

        cartItems.innerHTML = "";
        totalPrice = 0;
        totalPriceElement.textContent = "0.00";
        deliveryDetails = {};

        deliveryForm.reset();
        deliveryForm.querySelectorAll("input").forEach(input => input.disabled = false);
        submitDeliveryButton.disabled = false;
    } else {
        alert("Your cart is empty! Please add items to confirm an order.");
    }
});