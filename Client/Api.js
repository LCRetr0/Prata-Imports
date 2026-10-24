const api = {
async buscardados(){
    try{
    const response = await fetch("https://fakestoreapi.com/products");
     return await response.json();

  }catch(error){
    console.error("Erro ao buscar dados da API:", error);
  }
} 
}
export default api;