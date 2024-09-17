'use client'

import React, {useContext, useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {eventModal, eventUpdateModal, updateEvent} from "@/services/event.service";
import {IEvent, IEventCreateDto, IEventUpdateDto} from "@/types/event";


interface IEventCreateErrorDto {
    name: string
    description: string
    goal_amount: string
}

export default function UpdateEventModal() {

    const eventUpdate = useContext(eventUpdateModal)

    const [formData, setFormData] = useState<IEventCreateDto>({
        name: '',
        description: '',
        goal_amount: 0,
    })
    const [errors, setErrors] = useState<Partial<IEventCreateErrorDto>>({})

    const [generalError, setGeneralError] = useState('')
    const [generalSuccess, setGeneralSuccess] = useState('')
    let [requestInProgress, setRequestInProgress] = useState(false)


    useEffect(() => {
        setFormData({
            ...eventUpdate.eventUpdate
        })
    }, [eventUpdate]);

    const validateForm = (): boolean => {
        const newErrors: Partial<IEventCreateErrorDto> = {}

        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        if (formData.goal_amount <= 0) newErrors.goal_amount = 'Goal amount must be positive'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'block_number' || name === 'goal_amount' ? parseFloat(value) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setRequestInProgress(true)
            requestInProgress = true
            setGeneralSuccess("")
            setGeneralError('')
            try {
                const resp = await updateEvent(eventUpdate.eventUpdate.id, {
                    name: formData.name,
                    description: formData.description,
                    goal_amount: formData.goal_amount,
                })
                if (resp.event) {
                    setGeneralSuccess(`Successfully created event: ${resp.event.name}`)
                    // reset form

                    requestInProgress = false
                    setRequestInProgress(false)
                }
            } catch (error: unknown) {
                setGeneralError(
                    error?.error?.message || error?.message || 'Error in creating user',
                )
            }

            requestInProgress = false
            setRequestInProgress(false)
        }
    }

    function onClose(){
        eventUpdate.setEventUpdate({} as IEvent)
        setFormData({} as IEventCreateDto)
    }



    return (
        <Dialog open={(eventUpdate.eventUpdate.id||0)>0} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-screen-md">
                <DialogHeader>
                    <DialogTitle>Update Event {eventUpdate.eventUpdate.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className={errors.description ? 'border-red-500' : ''}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="goal_amount">Goal Amount</Label>
                        <Input
                            id="goal_amount"
                            name="goal_amount"
                            type="number"
                            value={formData.goal_amount}
                            onChange={handleInputChange}
                            className={errors.goal_amount ? 'border-red-500' : ''}
                        />
                        {errors.goal_amount && <p className="text-red-500 text-sm">{errors.goal_amount}</p>}
                    </div>
                    <div className="my-4">
                        <p className="text-sm text-destructive">{generalError || ''}</p>
                        <p className="text-sm text-green-500">{generalSuccess || ''}</p>
                    </div>
                    <Button type="submit" className="w-full">Create Event</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}