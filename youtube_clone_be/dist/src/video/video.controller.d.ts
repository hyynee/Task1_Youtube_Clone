import { CreateVideoDTO } from './dto/create-video.dto';
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getAllVideos(): Promise<(import("mongoose").Document<unknown, {}, import("../../Schema/video.shema").Video, {}> & import("../../Schema/video.shema").Video & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getVideoUserById(CurrentUser: any): Promise<(import("mongoose").Document<unknown, {}, import("../../Schema/video.shema").Video, {}> & import("../../Schema/video.shema").Video & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getVideoDetails(videoId: string): Promise<{
        status: number;
        data: import("mongoose").Document<unknown, {}, import("../../Schema/video.shema").Video, {}> & import("../../Schema/video.shema").Video & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    createVideo(CurrentUser: any, body: CreateVideoDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schema/video.shema").Video, {}> & import("../../Schema/video.shema").Video & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
