const token = localStorage.getItem("auth_token");

if (!token) {
    window.location.href = "localhost:8080/admin/login";
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

async function addCategory(event) {
    event.preventDefault();
    const categoryName = document.getElementById('categoryName').value;
    if (categoryName.trim() === '') {
        alert('Por favor, insira um nome para a categoria.');
        return;
    }

    const response = await fetch("https://kp-esportes-backend.onrender.com/api/category/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("auth_token")
        },
        body: JSON.stringify({
            name: categoryName
        })
    })

    // Simulating adding a new category
    alert(`Categoria "${categoryName}" adicionada com sucesso!`);
    closeModal('addCategoryModal');

    window.location.reload()
}

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://kp-esportes-backend.onrender.com/api/category/all");
    const resp = await response.json()
    const table = document.getElementById("categoryTable");
    const categorySelected = document.getElementById("productCategory");
    const newCategorySelect = document.getElementById("newproductCategory")
    resp.categories.forEach(category => {
        table.innerHTML += `<tr>
                <td class="border border-gray-300 px-4 py-2 text-center">${category.category_id}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">${category.name}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">${category.created_at}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">${category.updated_at}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <button class="editbutton bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600" data-category_id="${category.category_id}">Editar</button>
                    <button class="removebutton bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700" data-category_id="${category.category_id}">Excluir</button>
                </td>
            </tr>`

        categorySelected.innerHTML += `
    <option value="${category.category_id}">
        ${category.name}
    </option> `

    newCategorySelect.innerHTML += `
    <option value="${category.category_id}">
        ${category.name}
    </option> `
            

    });

    const responseProduct = await fetch("https://kp-esportes-backend.onrender.com/api/product/recents");
    const respp = await responseProduct.json()
    const tableProducts = document.getElementById("prodcutTable");
    respp.products.forEach(product => {
        tableProducts.innerHTML += ` <tr>
                            <td class="border border-gray-300 px-4 py-2">${product.product_id}</td>
                            <td class="border border-gray-300 px-4 py-2">${product.name}</td>
                            <td class="border border-gray-300 px-4 py-2">${product.description}</td>
                            <td class="border border-gray-300 px-4 py-2">${product.price}</td>
                            <td class="border border-gray-300 px-4 py-2">${product.size}</td>
                            <td class="border border-gray-300 px-4 py-2"><img src="https://kp-esportes-backend.onrender.com/app/Storage/uploads/products/${product.image}" ></td>
                            <td class="border border-gray-300 px-4 py-2">${product.discount}</td>
                            <td class="border border-gray-300 px-4 py-2">${product.category.name}</td>
                            <td class="border border-gray-300 px-4 py-2 text-center">
                                <button class="ProductUpdate bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600" data-product_id="${product.product_id}">Editar</button>
                                <button class="ProductDelete bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700" data-product_id="${product.product_id}">Excluir</button>
                            </td>
                        </tr>`



    });

    const editbuttons = document.querySelectorAll(".editbutton")
    const removebuttons = document.querySelectorAll(".removebutton")

    for (let i = 0; i < removebuttons.length; i++) {
        removebuttons[i].addEventListener("click", async (e) => {
            await fetch("https://kp-esportes-backend.onrender.com/api/category/delete/" + e.target.dataset.category_id, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("auth_token")
                }
            })
            window.location.reload()
        })

        editbuttons[i].addEventListener("click", (e) => {
            openModal("updateCategoryModal")
            const modaledit = document.querySelector("#updateCategoryModal form")
            modaledit.setAttribute("category_id", e.target.dataset.category_id)
        })
    }


    //button delete and update
    const ProductDelete = document.getElementsByClassName("ProductDelete")
    const ProductUpdate = document.getElementsByClassName("ProductUpdate")


    for (let i = 0; i < ProductDelete.length; i++) {
        ProductDelete[i].addEventListener("click", async (e) => {
            await fetch("https://kp-esportes-backend.onrender.com/api/product/delete/" + e.target.dataset.product_id, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("auth_token")
                }
            })
            window.location.reload()
        })

        ProductUpdate[i].addEventListener("click", async (e) => {
            openModal("UpdateProductModal")
            const modaledit = document.querySelector("#UpdateProductModal form")
            modaledit.setAttribute("product_id", e.target.dataset.product_id)

            console.log(e.target.dataset.product_id)
           const response = await fetch("https://kp-esportes-backend.onrender.com/api/product/find/" + e.target.dataset.product_id)
           const product = await response.json();
           document.getElementById("newproductName").value = product.name
           document.getElementById("newproductDescription").value = product.description
           document.getElementById("newproductPrice").value = product.price
           document.getElementById("newproductDiscount").value = product.discount
           document.getElementById("newproductSize").value = product.size.join(",")
           document.getElementById("newproductCategory").value = product.category.category_id
       
        })
    }

})

async function updateCategory(event) {
    event.preventDefault()
    await fetch("https://kp-esportes-backend.onrender.com/api/category/update/" + event.target.getAttribute("category_id"), {
        method: "PUT",
        headers: {
            "Authorization": localStorage.getItem("auth_token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("newCategoryName").value
        })
    })
    window.location.reload()
}


const addproduct = document.querySelector("#addProductModal form");
addproduct.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formDate = new FormData();
    formDate.append("name", document.getElementById("productName").value)
    formDate.append("description", document.getElementById("productDescription").value)
    formDate.append("price", document.getElementById("productPrice").value)
    formDate.append("discount", document.getElementById("productDiscount").value)
    formDate.append("size", JSON.stringify(document.getElementById("productSize").value.split(",")))
    formDate.append("image", document.getElementById("productImage").files[0])
    formDate.append("category", document.getElementById("productCategory").value)

    const response = await fetch("https://kp-esportes-backend.onrender.com/api/product/add", {
        method: "POST",
        headers: {

            "Authorization": localStorage.getItem("auth_token")
        },
        body: formDate

    })

    const data = await response.json();
    window.location.reload();
})


async function UpdateProduct(event) {
    event.preventDefault()

    const formDate = new FormData();
    formDate.append("name", document.getElementById("newproductName").value)
    formDate.append("description", document.getElementById("newproductDescription").value)
    formDate.append("price", document.getElementById("newproductPrice").value)
    formDate.append("discount", document.getElementById("newproductDiscount").value)
    formDate.append("size", JSON.stringify(document.getElementById("newproductSize").value.split(",")))
    if(typeof document.getElementById("newproductImage").files[0] != "undefined") {
        formDate.append("image",document.getElementById("newproductImage").files[0])
    }
    formDate.append("category", document.getElementById("newproductCategory").value)

    const response = await fetch("https://kp-esportes-backend.onrender.com/api/product/update/" + event.target.getAttribute("product_id"), {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("auth_token"),
        },
        body: formDate
    })

    const data = await response.json();
    window.location.reload();
}