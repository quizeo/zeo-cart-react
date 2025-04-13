import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  DISPLAY_ITEMS,
  LOADING,
} from "./action";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const item = newCart.get(action.payload);
    item.amount += 1;
    newCart.set(action.payload, item);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const item = newCart.get(action.payload);
    if (item.amount === 1) {
      newCart.delete(action.payload);
      return { ...state, cart: newCart };
    } else {
      item.amount -= 1;
    }
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.map((item) => [item.id, item]));
    return { ...state, cart: newCart, loading: false };
  }
};

export default reducer;
