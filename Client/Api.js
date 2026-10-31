const api = {
async buscarDados(){
    try{
    const response = await fetch("https://dummyjson.com/products");

    if(!response.ok){
      throw new Error(
        `Erro HTTP: ${response.status}`
      );
    }
     return await response.json();

  }catch(error){
    console.error("Erro ao buscar dados da API:", error);

    throw error;
  }
} 


}
export default api;