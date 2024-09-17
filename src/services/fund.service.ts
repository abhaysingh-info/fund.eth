import {createContext} from "react";
import {IGlobalFundModalState} from "@/types";
import {IEvent, IEventCreateDto} from "@/types/event";
import {IUser} from "@/types/user";
import {sendRequest} from "@/services/index";
import {ServerUrl} from "@/config";

const BASE_URL = `${ServerUrl}/fund/`;

export const fundModal = createContext<IGlobalFundModalState>({
    setEvent(event: IEvent) {
        console.log(`Event`, event)
    },
    event: {
        name: '',
        description: '',
        goal_amount: 0,
        id: 0,
        eth_transaction_id: '',
        user: {} as IUser,
        block_number: 0,
        goal_achieved: 0,
    }
})
export const FundModalProvider = fundModal.Provider


export async function createFund(eventId:number, amount:number) {
    return await sendRequest(BASE_URL, `/${eventId}`, 'POST', {amount}); // Assuming '/api/events' for create
}

export async function filterFund(start:number) {
    return await sendRequest(BASE_URL, `/?start=${start}`, 'POST'); // Assuming '/api/events' for create
}
