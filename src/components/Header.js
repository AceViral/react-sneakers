import React from "react";
import { Link } from "react-router-dom";
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
               <img width={40} height={40} src="img/logo.png" alt="logo" />
               =======
               <img width={40} height={40} src={logo} alt="logo" />
               <div>
                  <h3 className="text-uppercase">React Sneakers</h3>
                  <p className="opacity-5">Магазин лучших кроссовок</p>
               </div>
            </div>
         </Link>
         <ul className="headerRight d-flex">
            <li className="mr-30 cu-p" onClick={props.onClickCart}>
               <img width={18} height={18} src="img/cart.svg" alt="cart" />
               <img width={18} height={18} src={cart} alt="cart" />
               <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-20 cu-p">
               <Link to="/react-sneakers/favorites">
                  <img width={18} height={18} src="img/like.svg" alt="like" />
                  <img width={18} height={18} src={like} alt="like" />
               </Link>
            </li>
            <li>
               <Link to="/react-sneakers/orders">
                  <img width={18} height={18} src="img/user.svg" alt="user" />
                  <img width={18} height={18} src={user} alt="user" />
               </Link>
            </li>
         </ul>
      </header>
   );
}

export default Header;
