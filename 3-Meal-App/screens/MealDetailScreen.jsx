import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
// import {useContext, useLayoutEffect} from "react";
import {useLayoutEffect} from "react";
import {IconButton} from "../components/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {addFavourite, removeFavourite} from "../store/redux/favourites";

// import {FavouritesContext} from "../store/context/favourites-context";

export function MealDetailScreen() {
    // const favouriteContext = useContext(FavouritesContext);
    const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const route = useRoute();

    const meal = route.params.meal;

    // const mealIsFavourite = favouriteContext.ids.includes(meal.id);
    const mealIsFavourite = favouriteMealIds.includes(meal.id);

    const handleFavouriteBtn = () => {
        if (mealIsFavourite) {
            // favouriteContext.removeFavourite(meal.id);
            dispatch(removeFavourite({id: meal.id}));
        } else {
            // favouriteContext.addFavourite(meal.id);
            dispatch(addFavourite({id: meal.id}));
        }
        // console.log(favouriteContext.ids);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon={mealIsFavourite ? "star" : "star-outline"}
                                           color={"white"}
                                           size={24}
                                           onPress={handleFavouriteBtn}/>
        });
        //     favouriteContext.ids
    }, [navigation,favouriteMealIds]);
    return (<ScrollView style={{marginBottom: 24}}>
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: meal.imageUrl}}/>
            <Text style={styles.title}>{meal.title}</Text>
            <View style={styles.description}>
                <Text style={styles.detailText}>{meal.duration}m</Text>
                <Text style={styles.detailText}>{meal.complexity.toUpperCase()}</Text>
                <Text style={styles.detailText}>{meal.affordability.toUpperCase()}</Text>
            </View>
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Text style={styles.subtitle}>Ingredients</Text>
                    {meal.ingredients.map((ingredient) => <View key={ingredient} style={styles.listItem}>
                        <Text style={styles.itemText}>{ingredient}</Text>
                    </View>)}
                    <Text style={styles.subtitle}>Steps</Text>
                    {meal.steps.map((step) =>
                        <View key={step} style={styles.listItem}>
                            <Text style={styles.itemText}>{step}</Text>
                        </View>)}
                </View>
            </View>
        </View>
    </ScrollView>)
}

const styles = StyleSheet.create({
    container: {}, title: {
        color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center", margin: 8
    }, detailText: {
        color: "white",
    }, image: {
        width: "100%", height: "300"
    }, description: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", padding: 8
    }, subtitle: {
        // alignSelf: "center",
        // width: "auto",

        color: "#8fadbc",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 4,
        marginHorizontal: 24,
        padding: 6,
        textAlign: "center",
        borderColor: "#B0BEC5",
        borderBottomWidth: 3,
    }, listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#8fadbc",
    }, itemText: {
        fontSize: 18, color: "black", textAlign: "center",
    }, listOuterContainer: {
        alignItems: "center"
    }
    , listContainer: {
        width: "80%",
    }
})