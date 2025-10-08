import React, {useReducer} from "react";


export const ExpensesContext = React.createContext({
    expenses: [],
    setExpenses: (expenses) => {
    },
    addExpense: ({description, amount, date}) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, {description, amount, date}) => {
    },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.payload.reverse();
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id);
        default:
            return state;
    }
}

export default function ExpensesContextProvider({children}) {

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses})
    }

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData})
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: {id: id}})
    }

    function handleUpdateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: handleUpdateExpense,
    }


    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}