export interface IGlobalUserState {
    setUser: (user: IDiscordUser) => void
    user: IDiscordUser
}

export interface IGlobalLoginState {
    setIsLoggedIn: (loggedIn: boolean) => void
    isLoggedIn: boolean
}