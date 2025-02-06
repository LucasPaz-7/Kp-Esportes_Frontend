let isLogin = true;

const button = document.getElementById("button");
button.addEventListener('click', handleForm);

    function toggleForm() {
      isLogin = !isLogin;
      const title = document.getElementById("formTitle");
      const button = document.querySelector("button");
      const switchText = document.querySelector(".switch");

      if (isLogin) {
        title.textContent = "Login";
        button.textContent = "Entrar";
        switchText.textContent = "Não tem uma conta? Cadastre-se aqui";
      } else {
        title.textContent = "Cadastro";
        button.textContent = "Cadastrar";
        switchText.textContent = "Já tem uma conta? Faça login";
      }
      // Limpa os campos e mensagens de erro
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("error").textContent = "";
    }

    async function handleForm() {
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const errorUsername = document.getElementById("errorUsername");
      const errorEmail = document.getElementById("errorEmaill");
      const errorPassword = document.getElementById("errorPassword");
      
      const response = await fetch('https://kp-esportes-backend.onrender.com/api/auth/admin/sendVerificationMail', {
        method:"POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            name: username,
            email: email,
            password: `${password}`
        })
      })

      const data = await response.json()

      if (response.status != 200) {
            errorUsername.innerHTML = typeof data.error.name == "undefined" ? "" : data.error.name
            errorEmail.innerHTML = typeof data.error.email == "undefined" ? "" : data.error.email
            errorPassword.innerHTML = typeof data.error.password == "undefined" ? "" : data.error.password    
            
            Toastify({
              text: "Você preencheu algun campo incorreto",
              duration: 4000,
              close: true,
              gravity: "top",      // "top" ou "bottom"
              position: "right",   // "left", "center" ou "right"
              stopOnFocus: true,   // Para pausar ao passar o mouse
              style: {
                background: "linear-gradient(to right, #794afa,rgb(162, 133, 241))",
                borderRadius: "8px",
                fontSize: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "16px 24px",
                color: "#fff"
              },
              onClick: function(){} // Callback se necessário
            }).showToast();
            
      } else {
        console.log(data)

        Toastify({
          text: "O Email foi enviado, olhe a sua caixa de entrada",
          duration: 4000,
          close: true,
          gravity: "top",      // "top" ou "bottom"
          position: "right",   // "left", "center" ou "right"
          stopOnFocus: true,   // Para pausar ao passar o mouse
          style: {
            background: "linear-gradient(to right, #794afa,rgb(162, 133, 241))",
            borderRadius: "8px",
            fontSize: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "16px 24px",
            color: "#fff"
          },
          onClick: function(){} // Callback se necessário
        }).showToast();
      }
    }

    