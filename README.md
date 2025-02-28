# KP-Esports - E-commerce de Artigos Esportivos

## 📝 Descrição
KP-Esports é uma plataforma de e-commerce moderna e responsiva especializada em artigos esportivos. O projeto oferece uma experiência de compra intuitiva com foco em produtos esportivos, feito para a Loja KpEsportes, Esse é o frontend feito por mim.

## 🚀 Funcionalidades

- **Catálogo de Produtos**
  - Visualização de produtos por categorias
  - Exibição detalhada de produtos
  - Produtos em destaque no slider

- **Carrinho de Compras**
  - Adição/remoção de produtos
  - Atualização automática do total
  - Persistência local dos itens
  - Contador de itens no header

- **Interface Responsiva**
  - Menu mobile adaptativo
  - Layout fluido para diferentes dispositivos
  - Slider de imagens responsivo
  - Navegação intuitiva

## 🛠 Tecnologias Utilizadas

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - Swiper.js (para sliders)
  - RemixIcon (para ícones)

- **Backend**
- Feito por Alysson
  - PHP
  - Docker
  - API RESTful

## 📦 Estrutura do Projeto

```
front-end/
├── assets/            # Recursos estáticos (imagens)
├── TelaLoginKp/       # Componentes da tela de login
├── index.html        # Página principal
├── style.css        # Estilos globais
├── script.js        # JavaScript principal
├── cart.js          # Lógica do carrinho
├── product.js       # Lógica de produtos
├── categories.js    # Lógica de categorias
└── docker-compose.yml # Configuração Docker
```

## 🚀 Como Executar o Projeto

1. Clone o repositório
```bash
git clone https://github.com/LucasPaz-7/Kp-Esportes_Frontend.git
```

2. Configure o ambiente Docker
```bash
docker-compose up -d
```

3. Acesse a aplicação
```
http://localhost:8080
```

## 🔗 Endpoints da API

- `GET /api/category/all` - Lista todas as categorias
- `GET /api/product/count` - Retorna total de produtos
- `GET /api/product/recents` - Lista produtos recentes
- `GET /show/product?id=[ID]` - Detalhes do produto

## 💼 Recursos Adicionais

- Sistema de rotas PHP personalizado
- Integração com backend via API REST
- Armazenamento local para carrinho de compras
- Sistema de navegação por categorias

## 🎨 UI/UX

- Design moderno e clean
- Paleta de cores consistente
- Feedback visual para interações
- Animações suaves
- Navegação intuitiva

## 🔒 Segurança

- Proteção contra CSRF
- Sanitização de inputs
- Validação de dados
- Rotas protegidas

## 📱 Compatibilidade

- Chrome (última versão)
- Firefox (última versão)
- Safari (última versão)
- Edge (última versão)
- Dispositivos móveis e tablets
