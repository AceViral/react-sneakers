import React from "react";
import AppContext from "../../Context";

const useCart = () => {
   const { cartItems, setCartItems } = React.useContext(AppContext);
   const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
   return { cartItems, setCartItems, totalPrice };
};

export default useCart;
