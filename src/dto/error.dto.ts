

export interface Error {
    success: boolean;
    status: number;
    messgae: string;
    error: {
        message: string;
        stringify_error?: string | null;
    }
}