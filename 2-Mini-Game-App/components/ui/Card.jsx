import {Dimensions, StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";

export function Card({children , style}) {
    return (
        <View style={[styles.container , style]}>
            {children}
        </View>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        width: "80%",
        padding: 16,
        paddingHorizontal:25,
        // marginHorizontal: 24,
        // borderRadius: 8,
        borderTopStartRadius: 32,
        borderBottomEndRadius: 32,
        // marginTop: 20,
        backgroundColor: Colors.primary800,
        elevation: 100,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
})