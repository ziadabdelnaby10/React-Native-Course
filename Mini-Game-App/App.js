import {ImageBackground, StyleSheet} from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import {GameScreen} from "./screens/GameScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GameOverScreen} from "./screens/GameOverScreen";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [isFontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })

    const [computedNumber, setComputedNumber] = useState();
    const [roundsNumber, setRoundsNumber] = useState();
    const [isGameOver, setIsGameOver] = useState(true);

    useEffect(() => {
        if (isFontsLoaded) {
            console.log("Font loaded");
            SplashScreen.hideAsync();
        }
    }, [isFontsLoaded]);

    if (!isFontsLoaded) {
        return null;
    }

    let screen = <StartGameScreen onPickedNumber={onPickNumberHandler}/>;

    function onPickNumberHandler(inputNumber) {
        setComputedNumber(inputNumber);
        setIsGameOver(false);
    }

    function onGameOverHandler(roundNumber) {
        setRoundsNumber((prevRoundsNumber) => roundNumber);
        setIsGameOver(true);
    }

    function onStartNewGame() {
        // setIsGameOver(false);
        setComputedNumber(null);
        setRoundsNumber(null);
        screen = <StartGameScreen onPickedNumber={onPickNumberHandler}/>;
    }

    if (computedNumber) {
        screen = <GameScreen userNumber={computedNumber} onGameOver={onGameOverHandler}/>
    }

    if (isGameOver && computedNumber) {
        screen = <GameOverScreen userNumber={computedNumber} roundsNumber={roundsNumber} onStartNewGame={onStartNewGame}/>
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={["#3a393a", "#d6d6d6"]}>
            <ImageBackground
                source={require('./assets/background.png')}
                resizeMode="cover"
                style={styles.container}
                imageStyle={styles.backgroundImage}>
                <SafeAreaProvider style={{flex: 1}}>{screen}</SafeAreaProvider>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, backgroundImage: {
        opacity: 0.25
    }
});
