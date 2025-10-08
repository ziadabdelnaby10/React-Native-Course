import {FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = ({item}) => {
    return <ExpenseItem {...item}/>
}

export const ExpensesList = ({expenses}) => {
    return (
        <FlatList data={expenses}
                  keyExtractor={(item) => item.id}
                  renderItem={renderExpenseItem}/>
    )
}