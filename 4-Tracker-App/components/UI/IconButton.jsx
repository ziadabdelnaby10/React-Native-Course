import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function IconButton({onPress, icon, color, size}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressStyle}>
            <View style={styles.container}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    }, pressStyle: {
        opacity: 0.75
    }
})