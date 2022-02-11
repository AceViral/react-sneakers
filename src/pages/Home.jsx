import Card from "../components/Card/Card.js";

function Home({
   items,
   searchValue,
   setSearchValue,
   onChangeSearchInput,
   onAddToFavorite,
   onAddToCart,
   isLoading,
}) {
   const renderItems = () => {
      return (
         isLoading
            ? [...Array(12)]
            : items.filter((item) =>
                 item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
      ).map((item, index) => (
         <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
         />
      ));
   };
   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>
               {searchValue
                  ? `Поиск по запросу: "${searchValue}"`
                  : "Все кроссовки"}
            </h1>
            <div className="search-block">
               <img src="img/search.svg" alt="Search" />
               {searchValue && (
                  <img
                     src="img/btn-remove.svg"
                     alt="Clear"
                     className="clear cu-p"
                     onClick={() => setSearchValue("")}
                  />
               )}

               <input
                  type="text"
                  value={searchValue}
                  onChange={onChangeSearchInput}
                  placeholder="Поиск..."
               />
            </div>
         </div>

         <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
   );
}
export default Home;
