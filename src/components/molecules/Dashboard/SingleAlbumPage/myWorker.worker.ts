
import imageCompression from 'browser-image-compression';


self.onmessage = async (e: MessageEvent<{ files: File[], work: number }>) => {
    const files = e.data.files;
    console.log(e.data.work, "started")

    try {
        const options = {
            maxSizeMB: 3,
            maxWidthOrHeight: 1920,
            useWebWorker: false,

        };

        const compressedFiles = await Promise.all(files.map(async (file) => {
            try {
                if (file.size / 1024 / 1024 > 3) {
                    const compressedBlob = await compressImage(file);
                    const compressedFile = blobToFile(compressedBlob, file.name);
                    return compressedFile;
                } else {
                    return file;
                }
            } catch (error) {
                console.error('Error compressing file:', error);
                return undefined;
            }
        }));
        console.log(e.data.work, "end")
        self.postMessage(compressedFiles);
    } catch (error) {
        console.error('Error in worker:', error);
    }
};


const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
};

const compressImage = async (file: File): Promise<Blob> => {
    const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: false
    };

    try {
        const compressedBlob = await imageCompression(file, options);
        return compressedBlob;
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
};

export { };