import {TextInput, View, StyleSheet, Alert, Text, KeyboardAvoidingView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import Colors from "../constants/colors";
import {Title} from "../components/ui/Title";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Card} from "../components/ui/Card";
import {InstructionText} from "../components/ui/InstructionText";

export default function StartGameScreen({onPickedNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    function handleNumberInput(enteredNewNumber) {
        setEnteredNumber((old) => enteredNewNumber);
    }

    function handleReset() {
        setEnteredNumber('');
    }

    function handleSubmit() {
        const parsedNumber = parseInt(enteredNumber);

        if (Number.isNaN(parsedNumber) || parsedNumber <= 0 || parsedNumber > 99) {
            Alert.alert(
                'Invalid Number',
                'Please enter a number between 0 & 99.',
                [{text: 'Okay', style: 'destructive', onPress: handleReset}],
            );
            return;
        }

        onPickedNumber(parsedNumber);
    }

    return (
        <SafeAreaProvider style={styles.root}>
            {/*<KeyboardAvoidingView behavior="height">*/}
                <Title>Guess My Number</Title>
                <Card>
                    <InstructionText>Enter a Number</InstructionText>
                    <TextInput style={styles.textInput}
                               cursorColor={Colors.accent500}
                               textAlign={"center"}
                               maxLength={2}
                               keyboardType={"numeric"}
                               autoCapitalize="none"
                               onChangeText={handleNumberInput}
                               value={enteredNumber}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton position={1} onPress={handleSubmit}>Confirm</PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton position={2} onPress={handleReset}>Reset</PrimaryButton>
                        </View>
                    </View>
                </Card>
            {/*</KeyboardAvoidingView>*/}
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    }, buttonContainer: {
        flex: 1,
        marginHorizontal: 4
    },
    textInput: {
        width:50,
        fontSize: 32,
        fontWeight: 'bold',
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginBottom: 8,

    },

})