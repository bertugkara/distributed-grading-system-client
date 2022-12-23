import axios from './axios'
import authHeader from "./TokenHandler";

export async function fillProfile(URL,id){
    return await axios
        .get(URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
            params:{
                id
            }
        });
}