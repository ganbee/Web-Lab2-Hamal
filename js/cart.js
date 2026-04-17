let cart = [];

function initCartLogic() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.onclick = (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('cart-dropdown');
            if (dropdown) dropdown.classList.toggle('active');
        };
    }
}

function addToCart(id) {
    const item = destinationsData.find(i => i.id === id);
    if (item) {
        cart.push(item);
        updateCartUI();
    }
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const count = document.getElementById('cart-count');
    const msg = document.getElementById('empty-cart-msg');

    if (count) count.innerText = cart.length;
    if (msg) msg.style.display = cart.length ? 'none' : 'block';
    
    if (list) {
        list.innerHTML = cart.map((item, i) => `
            <li>${item.title} - $${item.price} 
            <button onclick="removeFromCart(${i})">×</button></li>
        `).join('');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}