

export type Event = {
    id: string;
    activityName: string;
    activityInfo: string;
    activityStartTime: Date;
    activityEndTime: Date;
    totalInventory: number;
}

export type Events = {
    total: number,
    offset: number,
    events: Event[]
}