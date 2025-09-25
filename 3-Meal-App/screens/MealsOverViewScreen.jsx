import {FlatList, StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {MEALS} from "../data/dummy-data";
import MealItem from "../components/MealItem";

export default function MealsOverViewScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    const categoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId));

    // const displayedMeals2 = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

    function renderMealDetails({item}) {
        return <MealItem
            {...item} onPress={() => navigation.navigate("MealDetail" , {meal : item})}
        />
    }

    return (
        <View style={styles.container}>
            <FlatList data={displayedMeals}
                      keyExtractor={(item) => item.id}
                      renderItem={renderMealDetails} />
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