import axios from './axios'

const LOGIN_URL = "/auth/login";
export async function SendPostLoginRequest(username, password) {
    return await axios
        .post(LOGIN_URL, JSON.stringify({username, password}), {
            headers: {"Content-Type": "application/json"},
            withCredentials: true,
        });
}