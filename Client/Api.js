const api = {
async buscarDados(){
    try{
    const response = await fetch("https://dummyjson.com/products");

    if(!response.ok){
      throw new Error(
        `Erro HTTP: ${response.status}`
      );
    }
    const dados = await response.json();
    return dados.products;

  }catch(error){
    console.error("Erro ao buscar dados da API:", error);

    throw error;
  }
} 

};
export default api;