import api from "../Client/Api.js";

const preco = {
    async trazerPreco() {
        try {
            const resposta = await api.buscarDados();
            
       
            const produtos = resposta.products || resposta; 

            if (Array.isArray(produtos) && produtos.length > 0) {
                const elementosPreco = document.querySelectorAll(".preco-produto");
                
                if (elementosPreco.length === 0) {
                    console.warn("Nenhum elemento '.preco-produto' encontrado no DOM.");
                    return;
                }

                elementosPreco.forEach((precoElemento) => {
                    const indiceAleatorio = Math.floor(Math.random() * produtos.length);
                    const produtoSorteado = produtos[indiceAleatorio];
                    
                    if (produtoSorteado && typeof produtoSorteado.price === 'number') {
         
                        precoElemento.textContent = `R$ ${produtoSorteado.price.toFixed(2)}`;
                    }
                });
            } else {
                console.warn("A lista de produtos retornada está vazia.");
            }
        } catch (error) {
            console.error("Erro ao renderizar preços:", error);
        }
    }
};

export default preco;