import { Model } from 'mongoose';
import { Subscription } from 'Schema/subscription.shema';
import { User } from 'Schema/user.shema';
export declare class SubscriptionService {
    private subscriptionModel;
    private userModel;
    constructor(subscriptionModel: Model<Subscription>, userModel: Model<User>);
    getAllSubscriptions(currentUserId: string): Promise<(import("mongoose").Document<unknown, {}, Subscription, {}> & Subscription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllSubscribers(currentUserId: string): Promise<(import("mongoose").Document<unknown, {}, Subscription, {}> & Subscription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    checkSubscriptionStatus(currentUserId: string, userId: string): Promise<{
        isSubscribed: boolean;
    }>;
    follow(currentUserId: string, userId: string): Promise<{
        message: string;
    }>;
    unfollow(currentUserId: string, userId: string): Promise<{
        message: string;
    }>;
}
