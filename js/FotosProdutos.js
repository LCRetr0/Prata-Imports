import api from "../Client/Api.js";

const secundario = {
    async trazerProdutos() {
        try {
            const produtos = await api.buscarDados();
            
            if (Array.isArray(produtos) && produtos.length > 0) {
                
                const elementosImagens = document.querySelectorAll(".containerimg");
                
                elementosImagens.forEach((imgElement) => {
                
                    const indiceAleatorio = Math.floor(Math.random() * produtos.length);
                    
                    if (produtos[indiceAleatorio].imagem) {
                        imgElement.src = produtos[indiceAleatorio].imagem;
                    }
                });
            }
        } catch (error) {
            console.error("Erro ao renderizar produtos:", error);
        } 
    }
};

export default secundario;