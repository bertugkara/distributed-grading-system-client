import authHeader from "./TokenHandler";
import axios from "./axios";

export async function sendRegisterUserRequest(RegisterUrl, email,
                                   username, firstName,
                                   lastName,
                                   password,
                                   referencedTeacherID
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
                referencedTeacherID
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authHeader()
                }
            }
        )
}

