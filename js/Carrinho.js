import api from "../Client/Api.js";

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const AdicionarAoCarrinho = {
  async adicionar(carrinhoItem) {

    const botaoComprar = document.getElementById("botao-comprar");
    
    try {
      if (botaoComprar) {
        botaoComprar.disabled = true;
        botaoComprar.textContent = "Adicionando...";
      }

      const produtosDisponiveis = await api.buscarDados();
      const produtoExiste = produtosDisponiveis.some(prod => prod.id === carrinhoItem.id);
      
      if (!produtoExiste) {
        alert("Desculpe, este produto não está mais disponível.");
        return;
      }

      const indexItem = carrinho.findIndex(item => item.id === carrinhoItem.id);

      if (indexItem > -1) {
        carrinho[indexItem].quantidade = (carrinho[indexItem].quantidade || 1) + 1;
      } else {
        carrinho.push({ ...carrinhoItem, quantidade: 1 });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      
      console.log("Carrinho atualizado:", carrinho);
      alert("Produto adicionado ao carrinho com sucesso!");

    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      alert("Não foi possível adicionar o produto ao carrinho.");
    } finally {
      if (botaoComprar) {
        botaoComprar.disabled = false;
        botaoComprar.textContent = "Comprar";
      }
    }
  },

  async abrirCarrinho() {
    try {
      const produtosDisponiveis = await api.buscarDados();
      
      carrinho = carrinho.filter(item => produtosDisponiveis.some(prod => prod.id === item.id));
      
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      console.log("Carrinho atualizado ao abrir:", carrinho);
      return carrinho;
    } catch (error) {
      console.error("Erro ao abrir o carrinho:", error);
      alert("Erro ao carregar o carrinho.");
      return [];
    }
  },

  // Método de remover concluído recebendo o ID do item
  remover(idItem) {
    try {
      carrinho = carrinho.filter(item => item.id !== idItem);
      
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      console.log(`Item ${idItem} removido. Carrinho atual:`, carrinho);
      
      return carrinho;
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      alert("Não foi possível remover o item.");
      return carrinho;
    }
  }
};

export default AdicionarAoCarrinho;