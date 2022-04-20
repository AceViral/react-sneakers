import styles from "./Drawer.module.scss";

import axios from "axios";
import React from "react";

import useCart from "../Hooks/useCart";
import Info from "../Info";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ onClose, items = [], onRemove, opened }) {
   const { cartItems, setCartItems, totalPrice } = useCart();
   const [orderID, setOrderID] = React.useState(null);
   const [isOrderComplete, setIsOrderComplete] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);

   const onClickOrder = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post(
            "https://61fce5c6f62e220017ce41fd.mockapi.io/orders",
            { items: cartItems }
         );
         setOrderID(data.id);
         setIsOrderComplete(true);
         setCartItems([]);
         for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete(
               `https://61fce5c6f62e220017ce41fd.mockapi.io/cart/${item.id}`
            );
            await delay;
         }
      } catch (error) {
         alert("Ошибка при создании заказа :(");
      }
      setIsLoading(false);
   };
   {
      opened
         ? (document.body.style.overflow = "hidden")
         : (document.body.style.overflow = "");
   }
   return (
      <div className={`${styles.overlay} ${opened && styles.overlayVisible}`}>
         {opened &&
            document.querySelector("body").classList.add(styles.lockBody)}
         <div className={styles.drawer}>
            <h2 className="d-flex mb-30 justify-between">
               Корзина
               <img
                  src="img/btn-remove.svg"
                  alt="Remove"
                  className="removeBtn cu-p"
                  onClick={onClose}
               />
            </h2>
            {items.length > 0 ? (
               <>
                  <div className={styles.items}>
                     {items.map((obj) => (
                        <div
                           key={obj.id}
                           className="cartItem d-flex aligh-items mb-20"
                        >
                           <div
                              className="cartItemImg"
                              style={{
                                 backgroundImage: `url(${obj.imageUrl})`,
                              }}
                           ></div>
                           <div className="mr-20 flex">
                              <p className="mb-5">{obj.title}</p>
                              <b>{obj.price} руб.</b>
                           </div>
                           <img
                              src="img/btn-remove.svg"
                              alt="Remove"
                              className="removeBtn"
                              onClick={() => onRemove(obj.id)}
                           />
                        </div>
                     ))}
                  </div>
                  <div className="cartTotalBlock">
                     <ul>
                        <li className="d-flex">
                           <span>Итого:</span>
                           <div></div>
                           <b>{totalPrice} руб.</b>
                        </li>
                        <li className="d-flex">
                           <span>Налог 5%: </span>
                           <div></div>
                           <b>{0.05 * totalPrice} руб.</b>
                        </li>
                     </ul>
                     <button
                        disabled={isLoading}
                        className="greenButton"
                        onClick={onClickOrder}
                     >
                        Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                     </button>
                  </div>
               </>
            ) : (
               <Info
                  image={
                     isOrderComplete
                        ? "img/complete-order.jpg"
                        : "img/empty-cart.jpg"
                  }
                  title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                  description={
                     isOrderComplete
                        ? `Ваш заказ #${orderID} скоро будет передан курьерской доставке`
                        : "Добавте хотя бы одну пару кроссовок, чтобы сделать заказ"
                  }
               />
            )}
         </div>
      </div>
   );
}

export default Drawer;
