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
  fetch("http://10.26.45.21:3000/cad_user",{
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
  let idusuario = 0;
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  fetch("http://10.26.45.21:3000/login",{
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
        idusuario = dados.usuario.id
        console.log(usuario)
        document.cookie = `usuario=${JSON.stringify(usuario)};`       

      alert(dados.msg);
      return window.location.href = `meu-perfil.html?idusuario=${idusuario}#perfil`;
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
 console.log(cookie)
 let idusuario = window.location.search
 idusuario = idusuario.substring(11,idusuario.length);

  //   const dadosPessoais = {
  //   CPF: document.getElementById("CPF").value,
  //   RG: document.getElementById("RG").value,
  //   Data_Nascimento: document.getElementById("nascimento").value,
  //   Genero: document.getElementById("genero").value,
  //   Celular: document.getElementById("Celular").value,
  //   CEP: document.getElementById("cep").value,
  //   Endereco: document.getElementById("endereco").value,
  //   Numero: document.getElementById("numero").value,
  //   Bairro: document.getElementById("bairro").value,
  //   Cidade: document.getElementById("cidade").value,
  //   Estado: document.getElementById("estado").value,
    
  // };

  const dadosUsuario = {
    Tipo_usuario: document.getElementById("tipoUsuario").value,
    Foto_usuario: document.getElementById("uploadFoto").value,
    Experiencia: document.getElementById("observacoes").value || ""
  };

  try {
    // const respostaUsuario = await fetch(`http://10.26.45.21:3000/meu-perfil/${idusuario}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(dadosUsuario)
    // })

    const respostaPessoais = await fetch(`http://10.26.45.21:3000/meu-perfil/alterar-dados-pessoais/${idusuario}`, {
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
    Foto_usuario: document.getElementById("uploadFoto").value,
    Tipo_usuario: document.getElementById("tipoUsuario").value,
    Tipo_servico: document.getElementById("tipoServico").value,
    Preco_servico: document.getElementById("precoDiaria").value,
    Tipo_porte: document.getElementById("tipoPorte").value,
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
/*
function meusPets() {
    const cookiePet = document.cookie
      .split('; ')
      .find(row => row.startsWith('usuario='));

    if (!cookiePet) {
      alert("Usuário não encontrado no cookie.");
      return;
    }

    let ID_Usuario;
    try {
      const usuarioObj = JSON.parse(decodeURIComponent(cookiePet.split('=')[1]));
      ID_Usuario = usuarioObj.ID_Usuario;
    } catch (e) {
      alert("Erro ao ler o cookie do usuário.");
      return;
    }

     fetch(`http://10.26.45.21:3000/meu-perfil/pets/${ID_Usuario}`, {
     method: 'put',
    headers: { 'Content-Type': 'application/json' },
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar pets.");
      return res.json();


    })

    req.body: JSON.stringify({ ID_Usuario })
  })

    .then 
((pets) => {
      const petsContainer = document.getElementById("petsContainer");
      petsContainer.innerHTML = ''; // Limpa o container

      if (pets.length === 0) {
        petsContainer.innerHTML = '<p>Nenhum pet cadastrado.</p>';
        return;
      }

      pets.forEach(pet => {
        const petDiv = document.createElement("div");
        petDiv.className = "pet-item";
        petDiv.innerHTML = `
          <h3>${pet.Nome_pet}</h3>
          <p>Tipo: ${pet.Tipo_pet}</p>
          <p>Porte: ${pet.Porte_pet}</p>
          <p>Raça: ${pet.Raca_pet}</p>
          <button onclick="editarPet(${pet.ID_Pet})">Editar</button>
          <button onclick="deletarPet(${pet.ID_Pet})">Deletar</button>
        `;
        petsContainer.appendChild(petDiv);
      });
    })
}

*/

// =====================================

// Area de configuração
// Atualizar dados pessoais

function atualizarConfiguracoesPerfil() {
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
    alert("Erro ao ler o cookie do usuário.");
    return;
  }

  fetch(`http://10.26.45.21:3000/meu-perfil/config/${ID_Usuario}`,{
    method:"PUT",
    headers:{
      "accept":"application/json",
      "content-type":"application/json"
    },
    body: JSON.stringify({
      Nome: document.getElementById("nomeConfig").value,
      Sobrenome: document.getElementById("sobrenomeConfig").value,
      Celular: document.getElementById("celularConfig").value,
      Email_usuario: document.getElementById("emailConfig").value
    })  
  })
    .then((res) => res.json())
    .then((user) => {
      // ATENÇÃO: user pode vir como array se o backend devolve result inteiro!
      document.getElementById("nomeConfig").value = user.Nome || '';
      document.getElementById("sobrenomeConfig").value = user.Sobrenome || '';
      document.getElementById("emailConfig").value = user.Email_usuario || '';
      document.getElementById("celularConfig").value = user.Celular || '';
    })
    .catch(err => {
      console.error("Erro ao carregar dados do perfil:", err);
      alert("Erro ao carregar dados do perfil.");
    });
}


// Obter ID do usuário a partir do cookie
// document.getElementById('btnAtualizarconfig').onclick = configuracoes;

// function configuracoes() {
//   const Nome = document.getElementById("nomeConfig").value;
//   const Sobrenome = document.getElementById("sobrenomeConfig").value;
//   const Celular = document.getElementById("celularConfig").value;
//   const Email_usuario = document.getElementById("emailConfig").value;

//   const cookieUsuario = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('usuario='));

//   if (!cookieUsuario) {
//     alert("Usuário não encontrado no cookie.");
//     return;
//   }

//   let ID_Usuario;
//   try {
//     const usuarioObj = JSON.parse(decodeURIComponent(cookieUsuario.split('=')[1]));
//     ID_Usuario = usuarioObj.ID_Usuario;
//   } catch (e) {
//     alert("Erro ao ler dados do cookie.");
//     return;
//   }

//   const data = { Nome, Sobrenome, Celular, Email_usuario };

//   fetch(`http://10.26.45.21:3000/meu-perfil/config/${ID_Usuario}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })
//     .then(res => res.json())
//     .then(json => {
//       alert(json.msg);
//     })
//     .catch(err => {
//       console.error("Erro ao atualizar perfil:", err);
//       alert("Erro ao atualizar perfil.");
//     });
// }



// Atualizar senha
async function redefinirSenha(){

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
    alert("Erro ao ler o cookie do usuário.");
    return;
  }




  const novaSenha = document.getElementById("novaSenha").value;
  const repitaSenha = document.getElementById("repitaSenha").value;

  if (novaSenha !== repitaSenha) {
    return alert("As senhas não coincidem!");
  }

  try {
    const res = await fetch(`http://10.26.45.21:3000/meu-perfil/config/senha/${ID_Usuario}`, {
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

}

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

// Meu Pet

async function salvarPet() {


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
  alert("Erro ao ler o cookie do usuário.");
  return;
}


  // Pega os dados do formulário
  const petData = {
    ID_Usuario: ID_Usuario, // Adiciona o ID do usuário
    Nome: document.getElementById('nomePet').value,
    Especie: document.getElementById('especiePet').value,
    Sexo: document.getElementById('sexoPet').value,
    Idade: document.getElementById('idadePet').value,
    Raca: document.getElementById('racaPet').value,
    Porte: document.getElementById('portePet').value,
    Castrado: document.getElementById('castradoPet').value,
    Restricoes: document.getElementById('restricoesPet').value,
    Comportamento: document.getElementById('comportamentoPet').value,
    Preferencias: document.getElementById('preferenciasPet').value,
    Foto_Pet: null // Upload fica pra depois
  };

  try {
    const response = await fetch(`http://10.26.45.21:3000/meu-perfil/${ID_Usuario}/cad-pet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petData)
    });

    const json = await response.json();

    if (!response.ok) {
      alert(json.message || "Erro ao salvar o pet.");
      return;
    }
   
    alert(Date.now())
    alert(json.message || "Pet cadastrado com sucesso!");
    window.location.reload()

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalPet'));
    modal.hide();    

  } catch (err) {
    console.error('Erro ao salvar pet:', err);
    alert("Erro na comunicação com o servidor.");
  }
}


// =====================================

// Deletar conta 

function deletarConta() {
  const confirmacao = confirm("Tem certeza que deseja deletar sua conta? Essa ação é irreversível!");

  if (!confirmacao) return;

  // Recuperar ID_Usuario do cookie
  const cookieUsuario = document.cookie.split('; ').find(row => row.startsWith('usuario='));
  if (!cookieUsuario) {
    alert("Usuário não encontrado no cookie.");
    return;
  }

  let ID_Usuario;
  try {
    const usuarioObj = JSON.parse(decodeURIComponent(cookieUsuario.split('=')[1]));
    ID_Usuario = usuarioObj.ID_Usuario;
  } catch (e) {
    alert("Erro ao ler o cookie do usuário.");
    return;
  }

  // Enviar requisição DELETE para o backend
  fetch(`http://10.26.45.21:3000/meu-perfil/config/${ID_Usuario}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(json => {
      alert(json.msg);

      // Apagar cookie
      document.cookie = "usuario=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Redirecionar para página de login ou home
      window.location.href = "/index.html";
    })
    .catch(err => {
      console.error("Erro ao deletar conta:", err);
      alert("Erro ao deletar conta. Tente novamente.");
    });
}


// ======================================
function enviarReserva() {
  const reserva = {
    Cuidador: "ID_do_Cuidador", // Substitua com o ID real se necessário
    Tutor: "ID_do_Tutor",       // Substitua com o ID real se necessário
    ID_Servico: "ID_Servico",   // Substitua se for um serviço específico
    Preco_servico: document.getElementById("preco_servico").innerText.replace("R$", "").trim(),
    qtd_pets: 1, // Ajuste conforme necessário
    Porte_pet: document.getElementById("portePet").value,
    Situacao: "Pendente", // ou outro status inicial
    data_inicio: document.getElementById("data_inicio").value,
    data_conclusao: document.getElementById("data_conclusao").value,
    ID_Pet: document.getElementById("id_pet").value,
    Periodo_entrada: document.getElementById("periodo_entrada").value,
    Periodo_saida: document.getElementById("periodo_saida").value,
    Instru_Pet: document.getElementById("instrucao_pet").value,
    Itens_Pet: document.getElementById("itens_pet").value
  };

  fetch("https://10.26.45.21:3000/reserva/cad-hosp/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reserva)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao enviar os dados da reserva.");
      }
      return response.json();
    })
    .then(data => {
      console.log("Reserva enviada com sucesso:", data);
      alert("Reserva confirmada!");
      // Redirecione ou limpe o formulário aqui se quiser
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
      alert("Falha ao enviar a reserva. Tente novamente.");
    });
}




function listarPetsReserva() {


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
  alert("Erro ao ler o cookie do usuário.");
  return;
}


  const lista = document.getElementById('id_pet');
  lista.innerHTML = '';

  fetch(`http://127.0.0.1:3000/meu-perfil/${ID_Usuario}/listar_pet`)
  .then((res)=> res.json())
  .then((pets) => {
  pets.forEach(pet => {
    let option = document.createElement('option');
    option.value = pet.ID_Pet;
    option.textContent = `${pet.Nome}`;
    lista.appendChild(option);
  }
)
})
}