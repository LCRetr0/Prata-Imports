import api from "../Client/Api.js";

const secundario = {
    async trazerProdutos() {
        try {
            const produtos = await api.buscarDados();

            if (!Array.isArray(produtos) || produtos.length === 0) return;

 
            const secaoDestaque = document.querySelector(".secao-destaque");
            const bannerImg = secaoDestaque ? secaoDestaque.querySelector(".imagem-fundo-destaque") : null;
            const tituloDestaque = secaoDestaque ? secaoDestaque.querySelector(".titulo-produto") : null;

            // Seleciona o produto de ID 1 para o destaque (ou o primeiro da lista)
            const produtoDestaque = produtos.find(p => p.id === 1) || produtos[0];

            if (produtoDestaque) {
                if (bannerImg) {
                    bannerImg.src = produtoDestaque.thumbnail || produtoDestaque.images[0];
                    bannerImg.alt = produtoDestaque.title;
                }
                if (secaoDestaque) {
                    secaoDestaque.setAttribute("destaque-1", produtoDestaque.id);
                }
                if (tituloDestaque) {
                    tituloDestaque.textContent = produtoDestaque.title;
                }
            }

          
            const cardsProdutos = document.querySelectorAll(".cartao-produto");

            cardsProdutos.forEach(card => {
                const idProduto = card.getAttribute("data-id-produto");
                const imgTag = card.querySelector("img");
                const tituloTag = card.querySelector(".titulo-produto");
                const precoTag = card.querySelector(".preco-produto");

                const produtoEncontrado = produtos.find(p => String(p.id) === String(idProduto));

                if (produtoEncontrado) {
                    if (imgTag) {
                        imgTag.src = produtoEncontrado.thumbnail || produtoEncontrado.images[0];
                        imgTag.alt = produtoEncontrado.title;
                    }
                    if (tituloTag) {
                        tituloTag.textContent = produtoEncontrado.title;
                    }
                    if (precoTag) {
                       
                        const precoReais = (produtoEncontrado.price * 5).toFixed(2).replace(".", ",");
                        precoTag.textContent = `R$ ${precoReais}`;
                    }
                }
            });

        } catch (error) {
            console.error("Erro ao carregar produtos e imagens:", error);
        }
    }
};

export default secundario;