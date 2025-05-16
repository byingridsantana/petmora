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
    if( dados.msg == "Altere seu tipo de perfil."){
        let usuario = {
          ID_Usuario: dados.usuario.id,
          Nome: dados.usuario.nome,
          Sobrenome: dados.usuario.sobrenome,
          Email_usuario: dados.usuario.email,
          Foto_usuario: dados.usuario.foto
        }
        document.cookie = `usuario=${JSON.stringify(usuario)};`
        window.location.href = "meu-perfil.html#perfil";

      alert(dados.msg);
      return window.location.href = "meu-perfil.html#perfil";
      }
    })
    .catch ((err) => {
      console.error(err)
    })};


// ====================================
// Area de perfil

// Obter ID do usuário a partir do cookie
async function alterarPerfil2() {
  let cookie = document.cookie.split('; ').find(row => row.startsWith('usuario='));
  if (!cookie) {
    alert("Usuário não autenticado.");
    return;
  }

  let usuario = JSON.parse(cookie.split('=')[1]);

  const dadosPessoais = {
    CPF: document.getElementById("CPF").value,
    RG: document.getElementById("RG").value,
    Data_Nascimento: document.getElementById("nascimento").value,
    Genero: document.getElementById("genero").value,
    Celular: document.getElementById("Celular").value,
    CEP: document.getElementById("cep").value,
    Endereco: document.getElementById("endereco").value,
    Numero: document.getElementById("numero").value,
    Bairro: document.getElementById("bairro").value,
    Cidade: document.getElementById("cidade").value,
    Estado: document.getElementById("estado").value,
    
  };

  const dadosUsuario = {
    Tipo_usuario: document.getElementById("tipoUsuario").value,
    Foto_usuario: document.getElementById("uploadFoto").value,
    Experiencia: document.getElementById("observacoes").value || ""
  };

  try {
    const respostaUsuario = await fetch(`http://127.0.0.1:3000/meu-perfil/${usuario.ID_Usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosUsuario)
    });

    const respostaPessoais = await fetch(`http://127.0.0.1:3000/meu-perfil/alterar-dados-pessoais/${usuario.ID_Usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CPF: document.getElementById("CPF").value,
    RG: document.getElementById("RG").value,
    Data_Nascimento: document.getElementById("nascimento").value,
    Genero: document.getElementById("genero").value,
    Celular: document.getElementById("Celular").value,
    CEP: document.getElementById("cep").value,
    Endereco: document.getElementById("endereco").value,
    Numero: document.getElementById("numero").value,
    Bairro: document.getElementById("bairro").value,
    Cidade: document.getElementById("cidade").value,
    Estado: document.getElementById("estado").value,
    Foto_usuario: document.getElementById("uploadFoto").value
      })
    }).then((res)=> res.json())
    .then((rs)=>{
      alert(rs.msg);
    })
    .catch((error)=>console.error(`Erro ao tentar atualizar => ${error}`))

    const resultadoUsuario = await respostaUsuario.json();
    const resultadoPessoais = await respostaPessoais.json();

    if (respostaUsuario.ok && respostaPessoais.ok) {
      alert("Perfil atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar perfil:\n" + resultadoUsuario.msg + "\n" + resultadoPessoais.msg);
    }
  } catch (err) {
    console.error("Erro ao salvar perfil:", err);
    
  }
}


// ==================================== 

// Area pet















// =====================================

// Area de configuração
// Atualizar dados pessoais

// Obter ID do usuário a partir do cookie
document.getElementById('btnAtualizar').onclick = () => {
  const Nome = document.getElementById("nomeConfig").value;
  const Sobrenome = document.getElementById("sobrenomeConfig").value;
  const Celular = document.getElementById("celularConfig").value;
  const Email_usuario = document.getElementById("emailConfig").value;

  const cookieUsuario = document.cookie
    .split('; ')
    .find(row => row.startsWith('usuario='));

  if (!cookieUsuario) {
    alert("Usuário não encontrado no cookie.");
    return;
  }

  let ID_Usuario;
  try {
    const usuarioObj = JSON.parse(decodeURIComponent(cookieUsuario.split('=')[1]));
    ID_Usuario = usuarioObj.ID_Usuario;
  } catch (e) {
    alert("Erro ao ler dados do cookie.");
    return;
  }

  const data = {
    Nome,
    Sobrenome,
    Celular,
    Email_usuario
  };

  fetch(`http://127.0.0.1:3000/meu-perfil/config/${ID_Usuario}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      alert(json.msg);
    })
    .catch(err => {
      console.error("Erro ao atualizar perfil:", err);
      alert("Erro ao atualizar perfil.");
    });
};


// Atualizar senha
document.getElementById("formRedefinirSenha").addEventListener("submit", async function (e) {
  e.preventDefault();

  const novaSenha = document.getElementById("novaSenha").value;
  const repitaSenha = document.getElementById("repitaSenha").value;

  if (novaSenha !== repitaSenha) {
    return alert("As senhas não coincidem!");
  }

  try {
    const res = await fetch(`http://127.0.0.1:3000/meu-perfil/config/senha/${ID_Usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Senha_usuario: novaSenha })
    });

    const json = await res.json();
    alert(json.msg);
  } catch (err) {
    console.error("Erro ao atualizar senha:", err);
    alert("Erro ao redefinir a senha.");
  }
});

// Mostrar/ocultar senha
// ["toggleNovaSenha", "toggleRepitaSenha"].forEach(id => {
//   document.getElementById(id).addEventListener("click", () => {
//     const input = document.getElementById(id === "toggleNovaSenha" ? "novaSenha" : "repitaSenha");
//     const icon = document.querySelector(`#${id} i`);
//     input.type = input.type === "password" ? "text" : "password";
//     icon.classList.toggle("bi-eye");
//     icon.classList.toggle("bi-eye-slash");
//   });
// });



