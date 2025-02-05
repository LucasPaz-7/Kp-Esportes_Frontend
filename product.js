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
  
  // Função para buscar os detalhes do produto utilizando async/await
  async function fetchProductDetails(productId) {
    const url = `https://kp-esportes-backend.onrender.com/api/product/find/${productId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar o produto (status: ${response.status})`);
      }
      const data = await response.json();
      // Ajuste: supondo que a API retorne o objeto do produto diretamente ou em uma propriedade "product"
      if (data.product) {
        return data.product;
      } else if (data) {
        return data;
      } else {
        throw new Error("Produto não encontrado na resposta da API");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao buscar os detalhes do produto. Verifique o console para mais informações.");
      return null;
    }
  }
  
  // Função para renderizar os detalhes do produto na página
  function renderProductDetails(product) {
    const container = document.getElementById("product-details");
    container.innerHTML = `
      <button id="back-to-list" class="back-button" style="margin-bottom: 20px; padding: 10px 20px; border: none; background: var(--secondary-color); color: #fff; border-radius: 4px; cursor: pointer;">
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
          <button class="add-to-cart-btn" style="background-color: var(--primary-color); color: #fff; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 600; max-width: 250px;">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    `;

    // Captura o botão "Comprar Agora"
const addCartBtn = document.querySelector(".add-to-cart-btn");
if (addCartBtn) {
  addCartBtn.addEventListener("click", () => {
    // Adiciona o produto ao carrinho chamando a mesma função que usa o localStorage
    addToCart(product.product_id, product.name, product.price, product.image);
    // Opcional: exibir uma mensagem de confirmação (por exemplo, via Toast)
    alert("Produto adicionado ao carrinho!");
  });

} else {
  console.log(error())
}

  
    // Adiciona a funcionalidade de seleção de tamanho (caso existam múltiplos tamanhos)
    const sizeElements = container.querySelectorAll(".product-size");
    sizeElements.forEach(el => {
      el.addEventListener("click", () => {
        sizeElements.forEach(item => item.classList.remove("selected"));
        el.classList.add("selected");
      });
    });
  
    // Listener para o botão "Voltar para a listagem"
    document.getElementById("back-to-list").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
  
  // Função principal que inicializa a página de detalhes
  async function init() {
    const params = getQueryParams();
    if (!params.id) {
      alert("Produto não especificado na URL!");
      return;
    }
    const product = await fetchProductDetails(params.id);
    if (product) {
      renderProductDetails(product);
    }
  }
  
  // Inicializa a página
  init();
  