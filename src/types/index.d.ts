import {IEvent} from "@/types/event";

export interface IGlobalUserState {
    setUser: (user: IDiscordUser) => void
    user: IUser
}

export interface IGlobalEventModalState {
    setEvent: (event: boolean) => void
    event: boolean
}

export interface IGlobalFundModalState {
    setEvent: (event: IEvent) => void
    event: IEvent
}
export interface IGlobalEventUpdateModalState {
    setEventUpdate: (event: IEvent) => void
    eventUpdate: IEvent
}

export interface IGlobalLoginState {
    setIsLoggedIn: (loggedIn: boolean) => void
    isLoggedIn: boolean
}

export interface IUser {
    id: number
    name: string
    email: string
    password: string
    password_tries: number
    email_verify_token: string
    email_verified: string
    password_reset_token: string
    account_suspended: boolean
    wallet_address: string
}

export interface IUserCreate {
    name: string
    email: string
    password: string
    confirm_password: string
}
