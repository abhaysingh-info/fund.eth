import {ServerUrl} from "@/config";
import {IGlobalEventModalState, IGlobalEventUpdateModalState} from "@/types";
import {createContext,} from "react";
import {IEvent, IEventCreateDto, IEventFilterDto, IEventUpdateDto} from "@/types/event";
import {sendRequest} from "./index"


const BASE_URL = `${ServerUrl}/event`

export const eventModal = createContext<IGlobalEventModalState>({
    setEvent(event) {
        console.log(`Event`, event)
    },
    event: false
})
export const EventModalProvider = eventModal.Provider

export const eventUpdateModal = createContext<IGlobalEventUpdateModalState>({
    setEventUpdate(event) {
        console.log(`Event`, event)
    },
    eventUpdate: {} as IEvent
})
export const EventUpdateModalProvider = eventUpdateModal.Provider


export async function createEvent(data: IEventCreateDto) {
    return await sendRequest(BASE_URL, '', 'POST', data); // Assuming '/api/events' for create
}

export async function filterEvents(data: Partial<IEventFilterDto>, start:number) {
    return await sendRequest(BASE_URL, `/filter?start=${start||0}`, 'POST', data);
}

export async function getUserEvents(start:number) {
    return await sendRequest(BASE_URL, `/user?start=${start||0}`,'GET');
}

export async function updateEvent(eventId: number, data: IEventUpdateDto) {
    return await sendRequest(BASE_URL, `/${eventId}`, 'PATCH', data);
}

