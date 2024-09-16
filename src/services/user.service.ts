import { ServerUrl } from "@/config";
import { IGlobalLoginState, IGlobalUserState } from "@/types";
import { IUser } from "@/types/user";
import { createContext, useContext, } from "react";


export const DefaultUserValues: IUser = {
    account_suspended: false,
    email: "",
    email_verified: false,
    id: 0,
    name: "",
    wallet_address: "",
}

const user = createContext<IGlobalUserState>({
    setUser(user) {
        console.log(`User`, user)
    },
    user: DefaultUserValues
})

export const UserProvider = user.Provider


const isLoggedIn = createContext<IGlobalLoginState>({
    isLoggedIn: false,
    setIsLoggedIn(loggedIn) {

    }
})
export const IsLoggedInProvider = isLoggedIn.Provider

export function getUser() {
    const _user = useContext(user)
    return _user
}

export function getIsLoggedIn() {
    const loggedIn = useContext(isLoggedIn)
    return loggedIn
}

export async function createUser(user: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}) {
    try {
        const response = await fetch(ServerUrl + '/admin/create', {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return await response.json();
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function loginUser(user: { email: string; password: string }) {
    try {
        const response = await fetch(ServerUrl + '/login', {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (!response.ok) {
            return await response.json();
        }

        const data = await response.json();
        afterLogIn(data.user);
        return data;
    } catch (error: any) {
        afterLogOut();
        return error;
    }
}

export async function verifyLogin() {
    try {
        const response = await fetch(ServerUrl + '/login/verify', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        afterLogIn(data.user);
        return data;
    } catch (error: any) {
        afterLogOut();
        return error;
    }
}

export async function logoutUser() {
    try {
        const response = await fetch(ServerUrl + '/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        afterLogOut();
        const data = await response.json();
        return data;
    } catch (error: any) {
        afterLogOut();
        return error;
    }
}


export async function afterLogIn(_user: Partial<IUser>) {
    var usr = getUser()
    usr.setUser(_user)
    var isLoggedIn = getIsLoggedIn()
    isLoggedIn.setIsLoggedIn(true)
}

export async function afterLogOut() {
    var usr = getUser()
    usr.setUser(DefaultUserValues)
    var isLoggedIn = getIsLoggedIn()
    isLoggedIn.setIsLoggedIn(false)
}