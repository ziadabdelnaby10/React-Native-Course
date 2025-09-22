import {Pressable, StyleSheet, Text, View} from "react-native";

export function GoalItem(props) {
    return (
        <View style={styles.goalItem}>
            <Pressable android_ripple={{color: '#310470'}} style={({pressed}) => pressed && styles.pressedItem}
                       onPress={() => props.onRemove(props.id)}>
                <Text style={styles.textStyle}>{props.text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
        color: 'white',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
        color: 'white',
    },
    pressedItem: {
        opacity: 0.5
    }
})