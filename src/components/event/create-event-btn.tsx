'use client'

import {useContext} from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {eventModal} from "@/services/event.service";

export default function EventCreateBtn() {
    const {event, setEvent} = useContext(eventModal)

    const handleCardClick = () => {
        setEvent(!event)
    }

    return (
        <Card
            className="w-full max-w-md cursor-pointer"
            onClick={handleCardClick}
        >
            <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Create an event"
                        readOnly
                        className="flex-grow"
                    />
                    <Button>
                        Create
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}