export const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const links = [
    { href: '/', label: 'Home', afterLoggedIn: 'both' },
    { href: '/profile', label: 'Profile', afterLoggedIn: true },
    { href: '/transactions', label: 'Transactions', afterLoggedIn: true },
    { href: '/about', label: 'About', afterLoggedIn: 'both' },
]