import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";

export const Router = () => {
    const Stack = createNativeStackNavigator();
    const BottomTab = createBottomTabNavigator();

    const ExpensesOverviewTab = () =>
        <BottomTab.Navigator id="bottomNavigator"
                             screenOptions={({navigation}) => ({
                                 headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                                 headerTintColor: "white",
                                 tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                                 tabBarActiveTintColor: GlobalStyles.colors.accent500,
                                 animation: "shift",
                                 headerRight: ({tintColor}) =>
                                     <IconButton icon="add"
                                                 size={24}
                                                 color={tintColor}
                                                 onPress={() => navigation.navigate("manageExpense")}/>

                             })}
        >
            <BottomTab.Screen name="recentExpense"
                              component={RecentExpenses}
                              options={{
                                  title: "Recent Expenses",
                                  tabBarLabel: "Recent",
                                  tabBarIcon: ({color, size}) =>
                                      <Ionicons name="hourglass" size={size} color={color}/>
                              }}
            />
            <BottomTab.Screen name="allExpenses"
                              component={AllExpenses}
                              options={{
                                  title: "All Expenses",
                                  tabBarLabel: "All Expenses",
                                  tabBarIcon: ({color, size}) =>
                                      <Ionicons name="calendar" size={size} color={color}/>
                              }}
            />
        </BottomTab.Navigator>


    return (
        <NavigationContainer>
            <Stack.Navigator id="mainNavigator" screenOptions={{
                headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
                headerTintColor:"white",
            }}>
                <Stack.Screen name="overviewExpenses"
                              component={ExpensesOverviewTab}
                              options={{headerShown: false}}/>
                <Stack.Screen name="manageExpense"
                              component={ManageExpense}
                              options={{presentation:"modal"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}