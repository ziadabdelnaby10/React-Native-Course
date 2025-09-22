import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import {GoalItem} from "./components/GoalItem";
import {GoalInput} from "./components/GoalInput";
import {StatusBar} from "expo-status-bar";

export default function App() {

    const [courseGoals, setCourseGoals] = useState([]);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function addGoalHandler(enteredGoalText) {
        setCourseGoals(currentCourseGoals => [...currentCourseGoals, {
            id: currentCourseGoals.length, text: enteredGoalText
        }]);
    }

    function closeGoalHandler() {
        setModalIsVisible(old => !old);
    }

    function removeGoalHandler(id) {
        console.log(`Delete ${id}`);
        setCourseGoals(currentGoals => currentGoals.filter((goal) => goal.id !== id));
    }

    return (
        <>
            <StatusBar style='light'/>
            <View style={styles.container}>
                <Button title="Add New Goal" color="#5e0acc" onPress={() => setModalIsVisible(old => !old)}/>
                <GoalInput onPressEnter={addGoalHandler} showModal={modalIsVisible} closeModal={closeGoalHandler}/>
                <View style={styles.goalsContainer}>
                    {
                        courseGoals.length === 0 ?
                            <Text style={{fontSize: 25}}>No Data</Text>
                            :
                            <FlatList
                                style={{width: '100%'}}
                                data={courseGoals}
                                keyExtractor={item => item.id}
                                renderItem={
                                    (itemData) =>
                                        //itemData holds 2 props (index - item )
                                        // console.log(itemData);
                                        <GoalItem text={itemData.item.text} id={itemData.item.id}
                                                  onRemove={removeGoalHandler}/>
                                }>
                            </FlatList>
                    }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12
    }, goalsContainer: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
