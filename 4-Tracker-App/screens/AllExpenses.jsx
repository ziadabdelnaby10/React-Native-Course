import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {View} from "react-native";
import {useContext, useEffect} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getExpenses} from "../util/api";

export default function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);

    // const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const expenses = await getExpenses();
            expensesContext.setExpenses(expenses);
        }

        fetchExpenses();
    }, []);

    return (
        <View style={{flex: 1}}>
            <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={"Total"}
                            fallbackText={"No expenses registered found."}/>
        </View>
    )
}