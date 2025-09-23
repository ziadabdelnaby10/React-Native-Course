import {Dimensions, StyleSheet, Text, View , useWindowDimensions} from "react-native";
import Colors from "../../constants/colors";

export function NumberContainer({children}) {
    const {width, height} = useWindowDimensions();

    const marginValue = height < 350 ? 12 : 24;

    return (
        <View style={[styles.container , {margin: marginValue}]}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        margin: deviceWidth < 350 ? 12 : 24,
        borderColor: Colors.accent500,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    }, numberText: {
        color:Colors.accent500,
        fontFamily:'open-sans-bold',
        fontSize: 50,
    }
})