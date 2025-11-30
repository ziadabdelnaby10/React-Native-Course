import {Alert, Image, StyleSheet, Text, View} from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import {Colors} from "../../constants/colors";
import {
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync,
    useForegroundPermissions
} from "expo-location";
import {useEffect, useState} from "react";
import {PermissionStatus} from "expo-image-picker";
import {getLocation, getMapPreview} from "../../utils/location";
import {RouteProp, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {pages} from "../../utils/pages";
import {RootStackParamList} from "../../types";

type AddPlaceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'addPlace'>;
type AddPlaceRouteProp = RouteProp<RootStackParamList, 'addPlace'>;
type LocationPickerProp = {
    onPickLocation: (location: LocationObject, address: string) => void;
}

export default function LocationPicker({onPickLocation}: LocationPickerProp) {

    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const navigation = useNavigation<AddPlaceNavigationProp>();
    const route = useRoute<AddPlaceRouteProp>();
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params;
            setLocation({
                mocked: false,
                timestamp: 0,
                coords: {
                    latitude: mapPickedLocation.latitude,
                    longitude: mapPickedLocation.longitude,
                    accuracy: null,
                    altitudeAccuracy: null,
                    altitude: null,
                    speed: null,
                    heading: null
                }
            });
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (location) {
                const address = await getLocation(location.coords.latitude, location.coords.longitude);
                onPickLocation(location as LocationObject, address);
            }
        }

        handleLocation();
    }, [location, onPickLocation]);

    async function verifyPermissions() {
        if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "You need to grant camera permissions to use this app.");
            return false;
        }
        return true;
    }

    async function getLocationHandler() {

        const status = await requestForegroundPermissionsAsync();
        if (!status.granted) {
            setErrorMsg("Access denied");
            return;
        }

        setLocation({
            mocked: true,
            timestamp: 0,
            coords: {
                latitude: 30.0956792,
                longitude: 31.2654979,
                accuracy: null,
                altitudeAccuracy: null,
                altitude: null,
                speed: null,
                heading: null
            }
        });
        const location = await getCurrentPositionAsync();
        console.log(location);
        setLocation(location);
    }

    function pickOnMapHandler() {
        navigation.navigate(pages.map);
    }

    let locationPreview = <Text>No Location picked yet.</Text>

    if (errorMsg) {
        console.log(errorMsg);
    }

    const pickedCoordinates = (location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    } : undefined);

    if (pickedCoordinates) {
        locationPreview =
            <Image style={styles.mapPreviewImage}
                   source={{uri: getMapPreview(pickedCoordinates.latitude, pickedCoordinates.longitude)}}/>
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon={"location"}>Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon={"map"}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        marginVertical: 8,
        width: "100%",
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    mapPreviewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
})