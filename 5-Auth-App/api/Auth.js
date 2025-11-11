import axios from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "?key=AIzaSyBRdkFxrwUlAnDLA82vEz5S3BW_Qmw4gJY"

export function createUser(email, password) {
    return authenticate("signUp", email, password);
}

export function login(email, password) {
    return authenticate("signInWithPassword", email, password);
}

async function authenticate(mode, email, password) {
    const url = `${BASE_URL}${mode}${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });
    console.log(response.data);
    return response.data.idToken;
}