let cart = [];

const allButtons = document.querySelectorAll(".button");

allButtons.forEach(function(btn) {
    btn.addEventListener("click",function(){

        const clickedId = btn.dataset.productId;

        const product = products.find(function(item){
            return item.id == clickedId;
        });
        
        const existingProduct = cart.find(function(item){
            return item.id === product.id;
        });

        if (existingProduct) {
            existingProduct.quantity += 1;
        } 
        else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    });
});