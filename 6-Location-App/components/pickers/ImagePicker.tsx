import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {launchCameraAsync, launchImageLibraryAsync, PermissionStatus, useCameraPermissions} from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
// import {useCameraPermissions} from "expo-camera";

type ImagePickerProps = {
    onPickImage: (image: string) => void;
}

export default function ImagePicker({onPickImage}: ImagePickerProps) {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const [permission, requestPermission] = useCameraPermissions();

    // if (!permission) {
    //     // Camera permissions are still loading.
    //     return <View/>;
    // }
    //
    // if (!permission.granted) {
    //     // Camera permissions are not granted yet.
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.message}>We need your permission to show the camera</Text>
    //             <Button onPress={requestPermission} title="grant permission"/>
    //         </View>
    //     );
    // }

    async function verifyPermissions() {
        if (permission?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (permission?.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "You need to grant camera permissions to use this app.");
            return false;
        }
        return true;
    }

    async function takeImageHandler() {

        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image);

        if (image !== null && !image.canceled) {
            setImageUri(image.assets[0].uri);
            onPickImage(image.assets[0].uri);
        }
    }

    async function pickImageHandler() {

        let result = await launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (result !== null && !result.canceled) {
            setImageUri(result.assets[0].uri);
        }

    }

    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            {imageUri && <Image source={{uri: imageUri}} style={styles.image}/>}
            {!imageUri && <Text>No image taken yet.</Text>}
        </View>
        <View style={styles.buttonsContainer}>
            <OutlinedButton onPress={pickImageHandler} icon={"cloud-upload"}>Pick an Image</OutlinedButton>
            <OutlinedButton onPress={takeImageHandler} icon={"camera"}>Take an Image</OutlinedButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: "100%"
    },
    imageContainer: {
        marginVertical: 8,
        width: "100%",
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: "100%",
        height: "100%",
    },
})