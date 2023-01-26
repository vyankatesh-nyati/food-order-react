import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);

  const hasItems = cartCtx.item.length > 0;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const removeAmountHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addAmountHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = cartCtx.item.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={removeAmountHandler.bind(null, item.id)}
      onAdd={addAmountHandler.bind(null, item)}
    />
  ));

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-website-b5274-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.item,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmitted(true);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const submittingModalContent = <p>Sending order data... </p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmitted && cartModalContent}
      {isSubmitting && submittingModalContent}
      {didSubmitted && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
