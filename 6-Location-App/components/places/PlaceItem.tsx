import {Place} from "./type";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../constants/colors";

type PlaceItemProps = {
    item: Place;
    onPress: (placeId : number) => void;
}

export default function PlaceItem({item, onPress}: PlaceItemProps) {
    return (
        <Pressable onPress={() => onPress(item.id)} style={({pressed}) => [styles.item, pressed && styles.pressed]}>
            <Image source={{uri: item.imageUri}} style={styles.image}/>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
    },
    pressed: {opacity: 0.9},
    image: {flex: 1, borderBottomEndRadius: 4, borderTopEndRadius: 4, height: 100,},
    info: {flex: 2, padding: 12},
    title: {fontWeight: "bold", fontSize: 18, color: Colors.gray700},
    address: {fontSize: 12, color: Colors.gray700},
});