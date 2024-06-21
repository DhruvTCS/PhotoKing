export interface Albums {
    id: number;
    is_locked?: boolean
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
    is_hide?: boolean;
    total_images: number;
    images?: [{

        id: string;
        projectId: string;
        image: string;
        media_type: string;
    }

    ]

}

export interface NewAlbum {
    name: string,
    date: string,
    image: string,
    media_type: number
    folders?: [{
        name: string,
        images: [
            {
                image: string,
                media_type: number,
            }
        ]
    }
    ] | []
}
export interface NewFolder {
    name: string;
    images: [
        {
            image: string,
            media_type: number,
        }
    ]
}