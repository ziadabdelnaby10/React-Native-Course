import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Title} from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

export function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <Title>GAME IS OVER !</Title>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/success.png')}/>
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed
                    <Text style={styles.highlightText}> {roundsNumber} </Text>
                    rounds to guess the number
                    <Text style={styles.highlightText}> {userNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }, imageContainer: {
        width: deviceWidth < 350 ? 150 : 300,
        height: deviceWidth < 350 ? 150 : 300,
        borderRadius: deviceWidth < 350 ? 150 : 175,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36
    }, image: {
        width: '100%',
        height: '100%',
    }, summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        margin: 8,
        textAlign: "center"
    }, highlightText: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary600
    }
})