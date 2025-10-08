import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../util/date";
import {getExpenses} from "../util/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {ErrorOverlay} from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext);

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            setIsFetching(true);
            try {
                const expenses = await getExpenses();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError(`Couldn't fetch Expenses ${error}`);
            }

        }

        fetchExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }
    
    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={() => setIsFetching(false)} />;
    }

    if (isFetching) {
        return <LoadingOverlay/>;
    }

    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        return expense.date > date7DaysAgo && expense.date <= today;
    });
    return (
        <>
            <ExpensesOutput expenses={recentExpenses} expensesPeriod={"last 7 days"}
                            fallbackText={"No expenses registered for the last 7 days."}/>
        </>
    )
}