import api from "../Client/Api.js";

let produtosCache = null;

const secundario = {
  async trazerProdutos(categoriaSelecionada = null) {
    try {
      if (!produtosCache) {
          produtosCache = await api.buscarDados();
      }

      const produtos = produtosCache;

      console.log("Produtos recebidos:", produtos);
      console.log("É um array?", Array.isArray(produtos));
      console.log("Quantidade de produtos:", produtos?.length);

      if (!Array.isArray(produtos) || produtos.length === 0) {
        return;
      }

      //Filtragem dos produtos por categoria

      let produtosFiltrados = produtos;

      if(categoriaSelecionada ==="beleza"){
        produtosFiltrados = produtos.filter(produto =>
          ["beauty","fragrances"].includes(produto.category)
        );
      }

      else if (categoriaSelecionada ==="casa"){
        produtosFiltrados = produtos.filter(produto =>
          produto.category ==="furniture"
        );
      }
      else if (categoriaSelecionada ==="essenciais"){
        produtosFiltrados = produtos.filter(produto =>
          produto.category ==="groceries"
        );
      }
      else if (categoriaSelecionada ==="ofertas"){
        produtosFiltrados = produtos.filter(produto =>
          produto.discountPercentage>=10
        );
      }

      console.log("Categoria selecionada:", categoriaSelecionada);
      console.log("Produtos filtrados:", produtosFiltrados);


      // Preenchimento do banner de destaque
      const secaoDestaque = document.querySelector(".secao-destaque");
      const bannerImg = secaoDestaque?.querySelector(".imagem-fundo-destaque");
      const tituloDestaque = secaoDestaque?.querySelector(".titulo-produto");

      const produtoDestaque = produtosFiltrados[0] || produtos[0];

      if (bannerImg) {
        bannerImg.src = produtoDestaque.thumbnail;
        bannerImg.alt = produtoDestaque.title;
      }

      if (tituloDestaque) {
        tituloDestaque.textContent = produtoDestaque.title;
      }

      if (secaoDestaque) {
        secaoDestaque.setAttribute("data-id-produto", produtoDestaque.id);
        secaoDestaque.setAttribute("data-preco-produto", produtoDestaque.price * 5);
      }

      // Preenchimento dos cartões de produtos
      const cardsProdutos = document.querySelectorAll(".grade-produtos .cartao-produto");
      console.log("Chegou até aqui tb");

      cardsProdutos.forEach((card,indice) => {
    
        const produtoEncontrado = produtosFiltrados[indice];
        
        // Esconde cartões sem produtos correspondentes
        if (!produtoEncontrado) {
            card.style.display = "none";
            return;
        }

        card.style.display = "";

        // Atualiza o ID do produto
        card.setAttribute(
            "data-id-produto",
            produtoEncontrado.id
        );

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

          let preco = produtoEncontrado.price;

          //Aplica o desconto somente na categoria ofertas

          if(categoriaSelecionada=="ofertas"){
            preco = preco *(1 - produtoEncontrado.discountPercentage/100);
          }

          const precoReais = (preco * 5).toFixed(2).replace(".", ",");
          
          precoTag.textContent = `R$ ${precoReais}`;
        }
      });

      // 5. Preenchimento dos cartões do Instagram
        const cardsInstagram = document.querySelectorAll(
            ".grade-instagram .cartao-produto"
        );

        cardsInstagram.forEach((card)=>{

          const idProduto = card.getAttribute("data-id-produto");

          const produtoEncontrado = produtos.find(
                    produto => String(produto.id) === String(idProduto)
                );

          if(!produtoEncontrado) return;

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

          let preco = produtoEncontrado.price;

          //Aplica o desconto somente na categoria ofertas

          if(categoriaSelecionada=="ofertas"){
            preco = preco *(1 - produtoEncontrado.discountPercentage/100);
          }

          const precoReais = (preco * 5).toFixed(2).replace(".", ",");
          
          precoTag.textContent = `R$ ${precoReais}`;
        }
            });

          
    } catch (error) {
      console.error("Erro ao carregar produtos e imagens:", error);
    }
  },
};

export default secundario;