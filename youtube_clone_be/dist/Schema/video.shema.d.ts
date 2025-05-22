import { Document, Types } from 'mongoose';
export declare class Video extends Document {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    views: number;
    duration: number;
    uploadedBy: Types.ObjectId;
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
}
export declare const VideoSchema: import("mongoose").Schema<Video, import("mongoose").Model<Video, any, any, any, Document<unknown, any, Video, any> & Video & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Video, Document<unknown, {}, import("mongoose").FlatRecord<Video>, {}> & import("mongoose").FlatRecord<Video> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
