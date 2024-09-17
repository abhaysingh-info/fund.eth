import {IUser} from "@/types/user";

export interface IEventCreateDto {
    name: string;
    description: string;
    goal_amount: number;
}

export interface IEventUpdateDto {
    name: string;
    description: string;
    goal_amount: number;
}

export interface IEventFilterDto {
    id?: number
    name?: string
    min_amount?: number
    max_amount?: number
    transaction_id?: string
    block_number?: number
}

export  interface  IEvent {
    id: number;
    user: IUser;
    name: string;
    description: string;
    block_number: number;
    eth_transaction_id: string;
    goal_amount: number;
    goal_achieved: number;
}