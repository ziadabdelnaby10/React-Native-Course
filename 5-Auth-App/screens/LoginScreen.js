import AuthContent from '../components/Auth/AuthContent';
import {useContext, useState} from "react";
import {createUser, login} from "../api/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Alert} from "react-native";
import {AuthContext} from "../store/authContext";

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signInHandler({email, password}) {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Authentication failed.",
                "An error occurred while logging in. Please Check your credentials and try again.",
            );
        } finally {
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..."/>
    }

    return <AuthContent isLogin onAuthenticate={signInHandler}/>;
}

export default LoginScreen;
