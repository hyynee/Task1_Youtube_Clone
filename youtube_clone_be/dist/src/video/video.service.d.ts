import { Model } from 'mongoose';
import { Video } from 'Schema/video.shema';
import { CreateVideoDTO } from './dto/create-video.dto';
export declare class VideoService {
    private readonly videoModel;
    constructor(videoModel: Model<Video>);
    getAllVideos(): Promise<(import("mongoose").Document<unknown, {}, Video, {}> & Video & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getVideoUserById(userId: string): Promise<(import("mongoose").Document<unknown, {}, Video, {}> & Video & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getVideoDetails(videoId: string): Promise<{
        status: number;
        data: import("mongoose").Document<unknown, {}, Video, {}> & Video & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    createVideo(userId: string, createVideoDto: CreateVideoDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Video, {}> & Video & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
