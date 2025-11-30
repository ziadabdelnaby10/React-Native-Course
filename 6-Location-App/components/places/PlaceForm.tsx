import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useCallback, useState} from "react";
import {Colors} from "../../constants/colors";
import ImagePicker from "../pickers/ImagePicker";
import LocationPicker from "../pickers/LocationPicker";
import {Button} from "../ui/Button";
import {LocationObject} from "expo-location";
import {Place} from "./type";

type PlaceFormProps = {
    onSubmitPlace: (place: Place) => void
}

export function PlaceForm({onSubmitPlace}: PlaceFormProps) {

    const [enteredTitle, setEnteredTitle] = useState<string>();
    const [location, setLocation] = useState<LocationObject>();
    const [detailedAddress, setDetailedAddress] = useState<string>();
    const [imageUri, setImageUri] = useState<string>();

    function changeTitleHandler(enteredText: string) {
        setEnteredTitle(enteredText);
    }

    const changeLocationHandler = useCallback((pickedLocation: LocationObject, address: string) => {
        setLocation(pickedLocation);
        setDetailedAddress(address);
    }, []);

    function changeImageUriHandler(enteredImageUri: string) {
        setImageUri(enteredImageUri);
    }

    function savePlaceHandler() {
        console.log(enteredTitle);
        console.log(location);
        console.log(detailedAddress);
        console.log(imageUri);

        if (detailedAddress && location && imageUri && enteredTitle) {
            const place: Place = {
                id: new Date().toString() + Math.random().toString(),
                address: detailedAddress,
                title: enteredTitle,
                imageUri: imageUri,
                location: {lat: location.coords.latitude, lng: location.coords.longitude},
            }

            onSubmitPlace(place);
        }

    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
                <ImagePicker onPickImage={changeImageUriHandler}/>
                <LocationPicker onPickLocation={changeLocationHandler}/>
                <Button onPress={savePlaceHandler} children={"Add PLace"}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    }
})