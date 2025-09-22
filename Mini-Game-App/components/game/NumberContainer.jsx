import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";

export function NumberContainer({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.accent500,
        marginTop:24,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    }, numberText: {
        color:Colors.accent500,
        fontFamily:'open-sans-bold',
        fontSize: 50,
    }
})