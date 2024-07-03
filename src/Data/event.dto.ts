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
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    location: string,
    members: {
        id: number,
        member: number,
    }[] | []
}