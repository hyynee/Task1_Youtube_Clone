export declare class UploadController {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<{
        status: number;
        message: string;
        imageUrl: string;
        publicId: string;
    }>;
    uploadPublicFile(file: Express.Multer.File): Promise<{
        status: number;
        message: string;
        imageUrl: string;
        publicId: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        status: number;
        message: string;
        videoUrl: string;
        publicId: string;
        formats: {
            url: string;
            type: string;
        }[];
    }>;
    private handleUpload;
    private handleVideoUpload;
}
