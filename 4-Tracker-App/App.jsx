import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Router} from "./Router";
import ExpensesContextProvider from "./store/expenses-context";
import {GlobalStyles} from "./constants/styles";

export default function App() {

    return (<>

            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: GlobalStyles.colors.primary500}}>
                    <StatusBar style="light"/>
                    <ExpensesContextProvider>
                        <Router/>
                    </ExpensesContextProvider>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            '#fff',
        alignItems:
            'center',
        justifyContent:
            'center',
    }
    ,
});
