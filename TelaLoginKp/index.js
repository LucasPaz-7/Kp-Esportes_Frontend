const button = document.getElementById("button");

button.addEventListener("click", verifyEmail)

const url = window.location.href
const args = url.split("?")[1]




async function verifyEmail() {
    const response = await fetch('https://kp-esportes-backend.onrender.com/api/auth/admin/verifyEmail?'+ args, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        },  

    }) 

    const data = await response.json()
  
    if (response.status == 200) {
        const token = data.token
        localStorage.setItem("auth_token", token) 
        window.location.href = "https://kp-esportes-frontend.onrender.com/admin/panel"   
    } 

    console.log(data)
}

