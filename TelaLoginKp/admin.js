const token = localStorage.getItem("auth_token");

if (!token) {
    window.location.href = "/PROJETOS/front-end/admin/login";
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

})

async function updateCategory(event) {
    event.preventDefault()
    await fetch("https://kp-esportes-backend.onrender.com/api/category/update/" + event.target.getAttribute("category_id"), {
        method: "PUT",
        headers: {
            "Authorization": localStorage.getItem("auth_token"),
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:document.getElementById("newCategoryName").value
        })
    })
    window.location.reload()
}