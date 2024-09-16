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

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/profile', label: 'Profile', afterLoggedIn: true },
	{ href: '/transactions', label: 'Transactions', afterLoggedIn: true },
	{ href: '/about', label: 'About' },
]

export default function Navbar() {
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
						<nav className="flex flex-col space-y-4">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-lg"
									onClick={() => setIsOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>

				{/* Desktop Menu */}
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						{links.map((link) => (
							<NavigationMenuItem key={link.href}>
								<Link href={link.href} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										{link.label}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</nav>
	)
}
