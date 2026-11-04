import api from "../Client/Api.js";

const secundario = {
    async trazerProdutos() {
        try {
            const resposta = await api.buscarDados();
            const produtos = resposta.products || resposta;

            if (!Array.isArray(produtos)) return;

            // 1. Preenche o Banner (usando o primeiro produto ou ID 1)
            const bannerImg = document.getElementById("banner-img");
            const secaoDestaque = document.querySelector(".secao-destaque");
            
            if (bannerImg) {
                // Pega o produto de destaque (ex: ID 1 ou o primeiro da lista)
                const produtoDestaque = produtos.find(p => p.id === 1) || produtos[0];
                if (produtoDestaque) {
                    bannerImg.src = produtoDestaque.thumbnail || produtoDestaque.images[0];
                    if (secaoDestaque) {
                        secaoDestaque.setAttribute("data-id-produto", produtoDestaque.id);
                    }
                    const tituloDestaque = secaoDestaque.querySelector(".titulo-produto");
                    if (tituloDestaque) tituloDestaque.textContent = produtoDestaque.title;
                }
            }

            // 2. Preenche a grade de produtos com base no data-id-produto
            const cardsProdutos = document.querySelectorAll(".cartao-produto");

            cardsProdutos.forEach(card => {
                const idProduto = card.getAttribute("data-id-produto");
                const imgTag = card.querySelector("img");
                const tituloTag = card.querySelector(".titulo-produto");
                const precoTag = card.querySelector(".preco-produto");

                // Converte para número ou string para comparar com segurança
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
                        // Converte o preço em dólares da API para Reais 
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