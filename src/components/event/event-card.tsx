import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UserIcon } from "lucide-react"
import {IEvent} from "@/types/event";
import {useContext, useEffect} from "react";
import {user} from "@/services/user.service";
import {eventUpdateModal} from "@/services/event.service";
import {fundModal} from "@/services/fund.service";


export default function EventCard({ event }: { event: IEvent }) {
    const progressPercentage = (event.goal_achieved / event.goal_amount) * 100
    const userCtx = useContext(user)
    const fundCtx = useContext(fundModal)

    const eventUpdateContext = useContext(eventUpdateModal)


    function onEdit(){
        eventUpdateContext.setEventUpdate(event)
    }
    function onFund(){
        fundCtx.setEvent(event)
    }


    return (
        <Card className="w-full max-w-screen-md">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{event.user.name}</span>
                </div>
                <CardTitle className="text-xl font-bold mt-2">{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progressPercentage.toFixed(2)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="w-full" />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{event.goal_achieved} ETH raised</span>
                        <span>Goal: {event.goal_amount} ETH</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center space-x-2">
                <Button className="w-full" onClick={onFund} disabled={!userCtx?.user?.id || userCtx?.user?.id == event.user.id} >Fund This Event</Button>

                {userCtx?.user?.id == event.user.id && <Button onClick={onEdit} className="w-full">Edit</Button>}
            </CardFooter>
        </Card>
    )
}