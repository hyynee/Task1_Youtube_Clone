import { Document, Types } from 'mongoose';
export declare class User extends Document {
    name: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: Types.ObjectId[];
    comparePassword: (password: string) => Promise<boolean>;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
