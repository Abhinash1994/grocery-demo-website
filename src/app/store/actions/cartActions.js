import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "./types";

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x.id === product.id) {
      alreadyExists = true;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice().filter((x) => x.id !== product.id);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const incrementToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  const selectProduct = cartItems.find(item => item.id === product.id)
  const index = cartItems.indexOf(selectProduct)
  const value = cartItems[index]
  value.qty = value.qty + 1;
  value.total = value.qty * value.netPrice;

  dispatch({
    type: INCREASE_QUANTITY,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const decreaseToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  const selectProduct = cartItems.find(item => item.id === product.id)
  const index = cartItems.indexOf(selectProduct)
  const value = cartItems[index]
  if (value.qty > 1) {
    value.qty = value.qty - 1;
    value.total = value.qty * value.netPrice;
  }
  dispatch({ type: DECREASE_QUANTITY, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

