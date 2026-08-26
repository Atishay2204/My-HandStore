
let finalCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSection   = document.querySelector("#cart-section");
const emptyCart     = document.querySelector("#empty-cart");
const orderSummary  = document.querySelector("#order-summary");
const summaryItems  = document.querySelector("#summary-items");
const summarySubtotal = document.querySelector("#summary-subtotal");
const summaryTotal    = document.querySelector("#summary-total");

/* ── helpers ──────────────────────────────────────────────── */

function getProductPrice(product) {
    // price may be stored as number or "$100" string
    return typeof product.price === "number"
        ? product.price
        : parseFloat(String(product.price).replace(/[^0-9.]/g, "")) || 0;
}

function updateSummary() {
    // rebuild per-item rows
    summaryItems.innerHTML = "";
    let subtotal = 0;

    finalCart.forEach(function(item) {
        const unitPrice  = getProductPrice(item);
        const lineTotal  = unitPrice * item.quantity;
        subtotal += lineTotal;

        const row = document.createElement("div");
        row.classList.add("summary-item-row");
        row.innerHTML = `
            <span class="summary-item-name">${item.name} × ${item.quantity}</span>
            <span class="summary-item-price">$${lineTotal.toFixed(2)}</span>
        `;
        summaryItems.appendChild(row);
    });

    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryTotal.textContent    = `$${subtotal.toFixed(2)}`;
}

function checkEmpty() {
    if (finalCart.length === 0) {
        // show empty state, hide summary panel
        emptyCart.style.display = "flex";
        orderSummary.style.display = "none";
    } else {
        // hide empty state, show summary panel
        emptyCart.style.display = "none";
        orderSummary.style.display = "flex";
    }
}

/* ── render initial items ─────────────────────────────────── */

finalCart.forEach(function(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-product");
    productDiv.dataset.id = product.id;
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
            <h3>${product.name}</h3>
            <p>Price: $${getProductPrice(product).toFixed(2)}</p>
            <button class="decrease-btn" data-product-id="${product.id}">−</button>
            <span class="quantity" data-product-id="${product.id}">${product.quantity}</span>
            <button class="increase-btn" data-product-id="${product.id}">+</button>
            <button class="remove-btn"   data-product-id="${product.id}">Remove</button>
        </div>
    `;
    cartSection.appendChild(productDiv);
});

checkEmpty();
updateSummary();

/* ── event delegation on cartSection ─────────────────────── */

cartSection.addEventListener("click", function(e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    const productId = btn.dataset.productId;
    const product   = finalCart.find(function(item) { return item.id == productId; });

    /* ── Increase ── */
    if (btn.classList.contains("increase-btn")) {
        product.quantity++;
        document.querySelector(`.quantity[data-product-id="${productId}"]`).textContent = product.quantity;
        localStorage.setItem("cart", JSON.stringify(finalCart));
        updateSummary();
    }

    /* ── Decrease ── */
    if (btn.classList.contains("decrease-btn")) {
        if (product.quantity > 1) {
            product.quantity--;
            document.querySelector(`.quantity[data-product-id="${productId}"]`).textContent = product.quantity;
            localStorage.setItem("cart", JSON.stringify(finalCart));
            updateSummary();
        } else {
            finalCart = finalCart.filter(function(item) { return item.id != productId; });
            btn.closest(".cart-product").remove();
            localStorage.setItem("cart", JSON.stringify(finalCart));
            checkEmpty();
            updateSummary();
        }
    }

    /* ── Remove ── */
    if (btn.classList.contains("remove-btn")) {
        finalCart = finalCart.filter(function(item) { return item.id != productId; });
        btn.closest(".cart-product").remove();
        localStorage.setItem("cart", JSON.stringify(finalCart));
        checkEmpty();
        updateSummary();
    }
});

/* ── Checkout button ──────────────────────────────────────── */

document.querySelector("#checkout-btn").addEventListener("click", function() {
    alert("Proceeding to checkout! Total: " + summaryTotal.textContent);
});