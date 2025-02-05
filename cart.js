let cart = [];


function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  cart.forEach(item => {
    
    const cartItemsList = document.getElementById("cart-items-list")

    if(cartItemsList) {

      cartItemsList.innerHTML += `
      <div class="cart-item">
            <div class="item-info">
              <p class="item-name">${item.name}</p>
              <p class="item-quantity">${item.quantity}</p>
              <p class="item-price">${item.price * item.quantity}</p>
            </div>
            <button class="remove-item-btn" data-id="${item.id}" id="delete">Remover</button>
          </div>
    `
    }
   
  })

let deleteButton = document.getElementById("delete")
if(deleteButton) {
  
  
  deleteButton.addEventListener("click", deleteProduct)
}
  let totalPrice = 0
  cart.forEach(item => {
    totalPrice += item.price * item.quantity
  })

  const total = document.getElementById("cart-total")

  if(total){
    total.innerText = totalPrice
  }

  updateCartCounter();
}

// Salva o carrinho no localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Atualiza o contador do carrinho (se houver elemento com id "cart-count")
function updateCartCounter() {
  const cartCounter = document.getElementById("cart-count");
  if (cartCounter) {
    cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Adiciona um produto ao carrinho
function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart();
  updateCartCounter();
}

function deleteProduct(e) {

 const id = e.target.dataset.id

 let newCart = []
 cart.forEach(item => {
  if(item.id != id){
    newCart.push(item)
  }
 })

 localStorage.setItem("cart", JSON.stringify(newCart))
 window.location.reload()
}

// Chamada para carregar o carrinho ao iniciar
loadCart();
