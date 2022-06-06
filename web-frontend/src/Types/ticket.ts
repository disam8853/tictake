// export interface TicketType = {
//     activity_id: string;
//     has_paid: string;
//     member: string;
//     order_timestamp: Date;
  
// }

export type TicketType = {
    activity_id: string;
    has_paid: string;
    member: string;
    order_timestamp: Date;
    activity_name?: string;
    activity_info?: string;
    price?: number;
    cnt?: number;
    key: string
}

export type TicketsType = {
    tickets: TicketType[]
}


export type ActivityType = {
    activity_id: string,
    activity_name: string,
    activity_info: string
    created_time: Date,
    start_date: Date,
    end_date: Date,
    total_inventory: number,
    remaining_inventory: number,
    price: number

}

