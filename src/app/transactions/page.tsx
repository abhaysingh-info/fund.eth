'use client'

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {IEvent} from "@/types/event";
import {filterEvents, getUserEvents} from "@/services/event.service";
import {filterFund} from "@/services/fund.service";

// This type should match your Fund entity
type Fund = {
    id: number
    funder: { id: number, name: string }
    receiver: { id: number, name: string }
    event: { id: number, name: string }
    amount: number
    transaction_id: string
    sent_from: string
    date: string
    block_number: number
}

export default function TransactionsPage() {
    let start = 0;
    let requestInProgress = false;
    const [loadMore, setLoadMore] = useState<boolean>(true);

    useEffect(() => {
        onGet()
    }, [])



    const [transactions, setTransactions] = useState<Fund[]>([])


    async function onGet() {
        if (requestInProgress || !loadMore) return;
        requestInProgress = true;
        (filterFund(start)).then((res) => {
                if ((res.transactions.length === 0) || res.transactions.length < 20) {
                    setLoadMore(false);
                }
                start += 20;
            setTransactions([...transactions, ...res.transactions]);
                requestInProgress = false;
            })
            .catch((err) => {
                requestInProgress = false;
                console.log(err);
            });
    }

    useEffect(() => {
        // In a real application, you would fetch this data from your API
        onGet()
    }, [])

    return (
        <Card className="w-full max-w-screen-xl mx-auto my-16">
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>List of recent transactions</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Funder</TableHead>
                            <TableHead>Receiver</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Sent From</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Block Number</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.funder.name}</TableCell>
                                <TableCell>{transaction.receiver.name}</TableCell>
                                <TableCell>{transaction.event.name}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell className="font-mono">{transaction.transaction_id||'---'}</TableCell>
                                <TableCell className="font-mono">{transaction.sent_from||'---'}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                                <TableCell>{transaction.block_number}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}