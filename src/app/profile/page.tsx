"use client"

import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {EventFeed} from "@/components/event/event-feed";
import {Separator} from "@/components/ui/separator";
import {useContext} from "react";
import {user as userCtx} from "@/services/user.service";

export default function Profile() {

    const userModel = useContext(userCtx)


    return <div className="relative">
        {/*<LogInBtn/>*/}
        <div className="w-full max-w-screen-md mx-auto min-h-screen relative mt-8 flex flex-col gap-4">
            <section className="flex gap-4 md:gap-4 justify-center flex-col items-center mx-auto">
                <Avatar className="w-24 h-24 text-2xl">
                    <AvatarFallback>
                        {userModel.user?.name?.slice(0, 2)?.toUpperCase()||"Hi"}
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl">{userModel.user?.name}</h1>
            </section>
            <Separator/>
            <div>
                <EventFeed user={true} />
            </div>
        </div>
    </div>
}
