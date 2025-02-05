function copyMenu() {
    //copy inside .dot-cat to .departments
    var dptCategory = document.querySelector('.dpt-cat');
    var dptPlace = document.querySelector('.departments')
    dptPlace.innerHTML = dptCategory.innerHTML;

    //copy inside nav to nav
    var mainNav = document.querySelector('.header-nav nav');
    var navPlace = document.querySelector('.off-canvas nav');
    navPlace.innerHTML = mainNav.innerHTML;

    //copy .header-top .wrapper to .thetop-nav
    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav');
    topPlace.innerHTML = topNav.innerHTML;
}


//show mobile menu
const menuButton = document.querySelector('.trigger'),
    closeButton = document.querySelector('.t-close'),
    addClass = document.querySelector('.site');

menuButton.addEventListener('click', function () {
    addClass.classList.toggle('showmenu');
})
closeButton.addEventListener('click', function () {
    addClass.classList.remove('showmenu');
})


//show sub menu on mobile
const subMenu = document.querySelectorAll('.has-child .icon-small');
subMenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle(e) {
    e.preventDefault();
    subMenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);

    if (this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand');
}


const swiper = new Swiper('.swiper', {
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },


});

async function showCategories() {

    const categories = document.getElementById("categories");

    const response = await fetch("https://kp-esportes-backend.onrender.com/api/category/all")

    const data = await response.json()
    data.categories.forEach(category => {
        categories.innerHTML += `
    <li>
        <a href="" id="showCategories">
            <div class="icon-large"><i class="ri-t-shirt-air-line"></i></div>
        ${category.name}
        </a>
    </li>
        `
    })
    copyMenu()

    const categoryContainer = document.getElementById("showCategories");
const detailsCategories = document.getElementById("product-details-container");


categoryContainer.addEventListener("click", (event) => {
  event.preventDefault()
  window.location.href = `categories?category_name=${categoryContainer.innerText}`

});


}

showCategories()

const totalProducts = document.getElementById("totalProducts")
fetch("https://kp-esportes-backend.onrender.com/api/product/count")
    .then(response => response.json())
    .then(data => {
        totalProducts.innerText = `Total: ${data.count_products} Produtos`
    })

// PRODUTOS MAIN
const container = document.getElementById("products-container")
const listProducts = async () => {
    const response = await fetch("https://kp-esportes-backend.onrender.com/api/product/recents?limit=30")

    const data = await response.json();
    
    data.products.forEach(product => {

        container.innerHTML += `
        <div class="produto-card" data-product_id="${product.product_id}" style="cursor: pointer;">
            <img src="https://kp-esportes-backend.onrender.com/app/Storage/uploads/products/${product.image}" alt="${product.name}" class="produto-imagem">
            <h2 class="produto-titulo">${product.name}</h2>
            <div class="caracteristicas">${product.description}</div>
            <div class="produto-preco">R$ ${product.price}</div>
            <button class="botao-comprar">Ver Mais Detalhes</button>
        </div>
      `;
      
    })

    
}
listProducts()


const productsContainer = document.getElementById("products-container");
const detailsContainer = document.getElementById("product-details-container");


productsContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".produto-card");
  if (card) {
    const productId = card.dataset.product_id

    if (productId) {
      window.location.href = `show/product?id=${productId}`
    }
  }
});




    



// Seleciona os elementos do carrinho no cabeçalho
const cartCounter = document.getElementById("cart-count");

// Array para armazenar os itens do carrinho
let cart = [];

// Carrega o carrinho do localStorage ao iniciar a página
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCounter();
    }

    let totalPrice = 0
    cart.forEach(item => {
      totalPrice += item.price * item.quantity
    })
  
    const total = document.getElementById("cart-total")
  
    total.innerText = totalPrice
    console.log(total)
}

// Atualiza o contador do carrinho
function updateCartCounter() {
    if (cartCounter) {
        cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Função para adicionar produtos ao carrinho
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1,
        });
    }

    saveCart();
    updateCartCounter();
}

// Salva o carrinho no localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Evento de clique para adicionar ao carrinho
document.addEventListener("click", function(event) {
    const button = event.target.closest(".add-to-cart-btn");
    if (button) {
        const productId = button.getAttribute("data-id");
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));
        const productImage = button.getAttribute("data-image");

        if (productId && productName && productPrice) {
            addToCart(productId, productName, productPrice, productImage);
        }
    }
});




// Carrega os itens do carrinho ao abrir a página principal
loadCart();