import React from "react";
import AppContext from "../Context";

const Info = ({ image, title, description }) => {
   const { setCartOpened } = React.useContext(AppContext);
   return (
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
         <img src={image} alt="empty-cart" className="mb-20" width="120px" />
         <h2>{title}</h2>
         <p className="opacity-6">{description}</p>
         <button className="greenButton" onClick={() => setCartOpened(false)}>
            <img src="img/arrow.svg" alt="Arrow" />
            Вернутся назад
         </button>
      </div>
   );
};

export default Info;
