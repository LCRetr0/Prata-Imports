import api from "../Client/Api.js";

const titulo = {
    async trazertitulo() {
        try {
            const resposta = await api.buscarDados();
            
       
            const produtos = resposta.products || resposta; 

            if (Array.isArray(produtos) && produtos.length > 0) {
                const elementosPreco = document.querySelectorAll(".titulo-produto");
                
                if (elementosPreco.length === 0) {
                    console.warn("Nenhum elemento '.titulo-produto' encontrado no DOM.");
                    return;
                }

                elementosPreco.forEach((precoElemento) => {
                    const indiceAleatorio = Math.floor(Math.random() * produtos.length);
                    const produtoSorteado = produtos[indiceAleatorio];
                    
                    if (produtoSorteado && typeof produtoSorteado.title === 'string') {
         
                        precoElemento.textContent = produtoSorteado.title;
                    }
                });
            } else {
                console.warn("A lista de produtos retornada está vazia.");
            }
        } catch (error) {
            console.error("Erro ao renderizar títulos:", error);
        }
    }
};

export default titulo;