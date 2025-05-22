import { Document, Types } from 'mongoose';
export declare class Subscription extends Document {
    subscriber: Types.ObjectId;
    subscribedTo: Types.ObjectId;
}
export declare const SubscriptionSchema: import("mongoose").Schema<Subscription, import("mongoose").Model<Subscription, any, any, any, Document<unknown, any, Subscription, any> & Subscription & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscription, Document<unknown, {}, import("mongoose").FlatRecord<Subscription>, {}> & import("mongoose").FlatRecord<Subscription> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
