import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";

export function Card({children}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 24,
        // borderRadius: 8,
        borderTopStartRadius: 32,
        borderBottomEndRadius: 32,
        marginTop: 100,
        backgroundColor: Colors.primary800,
        elevation: 100,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
})