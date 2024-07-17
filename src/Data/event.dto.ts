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

export interface UserCreatedEvents {
    id: number;
    customer_name: string;
    phone_number: string;
    event_name: string;
    sub_events: EnteredSubEventType[];
    token: string;
}
export interface EnteredSubEventType {
    id: number;
    sub_event_name: string;
    sub_event_location: string;
    starting_time: string;
    starting_date: string;
    ending_date: string;
    ending_time: string;
    sub_event_start_date_time: string;
    sub_event_end_date_time: string;
    sub_event_coordinates: string;
}
