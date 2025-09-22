import {Text, View, StyleSheet, Pressable} from "react-native";
import Colors from "../../constants/colors";

export default function ActionButton({onPress, children}) {
    return (
        <View style={styles.buttonOuterFrame}>
            <Pressable
                style={styles.buttonInnerFrame}
                onPress={onPress}
                android_ripple={{color: Colors.primary800, foreground: true}}
            >
                {/*<Text selectable={false} style={styles.textContainer}>*/}
                    {children}
                {/*</Text>*/}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterFrame: {
        marginVertical: 6,
        overflow: 'hidden',
        // borderRadius:20
    },
    buttonInnerFrame: {
        // backgroundColor: Colors.primary500,
        paddingHorizontal: 15,
        paddingVertical: 4,
    }, textContainer: {
        textAlign: 'center',
        // color: Colors.accent500,
        // fontSize: 30,
        // fontWeight: 'bold',
    }
})