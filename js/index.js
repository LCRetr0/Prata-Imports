//import api from "../Client/Api.js";
import secundario from "./FotosProdutos.js";
import AdicionarAoCarrinho from "./Carrinho.js"; 



document.addEventListener("DOMContentLoaded", async () => {
    
    console.log("1 - HTML carregado");

    const parametros =  new URLSearchParams(window.location.search);

    const categoria = parametros.get("categoria");

    await secundario.trazerProdutos(categoria);

    

    console.log("3 - Função trazerProdutos finalizada");
    
    const modalCarrinho = document.getElementById("modal-carrinho");
    const btnAbrirCarrinho = document.getElementById("botao-carrinho");
    const btnFecharCarrinho = document.getElementById("btn-fechar-carrinho");

    if (btnFecharCarrinho) {
        btnFecharCarrinho.onclick = () => {
            if (modalCarrinho) modalCarrinho.style.display = "none";
        };
    }

    function renderizarModal(itens) {
        const container = document.getElementById("lista-itens-carrinho");
        const modalCarrinho = document.getElementById("modal-carrinho");
        const btnFecharCarrinho = document.getElementById("btn-fechar-carrinho");
        if (!container) return;

        container.innerHTML = "";

        const carrinhoVazio = !itens || itens.length === 0;

        if (carrinhoVazio) {
            container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        } else {
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

        if (btnFecharCarrinho) {
            if (carrinhoVazio) {
                btnFecharCarrinho.innerHTML = "Continuar Comprando";
                btnFecharCarrinho.onclick = () => {
                    if (modalCarrinho) modalCarrinho.style.display = "none";
                };
            } else {
                btnFecharCarrinho.innerHTML = "<i class=\"fa-brands fa-whatsapp\"></i> Continuar pelo WhatsApp";
                btnFecharCarrinho.onclick = () => {
                    direcionarWhatsapp(itens);
                };
            }
        }
    }

    if (btnAbrirCarrinho) {
        btnAbrirCarrinho.addEventListener("click", async (e) => {
            e.preventDefault();
            const itens = await AdicionarAoCarrinho.abrirCarrinho();
            renderizarModal(itens);
            if (modalCarrinho) modalCarrinho.style.display = "block";
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
                preco: Number(secaoDestaque?.getAttribute("data-preco-produto"))||0
            };
            await AdicionarAoCarrinho.adicionar(itemDestaque);
            atualizarContador();
        });
    }

    atualizarContador();
});


function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    const contador = document.getElementById("contador-carrinho");
    if (contador) contador.textContent = `(${total})`;
}


function direcionarWhatsapp(itens) {
    const numeroLoja = "5571999999999"; 
    console.log("Itens para enviar via WhatsApp:", itens);
    const linhas = itens.map(item => {
        const qtd = item.quantidade || 1;
        const subtotal = (item.preco * qtd).toFixed(2).replace(".", ",");
        return `• ${item.nome} (Qtd: ${qtd}) - R$ ${subtotal}`;
    });

    const totalGeral = itens.reduce((acc, item) => {
        return acc + item.preco * (item.quantidade || 1);
    }, 0);

    const mensagem = [
        "Aqui está seu pedido:",
        "",
        ...linhas,
        "",
        `Total: R$ ${totalGeral.toFixed(2).replace(".", ",")}`
    ].join("\n");

    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}