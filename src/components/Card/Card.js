import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../Context";

const MyLoader = (props) => (
   <ContentLoader
      speed={2}
      width={180}
      height={253.35}
      viewBox="0 0 150 187"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
   >
      <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
      <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
      <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
      <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
      <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
   </ContentLoader>
);

function Card({
   id,
   onFavorite,
   onPlus,
   title,
   imageUrl,
   price,
   favorited = false,
   loading = false,
}) {
   const { isItemAdded } = React.useContext(AppContext);
   const [isFavorite, setIsFavorite] = React.useState(favorited);
   const obj = { id, parentID: id, title, imageUrl, price };

   const onClickPlus = () => {
      onPlus(obj);
   };
   const onClickFavorite = () => {
      onFavorite(obj);
      setIsFavorite(!isFavorite);
   };
   return (
      <div className={styles.card}>
         {loading ? (
            <MyLoader />
         ) : (
            <>
               {onFavorite && (
                  <div className={styles.favorite}>
                     <img
                        src={
                           isFavorite
                              ? "/img/liked-heart.svg"
                              : "/img/unliked-heart.svg"
                        }
                        onClick={onClickFavorite}
                        alt="Unliked"
                     />
                  </div>
               )}
               <img width="100%" height={135} src={imageUrl} alt="sneaker" />
               <h5>{title}</h5>
               <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                     <span>Цена:</span>
                     <b>{price} руб.</b>
                  </div>
                  {onPlus && (
                     <img
                        className={styles.plus}
                        src={
                           isItemAdded(id)
                              ? "/img/btn-checked.svg"
                              : "/img/plus-btn.svg"
                        }
                        onClick={onClickPlus}
                        alt="plus"
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
}
export default Card;
