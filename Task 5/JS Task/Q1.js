const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 },
    { id: 4, name: "Monitor", price: 300 },
    { id: 5, name: "Webcam", price: 50 }
];

const cart = [];

function addToCart(productId, quantity = 1) {
    const productToAdd = products.find(product => product.id === productId);

    if (!productToAdd) {
        console.log(`Product with ID ${productId} not found.`);
        return;
    }

    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        console.log(`Updated quantity for ${productToAdd.name} in cart. New quantity: ${existingCartItem.quantity}`);
    } else {
        cart.push({ ...productToAdd, quantity });
        console.log(`${productToAdd.name} added to cart.`);
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        const removedItem = cart.splice(itemIndex, 1);
        console.log(`${removedItem[0].name} removed from cart.`);
    } else {
        console.log(`Product with ID ${productId} not found in cart.`);
    }
}

function listCart() {
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }

    console.log("\n--- Your Shopping Cart ---");
    cart.forEach(item => {
        console.log(`${item.name} (ID: ${item.id}) - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`);
    });
    console.log("--------------------------");
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log(`\nCart Total: $${total.toFixed(2)}`);
    return total;
}

console.log("--- Initial Available Products ---");
console.log(products);
console.log("----------------------------------\n");

console.log("--- Adding Products ---");
addToCart(1);
addToCart(2, 2);
addToCart(3);
addToCart(1, 1);
addToCart(5, 3);

listCart();

calculateTotal();

console.log("\n--- Removing Mouse (ID: 2) ---");
removeFromCart(2);

listCart();

calculateTotal();

console.log("\n--- Attempting to Add Non-Existent Product (ID: 99) ---");
addToCart(99);

console.log("\n--- Attempting to Remove Non-Existent Product (ID: 88) ---");
removeFromCart(88);

listCart();
calculateTotal();
