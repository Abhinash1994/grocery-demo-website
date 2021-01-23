
const API_URL = "http://localhost:4000";



const Apis = {
  //product api
  GetProductById: `${API_URL}/api/product/getWebProductById?id=`,
  GetAllGroceryStaple: `${API_URL}/api/product/getAllGroceryStaple`,
  GetAllProductList: `${API_URL}/api/product/list/`,


};
export { API_URL, Apis };
