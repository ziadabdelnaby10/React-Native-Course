import PlacesList from "../components/places/PlacesList";
import {Place} from "../components/places/type";
import {useEffect, useState} from "react";
import {RouteProp, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../types";
import {fetchPlaces} from "../utils/database";

type AllPlaceRouteProp = RouteProp<RootStackParamList, 'allPlaces'>

export default function AllPlacesScreen() {

    const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute<AllPlaceRouteProp>();

    useEffect(() => {

        async function loadPLaces() {
            return fetchPlaces();
        }

        if (isFocused && route.params) {
            loadPLaces().then((value) => setLoadedPlaces(value));
            // setLoadedPlaces(prevState => [...prevState, route.params!!]);
        }
    }, [isFocused, route]);

    // const loadedPlaces: Place[] = [];
    // {
    //     id: new Date().toString() + Math.random().toString(),
    //         title: "Welcome",
    //     address: "Asdasdasd",
    //     imageUri: "asdasd",
    //     location: {lng: 21, lat: 36}
    // }
    return (
        <PlacesList items={loadedPlaces}></PlacesList>
    );
}