if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  const removeCartItemButtons = [...document.getElementsByClassName('btn-danger')];
  removeCartItemButtons.forEach((btn) => btn.addEventListener('click', handleRemoveItem));

  const quantityInputs = [...document.getElementsByClassName('cart-quantity-input')];
  quantityInputs.forEach((input) => input.addEventListener('change', handleInputChange));

  const shopBtns = [...document.getElementsByClassName('shop-item-btn')];
  shopBtns.forEach((button) => button.addEventListener('click', handleAddItem));

  const purchaseBtn = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', handlePurchase);
}

function handleRemoveItem(e) {
  const clickedButton = e.target;
  clickedButton.parentElement.parentElement.remove();
  updateTotal();
}

function handleInputChange(e) {
  const input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function handleAddItem(e) {
  const btn = e.target;
  const shopItem = btn.parentElement.parentElement;
  const title = shopItem.getElementsByClassName('shop-item-title')[0].textContent;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].textContent;
  const image = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addToCart(title, price, image);
  updateTotal();
}

function handlePurchase(e) {
  alert('Thank you for the purchase');
  const cartItems = (document.getElementsByClassName('cart-items')[0].innerHTML = '');
  updateTotal();
}

function addToCart(title, price, image) {
  const row = document.createElement('div');
  row.classList.add('cart-row');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  const itemNames = [...document.getElementsByClassName('cart-item-title')].map((item) => item.textContent);

  if (itemNames.includes(title)) {
    alert('You have already add this product to your cart');
    return;
  }

  const rowContent = `
  <div class="cart-item cart-column">
    <img class="cart-item-image" src=${image} alt="third album cover" width="100" height="100" />
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger" role="button">REMOVE</button>
  </div>`;

  row.innerHTML = rowContent;
  cartItems.appendChild(row);
  row.getElementsByClassName('btn-danger')[0].addEventListener('click', handleRemoveItem);
  row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', handleInputChange);
}

function updateTotal() {
  const cartItems = document.getElementsByClassName('cart-items')[0];
  const cartRows = [...cartItems.getElementsByClassName('cart-row')];
  let amount = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const priceString = cartRows[i].getElementsByClassName('cart-price')[0];
    const quantity = cartRows[i].getElementsByClassName('cart-quantity-input')[0].valueAsNumber;
    const price = parseFloat(priceString.textContent.replace('$', ''));
    amount += price * quantity;
  }

  const totalPriceSpan = document.getElementsByClassName('cart-total-price');
  totalPriceSpan[0].textContent = `$${Math.round(amount * 100) / 100}`;
}
