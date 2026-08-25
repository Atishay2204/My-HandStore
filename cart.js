
let finalCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("Final Cart:", finalCart);

const cartSection = document.querySelector("#cart-section");
console.log("Cart Section:", cartSection);

finalCart.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-product");
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div> 
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <button class="decrease-btn" data-product-id="${product.id}">−</button>
        <span class="quantity" data-product-id="${product.id}">${product.quantity}</span>
        <button class="increase-btn" data-product-id="${product.id}">+</button>
        <button class="remove-btn" data-product-id="${product.id}">Remove</button>
        </div>
    `;
    cartSection.appendChild(productDiv);
});

const emptyCart = document.querySelector("#empty-cart");
if(finalCart.length > 0){
    emptyCart.remove();
}

const increaseButton = document.querySelectorAll(".increase-btn");

increaseButton.forEach(function(incBtn) {
    incBtn.addEventListener("click",function(){
        const productId = incBtn.dataset.productId;

        const product = finalCart.find(function(item) {
            return item.id == productId;
        });
        product.quantity++;
        localStorage.setItem("cart", JSON.stringify(finalCart));
        const quantityDisplay = document.querySelector(
            `.quantity[data-product-id="${productId}"]`
        );

        quantityDisplay.textContent = product.quantity;
    });
});

const decreaseButton = document.querySelectorAll(".decrease-btn");

decreaseButton.forEach(function(decBtn) {
    decBtn.addEventListener("click", function() {

        const productId = decBtn.dataset.productId;

        const product = finalCart.find(function(item) {
            return item.id == productId;
        });
        if(product.quantity > 1){
            product.quantity--;
            localStorage.setItem("cart", JSON.stringify(finalCart));

            const quantityDisplay = document.querySelector(
                `.quantity[data-product-id="${productId}"]`
            );

            quantityDisplay.textContent = product.quantity;
        }
        else{
            finalCart = finalCart.filter(function(item) {
                return item.id != productId;
            });
            decBtn.closest(".cart-product").remove();
        }
    });
});
const removeButton = document.querySelectorAll(".remove-btn");
removeButton.forEach(function(remBtn) {
    remBtn.addEventListener("click", function() {
        const productId = remBtn.dataset.productId;
        finalCart = finalCart.filter(function(item) {
            return item.id != productId;
        });
        remBtn.closest(".cart-product").remove();
        localStorage.setItem("cart", JSON.stringify(finalCart));
    });
});