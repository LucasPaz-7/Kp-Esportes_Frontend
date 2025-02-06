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

let deleteButton = document.getElementsByClassName("remove-item-btn")
if(deleteButton) {
  
  for(let i = 0; i<deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deleteProduct);
  }
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
  } else {
    if(item.quantity > 1) {
      item.quantity -= 1;
      newCart.push(item)
    } 
  }
 })

 localStorage.setItem("cart", JSON.stringify(newCart))
 window.location.reload()
}


function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}


document.addEventListener("DOMContentLoaded", () => {
  const addressInput = document.getElementById("address");
  const addressWarn = document.getElementById("address-warn");
  const checkoutBtn = document.getElementById("checkout-btn");

  checkoutBtn.addEventListener("click", function() {
      const address = addressInput.value.trim();
      if (!address) {
          addressWarn.classList.remove("hidden");
          return;
      }
      
    
      let message = "Olá, gostaria de fazer o pedido:\n\n";
  
      cart.forEach(item => {
        message += `🛍️ *Produto:* ${item.name}\n`;
        message += `📦 *Quantidade:* ${item.quantity}\n`;
        message += `💲 *Subtotal:* R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
      });
      
      message += `💰 *Total do pedido:* R$ ${calculateTotal().toFixed(2)}\n\n`;
      message += `🏠 *Endereço de entrega:* ${address}\n\n`;
      message += "Obrigado e aguardo retorno!";
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "558896643514"; // Substitua pelo número real da loja
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.location.href = whatsappURL;
  });
});



loadCart();
