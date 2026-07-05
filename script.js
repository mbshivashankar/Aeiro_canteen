const menuItems = [
  { id: 1, name: 'Veg Biryani', price: 140, description: 'Spiced rice with crispy vegetables and raita.' },
  { id: 2, name: 'Paneer Wrap', price: 95, description: 'Warm wrap with grilled paneer and chutney.' },
  { id: 3, name: 'Masala Dosa', price: 80, description: 'Crisp dosa served with coconut chutney.' },
  { id: 4, name: 'Fruit Bowl', price: 70, description: 'Seasonal fruit platter with yogurt.' }
];

const cart = [];

const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutMessage = document.getElementById('checkoutMessage');

function renderMenu() {
  menuGrid.innerHTML = '';

  menuItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <footer>
        <strong>₹${item.price}</strong>
        <button class="btn btn-primary">Add</button>
      </footer>
    `;

    card.querySelector('button').addEventListener('click', () => addToCart(item));
    menuGrid.appendChild(card);
  });
}

function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="muted">Your basket is empty. Choose a meal to start.</p>';
    cartCount.textContent = '0';
    cartTotal.textContent = '₹0';
    return;
  }

  let total = 0;

  cart.forEach((entry) => {
    total += entry.price * entry.quantity;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div>
        <strong>${entry.name}</strong>
        <div class="muted">Qty ${entry.quantity}</div>
      </div>
      <div>
        <strong>₹${entry.price * entry.quantity}</strong>
        <button data-id="${entry.id}">Remove</button>
      </div>
    `;

    row.querySelector('button').addEventListener('click', () => removeFromCart(entry.id));
    cartItems.appendChild(row);
  });

  cartCount.textContent = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  cartTotal.textContent = `₹${total}`;
}

function addToCart(item) {
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  checkoutMessage.textContent = `${item.name} added to the basket.`;
  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex((entry) => entry.id === id);
  if (index >= 0) {
    cart.splice(index, 1);
  }
  checkoutMessage.textContent = 'Item removed from the basket.';
  renderCart();
}

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    checkoutMessage.textContent = 'Please add at least one item before placing your order.';
    return;
  }

  const count = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  checkoutMessage.textContent = `Order placed for ${count} item(s). Kitchen is now preparing it.`;
  cart.length = 0;
  renderCart();
});

renderMenu();
renderCart();
