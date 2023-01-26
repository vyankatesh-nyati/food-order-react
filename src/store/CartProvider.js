import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.item[existingItemIndex];

    let updateItem;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updateItem = [...state.item];
      updateItem[existingItemIndex] = updatedItem;
    } else {
      updateItem = state.item.concat(action.item);
    }
    return {
      item: updateItem,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.item[existingItemIndex];
    const updateTotalAmount = state.totalAmount - existingItem.price;

    let updateItem;

    if (existingItem.amount === 1) {
      updateItem = state.item.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updateItem = [...state.item];
      updateItem[existingItemIndex] = updatedItem;
    }

    return {
      item: updateItem,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
