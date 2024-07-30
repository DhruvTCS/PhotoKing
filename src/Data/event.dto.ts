export interface EventType {
    id: number,
    title: string,
    start: string,
    end: string,
    sub_events: CalendarSubEvents[],
    members: {
        id: number,
        member: number,
    }[] | []
}

export interface BackendEvent {

    id: number,
    title: string,
    sub_events: CalendarSubEvents[],
    members: {
        id: number,
        member: number,
    }[] | []
}


export interface CalendarSubEvents {
    id: number;
    sub_event_name: string;
    location: string;
    start_time: string;
    start_date: string;
    end_date: string;
    end_time: string;
    location_coordinates?: string,
    isNew?: boolean;
    members: {
        id: number,
        member: number,
    }[] | [],
    selectedMembers?: number[],
    // sub_event_coordinates: string;

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


// {
// "id": 45,
//     "sub_event_name": "pooja",
//         "start_time": "09:00:00",
//             "end_time": "11:00:00",
//                 "start_date": "2024-08-01",
//                     "end_date": "2024-08-01",
//                         "location": "Main Conference Room",
//                             "members": []
// }