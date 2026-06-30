// ===============================
// NEXTAGE GAME CAFÉ
// script.js
// ===============================

// -------------------------------
// CARRINHO
// -------------------------------

let carrinho = [];
let total = 0;

const listaPedidos = document.getElementById("listaPedidos");
const totalTexto = document.getElementById("total");

function adicionar(nome, preco){

    carrinho.push({
        nome,
        preco
    });

    total += preco;

    atualizarCarrinho();

}

function atualizarCarrinho(){

    listaPedidos.innerHTML = "";

    carrinho.forEach(item=>{

        const li = document.createElement("li");

        li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

        listaPedidos.appendChild(li);

    });

    totalTexto.innerHTML = `Total: R$ ${total.toFixed(2)}`;

}

// -------------------------------
// FINALIZAR PEDIDO
// -------------------------------

function finalizarPedido(){

    if(carrinho.length==0){

        alert("Seu carrinho está vazio!");

        return;

    }

    localStorage.setItem("pedido",JSON.stringify(carrinho));

    iniciarEntrega();

}

// -------------------------------
// ENTREGA DO ROBÔ
// -------------------------------

function iniciarEntrega(){

    const barra = document.getElementById("progresso");
    const status = document.getElementById("statusEntrega");

    let progresso = 0;

    status.innerHTML="Pedido recebido...";

    const intervalo = setInterval(()=>{

        progresso += 10;

        barra.style.width = progresso + "%";

        if(progresso==20){

            status.innerHTML="Preparando pedido...";

        }

        if(progresso==50){

            status.innerHTML="Robô saiu da cozinha...";

        }

        if(progresso==80){

            status.innerHTML="Robô chegando à mesa...";

        }

        if(progresso>=100){

            clearInterval(intervalo);

            status.innerHTML="✅ Pedido entregue!";

            alert("Pedido entregue com sucesso!");

            carrinho=[];

            total=0;

            atualizarCarrinho();

            barra.style.width="0%";

        }

    },500);

}

// -------------------------------
// RESERVAS
// -------------------------------

const form = document.getElementById("formReserva");

if(form){

form.addEventListener("submit",function(e){

    e.preventDefault();

    const codigo =

    "NXT-"+Math.floor(Math.random()*9000+1000);

    document.getElementById("respostaReserva").innerHTML=

    `
    <h3>Reserva Confirmada!</h3>

    <p>Código: <strong>${codigo}</strong></p>
    `;

    form.reset();

});

}

// -------------------------------
// STATUS DOS PCs
// -------------------------------

const statusPCs=[

"Livre",

"Ocupado",

"Reservado"

];

function atualizarStatus(){

    const pcs=document.querySelectorAll("table td:nth-child(2)");

    pcs.forEach(pc=>{

        const sorteio=Math.floor(Math.random()*3);

        pc.innerHTML=statusPCs[sorteio];

        pc.className="";

        if(statusPCs[sorteio]=="Livre"){

            pc.classList.add("livre");

        }

        if(statusPCs[sorteio]=="Ocupado"){

            pc.classList.add("ocupado");

        }

        if(statusPCs[sorteio]=="Reservado"){

            pc.classList.add("reservado");

        }

    });

}

setInterval(atualizarStatus,10000);

// -------------------------------
// SCROLL SUAVE
// -------------------------------

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});

// -------------------------------
// ANIMAÇÃO DOS CARDS
// -------------------------------

const cards=document.querySelectorAll(".card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0px)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(50px)";

card.style.transition="1s";

observer.observe(card);

});

// -------------------------------
// BOAS-VINDAS
// -------------------------------

window.onload=()=>{

console.log("NEXTAGE GAME CAFÉ iniciado.");

};
