import api from "../Client/Api.js";

const secundario = {
    async trazerProdutos() {
        try {
            const produtos = await api.buscarDados();
            
            if (Array.isArray(produtos) && produtos.length > 0) {
                

                const cartoesProdutos = document.querySelectorAll(".cartao-produto");
                cartoesProdutos.forEach((cartao) => {
                    const idProduto = cartao.getAttribute("data-id-produto");
                    const produtoEncontrado = produtos.find(p => p.id == idProduto);
                    
                    if (produtoEncontrado) {
                        const img = cartao.querySelector(".caixa-imagem-produto img");
                        const urlImagem = produtoEncontrado.imagem || produtoEncontrado.image;
                        
                        if (img && urlImagem) {
                            img.src = urlImagem;
                        }
                    }
                });

       
                const cartoesCategorias = document.querySelectorAll(".cartao-categoria img");
                cartoesCategorias.forEach((imgElement, index) => {
                    const produtoRef = produtos[index % produtos.length];
                    const urlCat = produtoRef.imagem || produtoRef.image;
                    if (urlCat) {
                        imgElement.src = urlCat;
                    }
                });

                
                const secaoDestaque = document.querySelector(".secao-destaque");
                if (secaoDestaque) {
                    const bannerImg = document.getElementById("banner-img");
                    if (bannerImg && produtos[0]) {
                        const urlDestaque = produtos[0].imagem || produtos[0].image;
                        if (urlDestaque) {
                            bannerImg.src = urlDestaque;
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao renderizar produtos:", error);
        } 
    }
};

export default secundario;