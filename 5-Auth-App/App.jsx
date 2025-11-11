import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {Colors} from './constants/styles';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import AuthContextProvider, {AuthContext} from "./store/authContext";
import {useContext} from "react";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: Colors.primary100},
                animation: "slide_from_right",
            }}
            id="auth">
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerRight: ({tintColor}) => {
                    return <IconButton icon="exit"
                                       color={tintColor} size={24}
                                       onPress={authCtx.logout}/>
                },
                headerTintColor: 'white',
                contentStyle: {backgroundColor: Colors.primary100},
                animation: "slide_from_right",
            }}
            id="main">
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated ? <AuthStack/> : <AuthenticatedStack/>}
        </NavigationContainer>

    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <StatusBar style="dark" backgroundColor={Colors.primary500} hidden={true}/>
                <AuthContextProvider>
                    <Navigation/>
                </AuthContextProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
