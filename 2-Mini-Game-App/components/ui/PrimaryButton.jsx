import {Text, View, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import Colors from "../../constants/colors";

export default function PrimaryButton({position, onPress , children}) {
    return (
        <View style={[styles.buttonOuterFrame, position === 1 ? {
            borderTopStartRadius: 26
        } : {
            borderBottomEndRadius: 26,
        }]}>
            <TouchableOpacity
                activeOpacity={0.1}
                // style={({pressed}) => [
                //     styles.buttonInnerFrame
                //     // , pressed && { opacity: 1 }
                // ]}
                style={styles.buttonInnerFrame}
                onPress={onPress}
                android_ripple={{color: Colors.primary600, foreground: true}}
            >
                <Text selectable={false} style={styles.textContainer}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterFrame: {
        marginVertical: 6,
        overflow: 'hidden',
    },
    buttonInnerFrame: {
        backgroundColor: Colors.primary500,
        paddingHorizontal: 15,
        paddingVertical: 4,
    }, textContainer: {
        textAlign: 'center',
        color: Colors.accent500,
        fontSize: 18,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75
    }
})