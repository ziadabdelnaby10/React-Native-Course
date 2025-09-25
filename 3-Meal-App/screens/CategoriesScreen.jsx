import {CATEGORIES} from "../data/dummy-data";
import {FlatList} from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import {useNavigation} from "@react-navigation/native";


export default function CategoriesScreen() {

    const navigation = useNavigation();

    function renderCategoriesView({item}) {

        return <CategoryGridTile title={item.title}
                                 color={item.color}
                                 onPress={() => navigation.navigate('MealOverView', {categoryId: item.id})}
        />;
    }

    return (
        <>
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoriesView}
                numColumns={2}
            />
        </>
    );
}