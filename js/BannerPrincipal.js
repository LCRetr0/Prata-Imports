import api from "../Client/Api.js";


const principal = {
    async redenrizarProdutos(){
        
        const containerProdutos = document.getElementById("banner-img");  
 try {
const produtos = await api.buscarDados();
if (produtos.length > 0) {
                const indiceAleatorio = Math.floor(Math.random() * produtos.length);
                containerProdutos.src = produtos[indiceAleatorio].image;
            }
}catch (error) {
    console.error("Erro ao renderizar produtos:", error);
} 
}
}
export default principal;