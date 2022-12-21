import axios from './axios'
import authHeader from "./TokenHandler";

const GET_ACTIVE_USER_LIST_URL = "/user/getAllActiveUsers"

export async function getActiveUsers() {
    return axios.get(GET_ACTIVE_USER_LIST_URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': authHeader()
        }
    });
}

const GET_INACTIVE_USER_LIST_URL = "/user/getAllInactiveUsers"

export async function getInactiveUsers() {
    return axios.get(GET_INACTIVE_USER_LIST_URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': authHeader()
        }
    })
}

const POST_ASSIGN_USER_AS_INACTIVE = "/user/assignInactive"

export async function assignUserAsInactive(id) {
    let config = {
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
        params: {
            id,
        },
    };
    return await axios
        .post(POST_ASSIGN_USER_AS_INACTIVE, null, {
            params: {
                id
            },
            headers: {'Authorization': authHeader()}
        });
}

const POST_ASSIGN_USER_AS_ACTIVE = "/user/assignActive"

export async function assignUserAsActive(id) {
    let config = {
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
        params: {
            id,
        },
    };
    return await axios
        .post(POST_ASSIGN_USER_AS_ACTIVE, null, {
            params: {
                id
            },
            headers: {'Authorization': authHeader()}
        });
}


