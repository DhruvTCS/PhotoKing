export interface Albums {
    id: number;
    is_locked?: boolean;
    is_hide?: boolean;
    user: number;
    description: string;
    project_code: string;
    image: string;
    name: string;
    media_type?: number;
    date: string;
    reason?: string | null;
    folders?: Folder[] | [];
}

export interface Folder {

    id: number;
    user: number;
    project_id: number;
    name: string;
    resason: string | null;
    add_watermark: boolean;
    is_locked: boolean;
    is_hide: boolean;
    total_images: number;
    custom_reason?: string;
    images: {
        id: number;
        project_id: number;
        image: string;
        thumbnail: string
        media_type: number;
    }[]



}

export interface NewAlbum {
    name: string,
    date: string,
    image: string,
    media_type: number
    folders?: NewFolder[]
}
export interface NewFolder {
    name: string;
    id: number;
    images:
    {
        image: File,
        image_blob: string,
        media_type: number,
    }[]

}