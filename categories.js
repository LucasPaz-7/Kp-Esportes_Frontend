// Função para extrair os parâmetros da query string da URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1); // Remove o "?" inicial
    const pairs = queryString.split("&");
    for (let pair of pairs) {
      if (pair) {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    }
    return params;
  }

const container = document.getElementById("products-container");

const showProductsforCategories = async () => {

    const params = getQueryParams()
    const response = await fetch(`https://kp-esportes-backend.onrender.com/api/product/search?search=${params["category_name"]}`)

    const data = await response.json();
    console.log(data)

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

    const productsContainer = document.getElementById("products-container");
const detailsContainer = document.getElementById("product-details-container");


productsContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".produto-card");
  console.log(productsContainer)
  if (card) {
    const productId = card.dataset.product_id

    if (productId) {
      window.location.href = `show/product?id=${productId}`
    }
  }
});
}
showProductsforCategories()