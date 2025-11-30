import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

type IconButtonProps = {
    icon: string | any;
    size?: number;
    color?: string;
    onPress?: () => void;
}

export default function IconButton({icon, onPress, color, size}: IconButtonProps) {
    return (
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons name={icon} size={size ?? 20} color={color}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
})