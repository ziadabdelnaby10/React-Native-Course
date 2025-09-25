import {Image, StyleSheet, Text, View} from "react-native";
import {PressableCard} from "./PressableCard";

export default function MealItem({title, imageUrl, duration, complexity, affordability, onPress}) {
    return (
        <PressableCard onPress={onPress} rootStyle={styles.mealItem}>
            <View>
                <Image style={styles.image} source={{uri: imageUrl}}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.description}>
                <Text>{duration}m</Text>
                <Text>{complexity.toUpperCase()}</Text>
                <Text>{affordability.toUpperCase()}</Text>
            </View>
        </PressableCard>
        /*<View style={styles.mealItem}>
            <Pressable onPress={onPress} android_ripple={{color: "#ccc", foreground: true}}>

            </Pressable>
        </View>*/
    )
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 16,
        elevation: 4,
        shadowColor: "white",
        backgroundColor: '#607D8B',
    }, image: {
        width: "100%",
        height: 200,
    }, title: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        margin: 8
    }, description: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 8
    }, descriptionText: {
        fontSize: 12,
        textAlign: "center"

    }
})