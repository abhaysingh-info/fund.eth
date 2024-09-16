'use client'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.scss'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { useContext, useEffect, useState } from 'react'
import { IUser } from '@/types/user'
import {
	DefaultUserValues,
	IsLoggedInProvider,
	UserProvider,
	verifyLogin,
} from '@/services/user.service'
import { useRouter } from 'next/navigation'
import { links } from '@/config'
import * as UserService from '@/services/user.service'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [user, setUser] = useState<IUser>(DefaultUserValues)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const router = useRouter()

	function setIsLoggedInCustom(val: boolean) {
		setIsLoggedIn(val)
		localStorage.setItem('isLoggedIn', val.toString())
	}

	useEffect(() => {
		;(async () => {
			const ief = async () => {
				let resp
				try {
					resp = await verifyLogin(
						{
							user,
							setUser,
						},
						{
							isLoggedIn,
							setIsLoggedIn,
						},
					)
					if (resp?.success) {
						setUser(resp.user)
						setIsLoggedInCustom(true)
					} else {
						setUser(DefaultUserValues)
						setIsLoggedInCustom(false)
						if (!resp?.success) {
							if (typeof window != 'undefined') {
								for (let link of links) {
									if (window.location.href.includes(link.href)) {
										router.push('/')
										return
									}
								}
							}
						}
					}
				} catch (e) {
					if (!resp?.success) {
						if (typeof window != 'undefined') {
							for (let link of links) {
								if (window.location.href.includes(link.href)) {
									router.push('/')
									return
								}
							}
						}
					}
				}
			}

			if (!window.location.href.includes('login')) {
				ief()
			}
		})()
	}, [])

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
			>
				<UserProvider
					value={{
						setUser,
						user,
					}}
				>
					<IsLoggedInProvider
						value={{
							isLoggedIn,
							setIsLoggedIn: setIsLoggedInCustom,
						}}
					>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Navbar />
							<main className="container ">{children}</main>
						</ThemeProvider>
					</IsLoggedInProvider>
				</UserProvider>
			</body>
		</html>
	)
}
