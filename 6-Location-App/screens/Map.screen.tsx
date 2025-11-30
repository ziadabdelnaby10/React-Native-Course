import MapView, {MapPressEvent, Marker} from "react-native-maps";
import {Alert, StyleSheet} from "react-native";
import {useCallback, useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {pages} from "../utils/pages";
import IconButton from "../components/ui/IconButton";
import {RootStackParamList} from "../types";

type MapNavigationProp = NativeStackNavigationProp<RootStackParamList, 'map'>;

export default function MapScreen() {

    const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

    const navigation = useNavigation<MapNavigationProp>();

    const region = {
        latitude: 30.0956792,
        longitude: 31.2654979,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No Location selected", "Please select a location first");
            return;
        }

        navigation.navigate(pages.add_place, {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        });
    }, [selectedLocation, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton icon={"save"} size={24} onPress={savePickedLocationHandler} color={tintColor}/>)
        });
    }, [navigation, savePickedLocationHandler]);

    function handleLocationChange(event: MapPressEvent) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat: lat, lng: lng})
    }

    return (
        <MapView initialRegion={region} style={styles.map} onPress={handleLocationChange}>
            {selectedLocation && (
                <Marker coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}}/>)}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {flex: 1, width: "100%", height: "100%"}
})