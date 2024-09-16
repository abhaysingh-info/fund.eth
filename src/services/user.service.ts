import { ServerUrl } from "@/config";
import { IGlobalLoginState, IGlobalUserState } from "@/types";
import { IUser } from "@/types/user";
import { Context, createContext, useContext, } from "react";

const BASE_URL = `${ServerUrl}/user`

export const DefaultUserValues: IUser = {
    account_suspended: false,
    email: "",
    email_verified: false,
    id: 0,
    name: "",
    wallet_address: "",
}

export const user = createContext<IGlobalUserState>({
    setUser(user) {
        console.log(`User`, user)
    },
    user: DefaultUserValues
})

export const UserProvider = user.Provider


export const isLoggedIn = createContext<IGlobalLoginState>({
    isLoggedIn: false,
    setIsLoggedIn(loggedIn) {

    }
})
export const IsLoggedInProvider = isLoggedIn.Provider


export function getIsLoggedIn(isLoggedIn: IGlobalLoginState) {
    const loggedIn = isLoggedIn
    return loggedIn
}

export async function createUser(user: {
    name: string;
    email: string;
    password: string;
}) {
    try {
        const response = await fetch(BASE_URL, {
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

export async function loginUser(user: { email: string; password: string }, userContext: IGlobalUserState, isLoggedInContext: IGlobalLoginState) {
    try {
        const response = await fetch(BASE_URL + '/login', {
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
        afterLogIn(data.user, userContext, isLoggedInContext);
        return data;
    } catch (error: any) {
        afterLogOut(userContext, isLoggedInContext);
        return error;
    }
}

export async function verifyLogin(userContext: IGlobalUserState, isLoggedInContext: IGlobalLoginState) {
    try {
        const response = await fetch(BASE_URL + '/login/verify', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        afterLogIn(data.user, userContext, isLoggedInContext);
        return data;
    } catch (error: any) {
        afterLogOut(userContext, isLoggedInContext);
        return error;
    }
}

export async function logoutUser(userContext: IGlobalUserState, isLoggedInContext: IGlobalLoginState) {
    try {
        const response = await fetch(BASE_URL + '/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        afterLogOut(userContext, isLoggedInContext);
        const data = await response.json();
        return data;
    } catch (error: any) {
        afterLogOut(userContext, isLoggedInContext);
        return error;
    }
}


export async function afterLogIn(_user: Partial<IUser>, userContext: IGlobalUserState, isLoggedInContext: IGlobalLoginState) {
    var usr = userContext
    usr.setUser(_user)
    var isLoggedIn = isLoggedInContext
    isLoggedIn.setIsLoggedIn(true)
}

export async function afterLogOut(userContext: IGlobalUserState, isLoggedInContext: IGlobalLoginState) {
    var usr = userContext
    usr.setUser(DefaultUserValues)
    var isLoggedIn = isLoggedInContext
    isLoggedIn.setIsLoggedIn(false)
}