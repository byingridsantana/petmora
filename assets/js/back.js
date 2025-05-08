const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.onclick = () => { 
  if (confirm ("Você tem certeza que deseja cadastrar?")==1) {
    const registerName = document.getElementById("registerName"); 
const registerSurname = document.getElementById("registerSurname");
const registerEmail = document.getElementById("registerEmail"); 
const registerPassword = document.getElementById("registerPassword"); 
const confirmPassword = document.getElementById("confirmPassword"); 
  if (registerPassword.value != confirmPassword.value) {
    return alert("As senhas não coincidem.")
  }
  fetch("http://127.0.0.1:3000/cad_user",{
    method:"POST",
    headers:{
      "accept":"application/json",
      "content-type":"application/json"
    },
    body:JSON.stringify({
      Nome:registerName.value,
      Sobrenome:registerSurname.value,
      Email_usuario:registerEmail.value,
      Senha_usuario:registerPassword.value
    })
  })

  .then((res) => res.json())
  .then((dados) => {
    alert(dados.msg);
  })
  .catch ((err) => {
    console.error(err);
  });


  }
} 


// Login -

const btnLogin = document.getElementById('btnLogin')
btnLogin.onclick = () => {
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  fetch("http://127.0.0.1:3000/login",{
    method:"POST",
    headers:{
      "accept":"application/json",
      "content-type":"application/json"
    },
    body:JSON.stringify({
      Email_usuario:loginEmail.value,
      Senha_usuario:loginPassword.value
    })
  })

  .then((res) => res.json())
  .then((dados) => {
    console.log(dados);
  })
  .catch ((err) => {
    console.error(err);
  })};