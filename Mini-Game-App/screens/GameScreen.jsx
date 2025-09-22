import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {Title} from "../components/ui/Title";
import {useEffect, useState} from "react";
import {NumberContainer} from "../components/game/NumberContainer";
import ActionButton from "../components/ui/ActionButton";
import {Card} from "../components/ui/Card";
import {InstructionText} from "../components/ui/InstructionText";
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from "../constants/colors";
import {GuessLogItem} from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const random = Math.floor(Math.random() * (max - min) + min);

    if (random === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return random;
}

let minBoundary = 1;
let maxBoundary = 100;

export function GameScreen({userNumber, onGameOver}) {

    const [previousLogs, setPreviousLogs] = useState([])

    // const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(() => {
        return generateRandomBetween(1, 100, userNumber);
    });

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(previousLogs.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    //direction ==> '-' , '+'
    function nextGuessHandler(direction) {
        if (direction === '-' && currentGuess < userNumber || direction === '+' && currentGuess > userNumber) {
            Alert.alert("Do not Lie!",
                "You know That this is wrong!",
                [
                    {text: "Sorry!", style: "cancel"},
                ]
            );
            return;
        }

        if (direction === '-') {
            maxBoundary = currentGuess;
        } else if (direction === '+') {
            minBoundary = currentGuess + 1;
        }
        const newRandom = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        console.log(newRandom + " - " + minBoundary + " - " + maxBoundary + " - " + currentGuess);
        setCurrentGuess(newRandom);
        setPreviousLogs((prevLogs) => [newRandom.toString(), ...prevLogs]);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <View>
                    <InstructionText style={{marginBottom: 8}}>Lower or Higher ?</InstructionText>
                    <View style={styles.actionButtons}>
                        <ActionButton onPress={() => nextGuessHandler('-')}>
                            <AntDesign name="minus-circle" size={40} color={Colors.accent500}/>
                        </ActionButton>
                        <ActionButton onPress={() => nextGuessHandler('+')}>
                            <AntDesign name="plus-circle" size={40} color={Colors.accent500}/>
                        </ActionButton>
                    </View>
                </View>
            </Card>
            <View style={styles.logs}>
                <FlatList data={previousLogs}
                          keyExtractor={(item) => item}
                          renderItem={(itemData) => <GuessLogItem roundNumber={previousLogs.length - itemData.index} guess={itemData.item} />}/>
                {/*previousLogs.map((log, index) => (<InstructionText key={index}>{log}</InstructionText>))*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    }, actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    logs: {
        flex: 1, justifyContent: "start",
        alignItems: "center", marginTop: 20
    }

})