import {createContext, useState} from "react";

export const FavouritesContext = createContext({
    ids: [],
    addFavourite: (id) => {
    },
    removeFavourite: (id) => {
    },
})

export default function FavouritesContextProvider({children}) {
    const [favouriteIds, setFavouriteIds] = useState([]);

    function addFavourite(id) {
        setFavouriteIds((prevState) => [...prevState, id]);
    }

    function removeFavourite(id) {
        setFavouriteIds((prevState) =>
            prevState.filter(mealId => mealId !== id),
        );
    }

    const value = {
        ids: favouriteIds,
        addFavourite: addFavourite,
        removeFavourite: removeFavourite,
    }

    return <FavouritesContext.Provider value={value}>
        {children}
    </FavouritesContext.Provider>
}