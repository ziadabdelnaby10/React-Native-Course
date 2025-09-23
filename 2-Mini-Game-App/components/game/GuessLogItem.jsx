import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";

export function GuessLogItem({roundNumber, guess}) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary800,
        borderWidth: 1,
        borderStyle: "dashed",
        padding: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        // backgroundColor:Colors.primary800,
    }, itemText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    }
})