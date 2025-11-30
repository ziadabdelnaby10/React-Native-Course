import {PlaceForm} from "../components/places/PlaceForm";
import {useNavigation} from "@react-navigation/native";
import {Place} from "../components/places/type";
import {pages} from "../utils/pages";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {insertPlace} from "../utils/database";
import {Alert} from "react-native";

type AllPlaceNavigationProps = NativeStackNavigationProp<RootStackParamList, "allPlaces">;

export default function AddPlaceScreen() {

    const navigation = useNavigation<AllPlaceNavigationProps>();

    async function handleSubmitPlace(place: Place) {
        try {
            await insertPlace(place);
            navigation.navigate(pages.all_places , place);
        }catch(e) {
            Alert.alert("Failed to add place", (e as Error).message);
            console.error(e);
        }
    }

    return (
        <PlaceForm onSubmitPlace={handleSubmitPlace}/>
    );
}