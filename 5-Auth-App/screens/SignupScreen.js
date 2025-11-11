import AuthContent from '../components/Auth/AuthContent';
import {createUser} from "../api/Auth";
import {useContext, useState} from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Alert} from "react-native";
import {AuthContext} from "../store/authContext";

function SignupScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signUpHandler({email, password}) {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Authentication failed.",
                "Couldn't create user, please check your input and try again later.",
            );
        } finally {
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating User..."/>
    }

    return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
