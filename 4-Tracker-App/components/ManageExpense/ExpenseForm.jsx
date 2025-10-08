import {Alert, StyleSheet, Text, View} from "react-native";
import ExpenseInput from "./ExpenseInput";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function ExpenseForm({confirmHandler, cancelHandler, isEditing, defaultValue}) {

    // const [date, setDate] = useState(new Date());

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : '', isValid: true
        }, date: {
            value: defaultValue ? getFormattedDate(defaultValue.date) : '', isValid: true
        }, description: {
            value: defaultValue ? defaultValue.description.toString() : '', isValid: true
        }
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        const formIsValid = !amountIsValid || !descriptionIsValid || !dateIsValid
        if (formIsValid) {
            // Alert.alert('Invalid Input', 'Please enter a valid input values.');
            setInputs((prevState) => {
                return {
                    amount: {
                        value: prevState.amount.value,
                        isValid: amountIsValid,
                    },
                    date: {
                        value: prevState.date.value,
                        isValid: dateIsValid,
                    },
                    description: {
                        value: prevState.description.value,
                        isValid: descriptionIsValid,
                    }
                }
            })
            return;
        }

        confirmHandler(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (<View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            {/*{extra}*/}
            {/*<RNDateTimePicker style={{flex:1 , width:100}} value={date} mode={"date"} dateFormat={"day month year"}/>*/}
            <ExpenseInput
                style={styles.rowInput}
                invalid={!inputs.amount.isValid}
                inputLabelText={"Amount"} textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: (enteredValue) => inputChangeHandler("amount", enteredValue),
                value: inputs.amount.value,
                placeholder: "00.00",
            }}/>
            <ExpenseInput
                style={styles.rowInput}
                inputLabelText={"Date"}
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    value: inputs.date.value,
                    onChangeText: (enteredValue) => inputChangeHandler("date", enteredValue),
                    maxLength: 10,
                    placeholder: "YYYY-MM-DD",
                }}/>
        </View>
        <ExpenseInput inputLabelText={"Description"}
                      invalid={!inputs.description.isValid}
                      textInputConfig={{
                          value: inputs.description.value,
                          onChangeText: (enteredValue) => inputChangeHandler("description", enteredValue),
                          multiline: true,
                      }}/>
        {formIsValid && (<Text style={styles.errorText}>Invalid Input Values - Please check your entered data!</Text>)}
        <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode={"flat"} onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}> {isEditing ? 'Update' : 'Add'} </Button>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    }, title: {
        textAlign: "center", fontSize: 18, fontWeight: "bold", color: "white",
    }, inputsRow: {
        flexDirection: "row", justifyContent: "space-between",
    }, rowInput: {
        flex: 1
    }, buttonsContainer: {
        flexDirection: "row", justifyContent: "center", alignItems: "center"
    }, button: {
        minWidth: 120, marginHorizontal: 8
    }, errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: "center",
        margin: 8,
        fontSize: 16
    }
})