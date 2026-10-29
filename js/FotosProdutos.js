import api from "../Client/Api.js";

const secundario = {
    async trazerProdutos() {
        try {
            const produtos = await api.buscarDados();
            
            if (Array.isArray(produtos) && produtos.length > 0) {
                
                const cartoesProdutos = document.querySelectorAll(".cartao-produto");
        
                cartoesProdutos.forEach((cartao,indice) => {
                    const produto = produtos[indice % produtos.length];
                    const imagem = cartao.querySelector("img");
                    const titulo = cartao.querySelector(".titulo-produto");
                    const preco = cartao.querySelector(".preco-produto");
                    
                    imagem.src = produto.image;
                    imagem.atl = produto.title;
                    titulo.textContent = produto.title;
                    preco.textContent = produto.price.toLocaleString("pt-BR",{
                        style:"currency",
                        currency: "BRL"
                    });
                    
                    
                });
            }
        } catch (error) {
            console.error("Erro ao renderizar produtos:", error);
        } 
    }
};

export default secundario;