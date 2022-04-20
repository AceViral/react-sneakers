import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context";
import useCart from "./Hooks/useCart";
import logo from "../img/logo.png";
import cart from "../img/cart.svg";
import like from "../img/like.svg";
import user from "../img/user.svg";
function Header(props) {
   const { totalPrice } = useCart();
   return (
      <header className="d-flex justify-between align-center p-40">
         <Link to="/react-sneakers/">
            <div className="d-flex aligh-center">
<<<<<<< HEAD
               <img width={40} height={40} src="img/logo.png" alt="logo" />
=======
               <img width={40} height={40} src={logo} alt="logo" />
>>>>>>> fcb327b2e1d4a3a3312495bbbcd89558eb7829d1
               <div>
                  <h3 className="text-uppercase">React Sneakers</h3>
                  <p className="opacity-5">Магазин лучших кроссовок</p>
               </div>
            </div>
         </Link>
         <ul className="headerRight d-flex">
            <li className="mr-30 cu-p" onClick={props.onClickCart}>
<<<<<<< HEAD
               <img width={18} height={18} src="img/cart.svg" alt="cart" />
=======
               <img width={18} height={18} src={cart} alt="cart" />
>>>>>>> fcb327b2e1d4a3a3312495bbbcd89558eb7829d1
               <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-20 cu-p">
               <Link to="/react-sneakers/favorites">
<<<<<<< HEAD
                  <img width={18} height={18} src="img/like.svg" alt="like" />
=======
                  <img width={18} height={18} src={like} alt="like" />
>>>>>>> fcb327b2e1d4a3a3312495bbbcd89558eb7829d1
               </Link>
            </li>
            <li>
               <Link to="/react-sneakers/orders">
<<<<<<< HEAD
                  <img width={18} height={18} src="img/user.svg" alt="user" />
=======
                  <img width={18} height={18} src={user} alt="user" />
>>>>>>> fcb327b2e1d4a3a3312495bbbcd89558eb7829d1
               </Link>
            </li>
         </ul>
      </header>
   );
}

export default Header;
