// Tela de Login (Alternar entre Login e Cadastro)

// Quando clicar no link "Cadastrar-se"
document.getElementById('showRegisterForm').addEventListener('click', function () {
    // Esconde o formulário de login
    document.getElementById('loginForm').style.display = 'none';
    // Mostra o formulário de cadastro
    document.getElementById('registerForm').style.display = 'block';
  });
  
  // Quando clicar no link "Já tem conta? Entrar"
  document.getElementById('showLoginForm').addEventListener('click', function () {
    // Esconde o formulário de cadastro
    document.getElementById('registerForm').style.display = 'none';
    // Mostra o formulário de login
    document.getElementById('loginForm').style.display = 'block';
  });
  
  
  // Mostrar/ocultar senhas
  
  // Para o campo de senha do login
  document.getElementById('toggleLoginPassword').addEventListener('click', function () {
    // Seleciona o campo de senha
    const passwordInput = document.getElementById('loginPassword');
    // Seleciona o ícone dentro do botão (olhinho)
    const icon = this.querySelector('i');
  
    // Se o tipo atual for 'password', troca para 'text' (mostrar senha)
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      // Troca o ícone para o olho com risco (senha visível)
      icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
      // Se já está visível, volta para tipo 'password'
      passwordInput.type = 'password';
      // Troca o ícone para o olho normal (senha oculta)
      icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
  });
  
  // Para o campo de senha do cadastro
  document.getElementById('toggleRegisterPassword').addEventListener('click', function () {
    // Seleciona o campo de senha
    const passwordInput = document.getElementById('registerPassword');
    // Seleciona o ícone dentro do botão (olhinho)
    const icon = this.querySelector('i');
  
    // Se o tipo atual for 'password', troca para 'text' (mostrar senha)
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      // Troca o ícone para o olho com risco
      icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
      // Se já está visível, volta para tipo 'password'
      passwordInput.type = 'password';
      // Troca o ícone para o olho normal
      icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    fetch("/components/header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header").innerHTML = data);
  
    fetch("/components/footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer").innerHTML = data);
  });
  