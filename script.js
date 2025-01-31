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