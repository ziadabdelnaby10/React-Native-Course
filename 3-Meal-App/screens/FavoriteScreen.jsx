import {FlatList, StyleSheet, Text, View} from "react-native";
import MealItem from "../components/MealItem";
// import {useContext} from "react";
// import {FavouritesContext} from "../store/context/favourites-context";
import {MEALS} from "../data/dummy-data";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";

export default function FavoriteScreen() {

    const favouriteMeals = useSelector((state) => state.favouriteMeals.ids);
    const navigation = useNavigation();

    // const favouriteMeals = useContext(FavouritesContext);

    // const displayedMeals = MEALS.filter(meal => favouriteMeals.ids.includes(meal.id));
    const displayedMeals = MEALS.filter(meal => favouriteMeals.includes(meal.id));

    function renderMealDetails({item}) {
        return <MealItem
            {...item} onPress={() => navigation.navigate("MealDetail", {meal: item})}
        />
    }

    if (displayedMeals.length <= 0) {
        return <View style={styles.container}>
            <Text style={{color:"white" , textAlign:"center"}}>No Favourite Meal</Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            <FlatList data={displayedMeals}
                      keyExtractor={(item) => item.id}
                      renderItem={renderMealDetails}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "stretch",
    }
})