import {Button, Image, Modal, StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";

const goalImg = require(`../assets/image/goal.png`);

export function GoalInput(props) {
    const [inputGoal, setInputGoal] = useState('');

    // const inputTextGoal = useRef(null);

    function addGoalHandler() {
        if (inputGoal === '' || !inputGoal) {
            alert("Sorry, Goal must be provided.");
            return;
        }
        props.onPressEnter(inputGoal);
        // inputTextGoal.current?.clear();
        // inputTextGoal.current?.focus();
        setInputGoal('');
        props.closeModal();
    }

    return (
        <Modal transparent={true}
               visible={props.showModal}
               animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={goalImg}/>
                <TextInput
                    // ref={inputTextGoal}
                    value={inputGoal}
                    placeholder="Your course goal!"
                    style={styles.textInput}
                    onChangeText={setInputGoal}/>
                <View style={styles.footerContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={() => props.closeModal()} color="#f31282"/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Add Goal"
                                color="#b180f0"
                                onPress={addGoalHandler}
                                touchSoundDisabled={true}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b',

    }, textInput: {
        borderStyle: 'solid',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        width: '100%',
        marginHorizontal: 8,
        padding: 16,
    }, footerContainer: {
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'
    }, button: {
        borderWidth: 1,
        borderRadius: 12,
        width: '30%',
        marginHorizontal: 8
    }, image: {
        height: 100,
        width: 100,
        margin: 20
    }

})