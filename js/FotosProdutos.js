import api from "../Client/Api.js";

const secundario = {
  async trazerProdutos() {
    try {
      const produtos = await api.buscarDados();
      console.log("Produtos recebidos:", produtos);
      console.log("É um array?", Array.isArray(produtos));
      console.log("Quantidade de produtos:", produtos?.length);

      if (!Array.isArray(produtos) || produtos.length === 0) {
        return;
      }

      // Preenchimento do banner de destaque
      const secaoDestaque = document.querySelector(".secao-destaque");
      const bannerImg = secaoDestaque?.querySelector(".imagem-fundo-destaque");
      const tituloDestaque = secaoDestaque?.querySelector(".titulo-produto");

      const produtoDestaque = produtos.find((p) => p.id === 1) || produtos[0];

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
      const cardsProdutos = document.querySelectorAll(".cartao-produto");
      console.log("Chegou até aqui tb");

      cardsProdutos.forEach((card) => {
        const idProduto = card.getAttribute("data-id-produto");
        const produtoEncontrado = produtos.find(
          (p) => String(p.id) === String(idProduto)
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
          const precoReais = (produtoEncontrado.price * 5).toFixed(2).replace(".", ",");
          precoTag.textContent = `R$ ${precoReais}`;
        }
      });

      // Preenchimento dos banners duplos do centro
      const cardsdocentro = document.querySelectorAll(".secao-banner-duplo");
      console.log("Chegou até aqui tb");

      cardsdocentro.forEach((card) => {
        const idProduto2 = card.getAttribute("data-id-produto");
        const produtoEncontrado2 = produtos.find(
          (p) => String(p.id) === String(idProduto2)
        );

        console.log("ID do cartão: ", idProduto2);
        console.log("Produto encontrado: ", produtoEncontrado2);

        if (!produtoEncontrado2) return;

        const imgTag = card.querySelector(".caixa-banner img") || card.querySelector("img");
        const tituloTag = card.querySelector(".titulo-produto");
        const precoTag = card.querySelector(".preco-produto");

        if (imgTag) {
          imgTag.src = produtoEncontrado2.thumbnail;
          imgTag.alt = produtoEncontrado2.title;
        }
        if (tituloTag) {
          tituloTag.textContent = produtoEncontrado2.title;
        }
        if (precoTag) {
          const precoReais = (produtoEncontrado2.price * 5).toFixed(2).replace(".", ",");
          precoTag.textContent = `R$ ${precoReais}`;
        }
      });
    } catch (error) {
      console.error("Erro ao carregar produtos e imagens:", error);
    }
  },
};

export default secundario;