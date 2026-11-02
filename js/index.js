import api from "../Client/Api.js";
import principal from "./BannerPrincipal.js";
import secundario from './FotosProdutos.js';
import AdicionarAoCarrinho from "./Carrinho.js"; 
import preco from "./Preço.js";
import titulo from "./titulo.js";

document.addEventListener("DOMContentLoaded", async () => {
    const modalCarrinho = document.getElementById("modal-carrinho");
    const btnAbrirCarrinho = document.getElementById("botao-carrinho");
    const btnFecharCarrinho = document.getElementById("btn-fechar-carrinho");
    
    const dados = await api.buscarDados(); 
    await secundario.trazerProdutos();

  
    try {
        const bannerImg = document.getElementById("banner-img");
        if (bannerImg && Array.isArray(dados) && dados.length > 0) {
            bannerImg.src = dados[0].imagem || dados[0].image || "https://via.placeholder.com/1200x600/222/fff?text=Prata+Imports+Destaque";
        }
    } catch (e) {
        console.error("Erro ao carregar banner:", e);
    }

    await preco.trazerPreco();
    await titulo.trazertitulo();


    if (btnAbrirCarrinho) {
        btnAbrirCarrinho.addEventListener("click", async (e) => {
            e.preventDefault();
            const itens = await AdicionarAoCarrinho.abrirCarrinho();
            renderizarModal(itens);
            modalCarrinho.style.display = "block";
        });
    }

    if (btnFecharCarrinho) {
        btnFecharCarrinho.addEventListener("click", () => {
            modalCarrinho.style.display = "none";
        });
    }

    document.querySelectorAll(".botao-adicionar-carrinho").forEach(botao => {
        botao.addEventListener("click", async (e) => {
            const card = e.target.closest(".cartao-produto");
            const item = {
                id: card.getAttribute("data-id-produto"),
                nome: card.querySelector(".titulo-produto").textContent,
                preco: parseFloat(card.querySelector(".preco-produto").textContent.replace("R$", "").replace(".", "").replace(",", ".").trim()) || 0
            };
            await AdicionarAoCarrinho.adicionar(item);
            atualizarContador();
        });
    });

    const btnDestaque = document.querySelector(".botao-adicionar-destaque");
    if (btnDestaque) {
        btnDestaque.addEventListener("click", async () => {
            const secaoDestaque = document.querySelector(".secao-destaque");
            const itemDestaque = {
                id: secaoDestaque.getAttribute("data-id-produto"),
                nome: secaoDestaque.querySelector(".titulo-produto").textContent,
                preco: 349.00
            };
            await AdicionarAoCarrinho.adicionar(itemDestaque);
            atualizarContador();
        });
    }

    atualizarContador();
});

function renderizarModal(itens) {
    const container = document.getElementById("lista-itens-carrinho");
    container.innerHTML = "";

    if (!itens || itens.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    itens.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)} (Qtd: ${item.quantidade})</span>
            <button class="btn-remover-item" data-id="${item.id}">❌</button>
        `;
        container.appendChild(div);
    });

    container.querySelectorAll(".btn-remover-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const atualizado = AdicionarAoCarrinho.remover(id);
            renderizarModal(atualizado);
            atualizarContador();
        });
    });
}

function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    const contador = document.getElementById("contador-carrinho");
    if (contador) contador.textContent = `(${total})`;
}