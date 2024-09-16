'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ModeToggle } from './mode-toggle'
import { links } from '@/config'
import { getIsLoggedIn, user } from '@/services/user.service'
import * as UserService from '@/services/user.service'

export default function Navbar() {
	const isLoggedInCtx = React.useContext(UserService.isLoggedIn)

	const { isLoggedIn, setIsLoggedIn } = getIsLoggedIn(isLoggedInCtx)

	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<nav className="border-b bg-background ">
			<div className="container flex items-center justify-between p-4">
				<Link href="/" className="text-md font-bold">
					FUND.ETH
				</Link>

				{/* Mobile Menu */}
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild className="lg:hidden">
						<Button variant="outline" size="icon">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<nav className="flex flex-col justify-between space-y-4 h-full">
							<div className="flex flex-col space-y-4">
								{links.map((link, index) =>
									isLoggedIn === false && link.afterLoggedIn === true ? (
										<></>
									) : (
										<Link
											key={index}
											href={link.href}
											className="text-lg"
											onClick={() => setIsOpen(false)}
										>
											{link.label}
										</Link>
									),
								)}
							</div>
							<div className="flex flex-col space-y-4">
								<div className={isLoggedIn ? 'hidden' : ''}>
									<Link href={'/log-in'}>
										<Button className="w-full">Log-in</Button>
									</Link>
								</div>
								<div className={isLoggedIn ? 'hidden' : ''}>
									<Link href={'/sign-up'}>
										<Button className="w-full" variant="ghost">
											Sign-up
										</Button>
									</Link>
								</div>
							</div>
						</nav>
					</SheetContent>
				</Sheet>

				{/* Desktop Menu */}
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						{links.map((link, index) =>
							isLoggedIn === false && link.afterLoggedIn === true ? (
								<div key={index}></div>
							) : (
								<NavigationMenuItem key={index}>
									<Link href={link.href} legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{link.label}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							),
						)}
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList className="flex space-x-4">
						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
						<NavigationMenuItem className={isLoggedIn ? 'hidden' : ''}>
							<Link href={'/log-in'}>
								<Button>Log-in</Button>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem className={isLoggedIn ? 'hidden' : ''}>
							<Link href={'/sign-up'}>
								<Button variant="ghost">Sign-up</Button>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</nav>
	)
}
