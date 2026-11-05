import api from "../Client/Api.js";
import secundario from './FotosProdutos.js';
import AdicionarAoCarrinho from "./Carrinho.js"; 

document.addEventListener("DOMContentLoaded", async () => {
    const modalCarrinho = document.getElementById("modal-carrinho");
    const btnAbrirCarrinho = document.getElementById("botao-carrinho");
    const btnFecharCarrinho = document.getElementById("btn-fechar-carrinho");
    
    // Executa a renderização unificada dos produtos e banner
    await secundario.trazerProdutos();
    await AdicionarAoCarrinho.abrirCarrinho(); 
    await api.buscarDados();

    if (btnAbrirCarrinho) {
        btnAbrirCarrinho.addEventListener("click", async (e) => {
            e.preventDefault();
            const itens = await AdicionarAoCarrinho.abrirCarrinho();
            renderizarModal(itens);
            if (modalCarrinho) modalCarrinho.style.display = "block";
        });
    }

    if (btnFecharCarrinho) {
        btnFecharCarrinho.addEventListener("click", () => {
            if (modalCarrinho) modalCarrinho.style.display = "none";
        });
    }

    
    document.querySelectorAll(".botao-adicionar-carrinho").forEach(botao => {
        botao.addEventListener("click", async (e) => {
            const card = e.target.closest(".cartao-produto");
            if (!card) return;

            const item = {
                id: card.getAttribute("data-id-produto"),
                nome: card.querySelector(".titulo-produto")?.textContent || "Produto",
                preco: parseFloat(card.querySelector(".preco-produto")?.textContent.replace("R$", "").replace(".", "").replace(",", ".").trim()) || 0
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
                id: secaoDestaque?.getAttribute("data-id-produto") || "1",
                nome: secaoDestaque?.querySelector(".titulo-produto")?.textContent || "Destaque",
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
    if (!container) return;
    container.innerHTML = "";

    if (!itens || itens.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    itens.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-carrinho-linha";
        div.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")} (Qtd: ${item.quantidade})</span>
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