export interface Event {
    id: number,
    title: string,
    time: string,
    date: string,
    location: string,
    members: {
        id: number,
        member: number,
    }[] | []
}