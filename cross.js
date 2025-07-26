// const cartListItems = document.getElementById('cartItems');
// const orderProducts = document.getElementById("orderProducts")

// orderButton.addEventListener('click', () => {
//     if (cartListItems.children.length === 1) {
//         alert('Your cart is empty. Please add items to your cart before placing an order.');
//     } else {
//         // Proceed with the order placement logic
//         orderProducts.classList.add("activee")
//         for (let product = 0; product < cartListItems.children.length; product++) {
//             orderProducts.innerHTML += `<li>
//             ${cartListItems.children[product]}
//             </li>`;        
//         }
//         // Optionally, clear the cart after placing the order
//         window.location.href = "orderpage.html";
//         cartListItems.innerHTML = '';
//     }
// })