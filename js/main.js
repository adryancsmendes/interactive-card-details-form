const form = document.getElementById("form-cartao");
const popUpAgradecimento = document.getElementById("popup-agradecimento");
const botaoAgradecimento = document.getElementById("agradecimento-continue-btn");

const cartaoFrenteNumero = document.querySelector("#numero-cartao");
const cartaoFrenteNome = document.querySelector("#nome-cartao");
const cartaoFrenteExpiracao = document.querySelector("#expiracao-cartao");
const cartaoFrenteCvc = document.querySelector("#cvc-cartao");

const infosAtuais = JSON.parse(localStorage.getItem("infos")) || []

if(infosAtuais.length != 0){
    insereInfosNoCartao(infosAtuais)
}

/*esta funcao adiciona um modelo no campo card number do formulario*/
$(document).ready(function(){
    $('#card-number').mask('0000 0000 0000 0000');
});

/*esta funcao adiciona zeros ao código cvc se o numero digitado nao completar 3 dígitos*/
function leadingZerosCvc(input) {
    if(!isNaN(input.value) && input.value.length >= 1 && input.value.length < 3) {
      input.value = '0' + input.value
    }
  }

/*esta funcao adiciona zeros a data se o numero digitado nao completar 2 dígitos*/
  function leadingZerosDate(input) {
    if(!isNaN(input.value) && input.value.length >= 1 && input.value.length < 2) {
      input.value = '0' + input.value;
    }
  }


form.addEventListener("submit", (event) =>{
    event.preventDefault();

    const numeroCartao = event.target.elements['card-number'].value;
    const nomeDoCliente = event.target.elements['name'].value;
    
    const mesExpiracao = event.target.elements['date-month'].value;
    const anoExpiracao = event.target.elements['date-year'].value;

    const numeroCvc = event.target.elements['cvc-number'].value;

    popUpAgradecimento.style.display = "flex";

    const infosAtuais = {
        "number": numeroCartao,
        "name": nomeDoCliente,
        "mes": mesExpiracao,
        "ano": anoExpiracao,
        "numero": numeroCvc
    }

    localStorage.setItem("infos", JSON.stringify(infosAtuais));

    insereInfosNoCartao(infosAtuais);

    form.reset();
})

function insereInfosNoCartao(infos){
    cartaoFrenteNumero.innerText = infos.number;
    cartaoFrenteNome.innerText = infos.name;
    cartaoFrenteExpiracao.innerText = infos.mes + "/" + infos.ano;
    cartaoFrenteCvc.innerText = infos.numero;
}

botaoAgradecimento.addEventListener("click", ()=>{
    popUpAgradecimento.style.display = "none";
})
