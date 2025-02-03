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
        <a href="#">
            <div class="icon-large"><i class="ri-t-shirt-air-line"></i></div>
        ${category.name}
        </a>
    </li>
        `
    })
    copyMenu()
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
    <div class="produto-card">
         <div class="produto-card" data-product_id="${product.product_id}" style="cursor: pointer;">
        <img src="https://kp-esportes-backend.onrender.com/app/Storage/uploads/products/${product.image}" alt="Chuteira" class="produto-imagem">
        <h2 class="produto-titulo">${product.name}</h2>
        <div class="caracteristicas">${product.description}</div>
        <div class="produto-preco">${product.price}</div>
        <button class="botao-comprar">Ver Mais Detalhes</button>
    </div>
    `
    })

    
}
listProducts()


const productsContainer = document.getElementById("products-container");
const detailsContainer = document.getElementById("product-details-container");


productsContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".produto-card");
  if (card) {
    const productId = card.dataset.product_id
    console.log("Clicou no card com productId:", productId);
    console.log(card)
    if (productId) {
      showProductDetails(productId);
    }
  }
});


async function showProductDetails(productId) {
  console.log("Buscando produto com ID:", productId);
  const url = `https://kp-esportes-backend.onrender.com/api/product/find/${productId}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Status da resposta:", response.status);
      throw new Error("Erro ao buscar o produto");
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Produto não encontrado na resposta da API");
    }
    const product = data;
    
    // Atualiza o container de detalhes com os dados do produto
    detailsContainer.innerHTML = `
      <button id="back-to-list" style="margin-bottom: 20px; padding: 10px 20px; border: none; background: var(--secondary-color); color: #fff; border-radius: 4px; cursor: pointer;">
        Voltar para a listagem
      </button>
      <div class="product-detail" style="display: flex; gap: 40px; flex-wrap: wrap;">
        <div class="image-container" style="flex: 1 1 400px;">
          <img src="https://kp-esportes-backend.onrender.com/app/Storage/uploads/products/${product.image}" alt="${product.name}" class="product-image" style="width: 100%; object-fit: cover; border-radius: 8px; max-height: 500px;">
        </div>
        <div class="product-info" style="flex: 1 1 400px; display: flex; flex-direction: column; gap: 20px;">
          <h1 class="product-title" style="font-family: 'Poppins', sans-serif; font-size: 2em; font-weight: 700; color: var(--dark-color); margin: 0;">
            ${product.name}
          </h1>
          <div class="product-price" style="font-family: 'Poppins', sans-serif; font-size: 1.5em; color: var(--primary-color);">
            R$ ${product.price}
          </div>
          <div class="product-description" style="font-family: 'Rubik', sans-serif; font-size: 1em; color: var(--dark-color); line-height: 1.5;">
            ${product.description}
          </div>
          <div class="product-sizes" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
            ${
              product.sizes && product.sizes.length
                ? product.sizes.map(size => `<div class="product-size" style="padding: 10px 15px; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">${size}</div>`).join("")
                : `<div class="product-size" style="padding: 10px 15px; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">Tamanho único</div>`
            }
          </div>
          <button class="buy-button" style="background-color: var(--primary-color); color: #fff; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 600; max-width: 250px;">
            Comprar Agora
          </button>
        </div>
      </div>
    `;
    
    // Adiciona a funcionalidade de seleção de tamanho
    const sizeElements = detailsContainer.querySelectorAll(".product-size");
    sizeElements.forEach(el => {
      el.addEventListener("click", () => {
        sizeElements.forEach(item => item.classList.remove("selected"));
        el.classList.add("selected");
      });
    });
    

    const backButton = document.getElementById("back-to-list");
    backButton.addEventListener("click", () => {
      detailsContainer.style.display = "none";
      productsContainer.style.display = "grid";
    });
    

    detailsContainer.style.display = "block";
    productsContainer.style.display = "none";
  } catch (error) {
    console.error("Erro:", error);
    alert("Ocorreu um erro ao buscar os detalhes do produto. Verifique o console para mais informações.");
  }
}
