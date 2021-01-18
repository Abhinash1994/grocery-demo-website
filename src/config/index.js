
const API_URL = "http://localhost:4000";



const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/customer/login`,
  GetUserRegsiter: `${API_URL}/api/customer/register`,
  GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId?email=`,

  //product api
  GetProductById: `${API_URL}/api/product/getWebProductById?id=`,
  GetAllGroceryStaple: `${API_URL}/api/product/getAllGroceryStaple`,
  GetAllProductList: `${API_URL}/api/product/list/`,

  //product api
  GetOrderCreateByUser: `${API_URL}/api/order/create`,
  GetOrderByUser: `${API_URL}/api/order/list`,


  //Filter by category
  GetAllCategoryList: `${API_URL}/api/category/cn/list?slug=`,
  GetFilterByCategory: `${API_URL}/api/category/c`,

  //profile 
  GetCustomerUpdateDetails: `${API_URL}/api/customer/update`,

  //Get location 
  GetLocationListDetails: `${API_URL}/api/location/list`,
  GetAreaListDetails: `${API_URL}/api/location/area/list/getbyid?id=`,

  //Get filter by product
  GetProductByFilter: `${API_URL}/api/product/gcatalogsearch/result?search=`,
  GetCategoryListByFilter: `${API_URL}/api/category/catlogsearch/child-category`,
  GetProductBySubcategory: `${API_URL}/api/category/catlogsearch/product`,

  //Razarpayment
  GetPaymentValue: `${API_URL}/api/payment/orders`, 
  GetPaymentVerification: `${API_URL}/api/payment/verification`, 
  GetPaymentOrderList: `${API_URL}/api/payment/orderlist`, 



};
export { API_URL, Apis };
