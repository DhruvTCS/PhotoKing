// src/workers/compressWorker.ts
import imageCompression from 'browser-image-compression';

// Define a type for the event data
interface CompressWorkerMessage {
    imageFile: File;
    id: number;
}

// Handle messages received by the worker
self.onmessage = async function (event: MessageEvent<CompressWorkerMessage>) {
    const { imageFile, id } = event.data;

    try {
        const options = {
            maxSizeMB: 3, // Maximum size in MB
            maxWidthOrHeight: 1920, // Max width or height
        };

        // Perform image compression
        const compressedBlob = await imageCompression(imageFile, options);

        // Post the compressed blob back to the main thread
        self.postMessage({ id, compressedBlob });
    } catch (error) {
        // Handle errors and post them back to the main thread
        self.postMessage({ id, error: (error as Error).message });
    }
};
