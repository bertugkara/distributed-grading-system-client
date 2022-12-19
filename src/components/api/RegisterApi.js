import authHeader from "./TokenHandler";
import axios from "./axios";

export async function sendRegisterUserRequest(RegisterUrl, email,
                                   username, firstName,
                                   lastName,
                                   password,
                                   ) {
    return await axios
        .post(
            RegisterUrl,
            JSON.stringify({
                email,
                username,
                firstName,
                lastName,
                password,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authHeader()
                }
            }
        )
}

