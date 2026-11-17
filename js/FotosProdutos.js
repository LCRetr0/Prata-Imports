import api from "../Client/Api.js";

const secundario = {
    async trazerProdutos() {

        //console.log("2 - Entrei na função trazerProdutos");

        try {
            const produtos = await api.buscarDados();
            console.log("Produtos recebidos:", produtos);

            console.log("É um array?", Array.isArray(produtos));
            console.log("Quantidade de produtos:", produtos?.length);


            if (!Array.isArray(produtos) || produtos.length === 0){
                //console.log("A função foi interrompida pelo IF");
             return;
             }
            //console.log("Passou pelo IF");
            //Preenchimento do banner

            //Localiza seção de destaque
            const secaoDestaque = document.querySelector(".secao-destaque");
            
            const bannerImg = secaoDestaque?.querySelector(".imagem-fundo-destaque");
            const tituloDestaque = secaoDestaque?.querySelector(".titulo-produto");

            // Seleciona o produto de ID 1 para o destaque (ou o primeiro da lista)
            const produtoDestaque = produtos.find(p => p.id === 1) || produtos[0];

            
            if (bannerImg) {
                bannerImg.src = produtoDestaque.thumbnail;
                bannerImg.alt = produtoDestaque.title;
            }
            
            if (tituloDestaque) {
                tituloDestaque.textContent = produtoDestaque.title;
            }

            if(secaoDestaque){
                secaoDestaque.setAttribute("data-id-produto",produtoDestaque.id);
                secaoDestaque.setAttribute("data-preco-produto",produtoDestaque.price*5);
            }
            
            //Preenchimentos dos cartões de produtos
            
            const cardsProdutos = document.querySelectorAll(".cartao-produto");
            
            //Percorre cada cartao
            console.log("Chegou até aqui tb")
            cardsProdutos.forEach(card => {
                const idProduto = card.getAttribute("data-id-produto");
                const produtoEncontrado = produtos.find(
                    p => String(p.id) === String(idProduto)
                );
                
                console.log("ID do cartão: ", idProduto);
                console.log("Produto encontrado: ", produtoEncontrado);

                if (!produtoEncontrado) return;

                const imgTag = card.querySelector("img");
                const tituloTag = card.querySelector(".titulo-produto");
                const precoTag = card.querySelector(".preco-produto");

                    if (imgTag) {
                        imgTag.src = produtoEncontrado.thumbnail;
                        imgTag.alt = produtoEncontrado.title;
                    }
                    if (tituloTag) {
                        tituloTag.textContent = produtoEncontrado.title;
                    }
                    if (precoTag) {
                    // Multiplica o preço por 5 (conversão fictícia
                    // de dólar para real, usando uma cotação fixa).
                    // toFixed(2) mantém duas casas decimais.
                    // replace troca o ponto por vírgula.
                        const precoReais = (produtoEncontrado.price * 5).toFixed(2).replace(".", ",");
                        precoTag.textContent = `R$ ${precoReais}`;
                    }
                
            });

        } catch (error) {
            console.error("Erro ao carregar produtos e imagens:", error);
        }
    }
};

export default secundario;