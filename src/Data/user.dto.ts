export interface User {
    id: number;
    email: string;
    country_code: string;
    phone_number: string;
    role: number;
    name: string;
    image: string | null;
    username: string;
}
export interface Notification {
    id: number;
    title: string;
    message: string;
    is_seen: boolean;
    user: number;
}
