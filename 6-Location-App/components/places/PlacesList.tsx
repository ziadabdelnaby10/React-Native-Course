import {FlatList, StyleSheet, Text, View} from "react-native";
import {PlacesProps} from "./type";
import PlaceItem from "./PlaceItem";
import {Colors} from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {pages} from "../../utils/pages";

type PlaceDetailsNavigationProps = NativeStackNavigationProp<RootStackParamList, "placeDetails">;

export default function PlacesList(places: PlacesProps) {

    const navigation = useNavigation<PlaceDetailsNavigationProps>();

    function handleOnItemPress(placeId: number) {
        navigation.navigate(pages.place_details, {placeId})
    }

    if (!places || places.items.length === 0) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No Places added yet - start adding some!</Text>
        </View>;
    }

    return (
        <FlatList data={places.items} style={styles.list}
                  renderItem={(props) => <PlaceItem item={props.item}
                                                    onPress={handleOnItemPress}></PlaceItem>}
                  keyExtractor={({id}) => id.toString()}/>
    );
}

const styles = StyleSheet.create({
    list: {margin: 24},
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    }
})