import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, getExpenses, storeExpense, updateExpense} from "../util/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {ErrorOverlay} from "../components/UI/ErrorOverlay";

export default function ManageExpense({route, navigation}) {

    const expensesContext = useContext(ExpensesContext);

    const expenseId = route.params?.expenseId;

    const isEditing = !!expenseId;

    const selectedExpense = expensesContext.expenses.find((expense) => expense.id === expenseId);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await expensesContext.deleteExpense(expenseId);
            deleteExpense(expenseId);
            navigation.goBack();
        } catch (error) {
            setError(`Could not delete Expense: ${error}`);
        }
        setIsSubmitting(false);
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                // add the update logic with adding fields to update to
                expensesContext.updateExpense(expenseId, expenseData);
                await updateExpense(expenseId, expenseData);
            } else {
                // add the add logic with adding fields to add to
                const newId = await storeExpense(expenseData);
                expensesContext.addExpense({...expenseData, id: newId});
            }
            navigation.goBack();
        } catch (error) {
            setError(`Could not confirm Expense: ${error}`);
        }
        setIsSubmitting(false);
    }

    function errorHandler() {
        setError(null);
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
    }

    if (isSubmitting) {
        return <LoadingOverlay/>;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm cancelHandler={cancelHandler}
                         confirmHandler={confirmHandler}
                         deleteExpenseHandler={deleteExpenseHandler}
                         isEditing={isEditing}
                         defaultValue={selectedExpense}
            />
            {
                isEditing &&
                <View style={styles.deleteContainer}>
                    <Ionicons name="trash"
                              size={36}
                              color={GlobalStyles.colors.error500}
                              onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    }, deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
})