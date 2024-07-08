export interface EventType {
    id: number,
    title: string,
    start: string,
    end: string,
    location: string,
    members: {
        id: number,
        member: number,
    }[] | []
}

export interface BackendEvent {

    id: number,
    title: string,
    start_date: string,
    start_time: string,
    end_date: string,
    end_time: string,
    location: string,
    members: {
        id: number,
        member: number,
    }[] | []
}