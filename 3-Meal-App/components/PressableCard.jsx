import {Platform, Pressable, StyleSheet, View} from "react-native";

export function PressableCard({children, rootStyle, pressableStyle, onPress}) {
    return (
        <View style={[styles.container , rootStyle]}>
            <Pressable
                android_ripple={{color: "#ccc", foreground: true}}
                style={({pressed}) => [pressableStyle , (pressed && Platform.OS === 'ios') && {opacity: 0.5}]}
                onPress={onPress}>
                {children}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        backgroundColor: '#B0BEC5',
        //     For IOS
        shadowColor: '#040404',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: 0.25,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    }
})