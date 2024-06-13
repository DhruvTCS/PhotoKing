

export interface Error {
    success?: boolean;
    status?: number;
    message?: string;
    error?: {
        message?: string;
        stringify_error?: string | null;
    }
}