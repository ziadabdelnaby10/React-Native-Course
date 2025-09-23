import {StyleSheet, Text, View} from "react-native";

export function Title({children}) {
    return (
        <View>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 29,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center',
        padding: 12,
        maxWidth: '80%'
    }
})