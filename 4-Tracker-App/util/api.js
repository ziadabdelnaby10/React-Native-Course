import axios from "axios";

const api = axios.create({
    baseURL: 'https://react-native-project-a9bb2-default-rtdb.firebaseio.com/'
})

export async function storeExpense(expenseData) {
    const response = await api.post('expenses.json', expenseData);
    return response.data.name;
}

export async function getExpenses() {
    const response = await api.get('expenses.json');

    const expenses = [];

    for (const key in response.data) {
        const expenseObject = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expenseObject);
    }

    return expenses;
}

export function updateExpense(id, expenseData) {
    return api.put(`expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return api.delete(`expenses/${id}.json`);
}