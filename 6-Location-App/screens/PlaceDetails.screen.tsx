import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import {Colors} from "../constants/colors";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../types";
import {pages} from "../utils/pages";
import {useEffect, useState} from "react";
import {fetchPlaceDetails} from "../utils/database";
import {Place} from "../components/places/type";

type PlaceDetailsRouteProp = RouteProp<RootStackParamList, 'placeDetails'>

export default function PlaceDetailsScreen() {
    const [placeDetail, setPlaceDetail] = useState<Place>();

    const route = useRoute<PlaceDetailsRouteProp>();

    const selectedPlaceId = route.params.placeId;


    useEffect(() => {
        if (selectedPlaceId)
            fetchPlaceDetails(selectedPlaceId).then(value => setPlaceDetail(value));
    }, [selectedPlaceId]);

    function showOnMapHandler() {
        // @ts-ignore
        useNavigation().navigate(pages.map);
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: placeDetail?.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{placeDetail?.address}</Text>
                </View>
                <OutlinedButton icon={"map"} onPress={showOnMapHandler}>
                    View on Map Handler
                </OutlinedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "35%",
        minHeight: 300
    }, locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    }, addressContainer: {
        padding: 20
    }, address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
})