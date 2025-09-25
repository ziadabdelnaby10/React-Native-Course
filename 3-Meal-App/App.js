import {StatusBar} from 'expo-status-bar';
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverViewScreen from "./screens/MealsOverViewScreen";
import {SafeAreaView} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CATEGORIES} from "./data/dummy-data";
import {MealDetailScreen} from "./screens/MealDetailScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FavoriteScreen from "./screens/FavoriteScreen";
import {Ionicons} from "@expo/vector-icons";
import FavouritesContextProvider from "./store/context/favourites-context";
import {Provider} from "react-redux";
import {store} from "./store/redux/store";

export default function App() {
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();


    function RenderDrawerNavigator() {
        return <Drawer.Navigator id="drawer" screenOptions={
            {
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: {backgroundColor: "#455A64"},
                sceneStyle: {backgroundColor: "#263238"},
                // drawerContentStyle: {backgroundColor: "#263238" , maxWidth:200},
                drawerStyle: {backgroundColor: "#263238", width: "auto"},
                drawerInactiveTintColor: "white",
                drawerActiveBackgroundColor: "#8fadbc",
                drawerActiveTintColor: "black",
                drawerStatusBarAnimation: "fade",
            }
        }>
            <Drawer.Screen name="MealsCategories" component={CategoriesScreen} options={{
                title: "All Categories",
                drawerIcon: ({color, size}) => <Ionicons name="list" size={size} color={color}/>
            }}/>
            <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} options={{
                title: "Favourites",
                drawerIcon: ({color, size}) => <Ionicons name="star" size={size} color={color}/>
            }}/>

        </Drawer.Navigator>
    }

    function renderWithContextApi() {
        return <>
            {/*<SafeAreaView style={{flex: 1}}>*/}
            <StatusBar style="light"/>
            <FavouritesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator id="category"
                                     screenOptions={{
                                         headerTitleAlign: "center",
                                         headerTintColor: "white",
                                         headerStyle: {backgroundColor: "#455A64"},
                                         contentStyle: {backgroundColor: "#263238"}
                                     }}>
                        <Stack.Screen name="Drawer"
                                      component={RenderDrawerNavigator}
                                      options={
                                          {title: "All Categories", headerShown: false}
                                      }/>
                        {/*<Stack.Screen name="MealsCategories"
                                  component={CategoriesScreen}
                                  options={{title: "Meal Categories"}}/>*/}
                        <Stack.Screen name="MealOverView" component={MealsOverViewScreen}
                                      options={({route, navigation}) => {
                                          const category = CATEGORIES.find(item => item.id === route.params.categoryId);
                                          return {
                                              title: category.title,
                                          }
                                      }}/>
                        <Stack.Screen name="MealDetail" component={MealDetailScreen}
                                      options={({route, navigation}) => {
                                          const meal = route.params.meal;
                                          return {
                                              title: meal.title,
                                          }
                                      }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </FavouritesContextProvider>
            {/*</SafeAreaView>*/}
        </>;
    }

    function renderWithRedux() {
        return <>
            {/*<SafeAreaView style={{flex: 1}}>*/}
            <StatusBar style="light"/>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator id="category"
                                     screenOptions={{
                                         headerTitleAlign: "center",
                                         headerTintColor: "white",
                                         headerStyle: {backgroundColor: "#455A64"},
                                         contentStyle: {backgroundColor: "#263238"}
                                     }}>
                        <Stack.Screen name="Drawer"
                                      component={RenderDrawerNavigator}
                                      options={
                                          {title: "All Categories", headerShown: false}
                                      }/>
                        {/*<Stack.Screen name="MealsCategories"
                                  component={CategoriesScreen}
                                  options={{title: "Meal Categories"}}/>*/}
                        <Stack.Screen name="MealOverView" component={MealsOverViewScreen}
                                      options={({route, navigation}) => {
                                          const category = CATEGORIES.find(item => item.id === route.params.categoryId);
                                          return {
                                              title: category.title,
                                          }
                                      }}/>
                        <Stack.Screen name="MealDetail" component={MealDetailScreen}
                                      options={({route, navigation}) => {
                                          const meal = route.params.meal;
                                          return {
                                              title: meal.title,
                                          }
                                      }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
            {/*</SafeAreaView>*/}
        </>;
    }

    return (
        renderWithRedux()
    );
}
