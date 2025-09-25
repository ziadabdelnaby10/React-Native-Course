import {Platform, StyleSheet, Text, View} from "react-native";
import {PressableCard} from "./PressableCard";

export default function CategoryGridTile({onPress, title, color}) {
    return (
        <PressableCard onPress={onPress}
                       rootStyle={styles.gridItems}
                       pressableStyle={styles.button}
        >
            <View style={[styles.innerContainer, {backgroundColor: color}]}>
                <Text style={styles.textTitle}>
                    {title}
                </Text>
            </View>
        </PressableCard>
    )
}

const styles = StyleSheet.create({
    gridItems: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
    }, button: {
        flex: 1
    }, innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    }, textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})