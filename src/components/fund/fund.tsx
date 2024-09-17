"use client"

import React, {useState, ChangeEvent, useContext} from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {createFund, fundModal} from "@/services/fund.service";
import {IEvent} from "@/types/event";
import {createEvent} from "@/services/event.service";

export default function FundModal() {

    const fund = useContext(fundModal)

    const [amount, setAmount] = useState<string>('1')
    const [error, setError] = useState<string | null>(null)

    const [generalError, setGeneralError] = useState('')
    const [generalSuccess, setGeneralSuccess] = useState('')
    let [requestInProgress, setRequestInProgress] = useState(false)

    const validateAmount = (value: number): string | null => {
        if (value < 1) {
            return "Amount must be at least 1"
        }
        if (!Number.isInteger(value)) {
            return "Amount must be a whole number"
        }
        return null
    }

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setAmount(value)

        const numericValue = Number(value)
        if (isNaN(numericValue)) {
            setError("Please enter a valid number")
        } else {
            const validationResult = validateAmount(numericValue)
            setError(validationResult)
        }
    }

    const handleSubmit = async () => {
        const numericAmount = Number(amount)
        const validationResult = validateAmount(numericAmount)
        if (validationResult === null) {
            setRequestInProgress(true)
            requestInProgress = true
            setGeneralSuccess("")
            setGeneralError('')
            try {
                const resp = await createFund(fund.event.id, parseInt(amount))
                if(resp.fund) {
                    setGeneralSuccess(`Contributed ${resp.fund.amount} in the event!!!`)
                }
            }catch (error:unknown) {
                setGeneralError(
                    error?.error?.message || error?.message || 'Error in creating user',
                )
            }

            requestInProgress = false
            setRequestInProgress(false)
            setAmount('0')
            setError(null)
        } else {
            setError(validationResult)
        }
    }

    function onClose(){
        fund.setEvent({} as IEvent)
    }

    return (
        <Dialog open={(fund.event.id||0)>0} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Fund for &quot;{fund?.event?.name || ""}&quot;</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            className="col-span-3"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                </div>
                <div className="my-4">
                    <p className="text-sm text-destructive">{generalError || ''}</p>
                    <p className="text-sm text-green-500">{generalSuccess || ''}</p>
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleSubmit} disabled={!!error}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}