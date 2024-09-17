"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheck, Heart, Users, DollarSign } from "lucide-react"
import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-md">
            <h1 className="text-4xl font-bold text-center mb-8">About FundRaiser</h1>

            <section className="mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Our Mission</CardTitle>
                        <CardDescription>Empowering individuals to make a difference</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            At FundRaiser, we believe in the power of collective action. Our platform connects passionate individuals with meaningful causes, enabling anyone to create positive change in the world. Whether it's supporting local communities, funding medical treatments, or backing global initiatives, we're here to make fundraising accessible, transparent, and impactful.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$24.3M</div>
                        <p className="text-xs text-muted-foreground">+20% from last year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Successful Campaigns</CardTitle>
                        <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,231</div>
                        <p className="text-xs text-muted-foreground">Across 50 countries</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.2M</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                        { name: "Jane Doe", role: "CEO & Founder", image: "/placeholder.svg?height=100&width=100" },
                        { name: "John Smith", role: "CTO", image: "/placeholder.svg?height=100&width=100" },
                        { name: "Alice Johnson", role: "Head of Partnerships", image: "/placeholder.svg?height=100&width=100" },
                        { name: "Bob Williams", role: "Lead Developer", image: "/placeholder.svg?height=100&width=100" },
                    ].map((member) => (
                        <Card key={member.name}>
                            <CardContent className="flex flex-col items-center pt-6">
                                <Avatar className="w-24 h-24 mb-4">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback className="text-center">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold text-lg text-center">{member.name}</h3>
                                <p className="text-sm text-muted-foreground text-center">{member.role}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Ready to Make a Difference?</h2>
                <p className="text-muted-foreground mb-6">Join our community of changemakers and start your fundraising journey today.</p>
                <Link href={"/sign-up"}>
                    <Button size="lg" className="bg-primary text-primary-foreground">
                        <Heart className="mr-2 h-4 w-4" /> Start Fundraising
                    </Button>
                </Link>
            </section>
        </div>
    )
}