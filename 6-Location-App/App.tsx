import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import AllPlacesScreen from "./screens/AllPlaces.screen";
import AddPlaceScreen from "./screens/AddPlace.screen";
import PlaceDetailsScreen from "./screens/PlaceDetails.screen";
import MapScreen from "./screens/Map.screen";
import IconButton from "./components/ui/IconButton";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Colors} from "./constants/colors";
import {pages} from "./utils/pages";
import {RootStackParamList} from "./types";
import {useCallback, useEffect, useState} from "react";
import {initDatabase} from "./utils/database";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

    const [dbInitialized, setDbInitialized] = useState<boolean>(false);

    useEffect(() => {
            const prepare = async () => {
                try {
                    await SplashScreen.preventAutoHideAsync();
                    await initDatabase();
                } catch (e) {
                    console.warn(e);
                } finally {
                    setDbInitialized(true);
                }
            };
            prepare();
        }
        ,
        []
    );

    const onLayoutRootView = useCallback(
        async () => {
            if (dbInitialized) {
                await SplashScreen.hideAsync();
            }
        },
        [dbInitialized]
    );

    if (!dbInitialized) return null;


    return (
        <>
            <StatusBar style="dark" hidden={true}/>
            <SafeAreaProvider>
                {/*<SafeAreaView>*/}
                <Router/>
                {/*</SafeAreaView>*/}
            </SafeAreaProvider>
        </>
    );
}

function Router() {
    return (
        <NavigationContainer>
            {/*// @ts-ignore*/}
            <Stack.Navigator<RootStackParamList> screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: Colors.primary50,
                contentStyle: {backgroundColor: Colors.gray700},
                headerTitleAlign: "center",
            }}>
                <Stack.Screen name={pages.all_places} component={AllPlacesScreen} options={({navigation}) => ({
                    title: "Your Favourite Places",
                    headerRight: ({tintColor}) =>
                        <IconButton icon={"add"} size={24} color={tintColor}
                                    onPress={() => navigation.navigate(pages.add_place)}/>,
                })}/>
                <Stack.Screen name={pages.add_place} component={AddPlaceScreen} options={{title: "Add a new place"}}/>
                <Stack.Screen name={pages.place_details} component={PlaceDetailsScreen}/>
                <Stack.Screen name={pages.map} component={MapScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
