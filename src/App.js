import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import AppContext from "./Context";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
   const [items, setItems] = React.useState([]);
   const [cartItems, setCartItems] = React.useState([]);
   const [favorites, setFavorites] = React.useState([]);
   const [cartOpened, setCartOpened] = React.useState(false);
   const [searchValue, setSearchValue] = React.useState("");
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      try {
         async function fetchData() {
            setIsLoading(true);
            const [cartResponce, favoriteResponce, itemsResponce] =
               await Promise.all([
                  axios.get("https://61fce5c6f62e220017ce41fd.mockapi.io/cart"),
                  axios.get(
                     "https://61fce5c6f62e220017ce41fd.mockapi.io/favorite"
                  ),
                  axios.get(
                     "https://61fce5c6f62e220017ce41fd.mockapi.io/items"
                  ),
               ]);

            setIsLoading(false);

            setCartItems(cartResponce.data);
            setFavorites(favoriteResponce.data);
            setItems(itemsResponce.data);
         }
         fetchData();
      } catch (error) {
         alert("Ошибка при запросе данных :(");
      }
   }, []);

   const onAddToCart = async (obj) => {
      try {
         const findItem = cartItems.find(
            (item) => Number(item.parentID) === Number(obj.id)
         );
         if (findItem) {
            setCartItems((prev) =>
               prev.filter((item) => Number(item.parentID) !== Number(obj.id))
            );
            await axios.delete(
               `https://61fce5c6f62e220017ce41fd.mockapi.io/cart/${findItem.id}`
            );
         } else {
            setCartItems((prev) => [...prev, obj]);
            const { data } = await axios.post(
               "https://61fce5c6f62e220017ce41fd.mockapi.io/cart",
               obj
            );
            setCartItems((prev) =>
               prev.map((item) => {
                  if (item.parentID === data.parentID) {
                     return { ...item, id: data.id };
                  } else return item;
               })
            );
         }
      } catch (error) {
         alert("Не удалось добавить в корзину :(");
      }
   };
   const onRemoveItem = async (id) => {
      try {
         setCartItems((prev) =>
            prev.filter((item) => Number(item.id) !== Number(id))
         );
         await axios.delete(
            `https://61fce5c6f62e220017ce41fd.mockapi.io/cart/${id}`
         );
      } catch (error) {
         alert("Ошибка при удалении товара из корзины :(");
      }
   };
   const onAddToFavorite = async (obj) => {
      try {
         if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
            setFavorites((prev) =>
               prev.filter((item) => Number(item.id) !== Number(obj.id))
            );
            await axios.delete(
               `https://61fce5c6f62e220017ce41fd.mockapi.io/favorite/${obj.id}`
            );
         } else {
            const { data } = await axios.post(
               "https://61fce5c6f62e220017ce41fd.mockapi.io/favorite",
               obj
            );
            setFavorites((prev) => [...prev, data]);
         }
      } catch (error) {
         alert("Не удалось добавить в закладки :(");
      }
   };

   const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
   };
   const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.parentID) === Number(id));
   };

   return (
      <AppContext.Provider
         value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            onAddToCart,
            setCartOpened,
            setCartItems,
         }}
      >
         <div className="wrapper clear">
            <Drawer
               onClose={() => setCartOpened(false)}
               items={cartItems}
               onRemove={onRemoveItem}
               opened={cartOpened}
            />
            <Header onClickCart={() => setCartOpened(true)} />
            <Routes>
               <Route
                  path="/"
                  exact
                  element={
                     <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                     />
                  }
               ></Route>
               <Route path="/favorites" exact element={<Favorites />}></Route>
               <Route path="/orders" exact element={<Orders />}></Route>
            </Routes>
         </div>
      </AppContext.Provider>
   );
}

export default App;
