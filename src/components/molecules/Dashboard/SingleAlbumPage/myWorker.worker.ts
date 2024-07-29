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

        const compressedFiles: File[] = [];

        for (const file of files) {
            try {
                let compressedFile: File;
                if (file.size / 1024 / 1024 > 3) {
                    const compressedBlob = await compressImage(file);
                    compressedFile = blobToFile(compressedBlob, file.name);
                } else {
                    compressedFile = file;
                }
                compressedFiles.push(compressedFile);
                self.postMessage({ type: "progress", completedFiles: 1 });
            } catch (error) {
                console.error('Error compressing file:', error);
            }
        }

        console.log(e.data.work, "end");
        self.postMessage({ type: "complete", files: compressedFiles });
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
        useWebWorker: false,
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
