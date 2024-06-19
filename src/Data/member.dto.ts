export interface Member {
    id: string;
    country_code: string;
    phone_number: string;
    name: string;
    profile_image: string;
    job_type: string;
    user_id?: string | null;
}