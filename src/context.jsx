import {
  useContext,
  useState,
  createContext,
  useReducer,
  useEffect,
} from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  DISPLAY_ITEMS,
  LOADING,
} from "./action";
import { getTotal } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

export const appContext = createContext();

export const useGlobalContext = () => {
  return useContext(appContext);
};

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotal(state.cart);

  const fetchData = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        dispatch({ type: DISPLAY_ITEMS, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: id });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: id });
  };
  const displayItems = (items) => {
    dispatch({ type: DISPLAY_ITEMS, payload: items });
  };
  const setLoading = () => {
    dispatch({ type: LOADING });
  };

  return (
    <appContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        displayItems,
        setLoading,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
