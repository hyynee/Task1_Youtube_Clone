import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    getAllSubscriptions(CurrentUser: any): Promise<(import("mongoose").Document<unknown, {}, import("../../Schema/subscription.shema").Subscription, {}> & import("../../Schema/subscription.shema").Subscription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllSubscribers(CurrentUser: any): Promise<(import("mongoose").Document<unknown, {}, import("../../Schema/subscription.shema").Subscription, {}> & import("../../Schema/subscription.shema").Subscription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    checkSubscriptionStatus(CurrentUser: any, userId: string): Promise<{
        isSubscribed: boolean;
    }>;
    follow(CurrentUser: any, userId: string): Promise<{
        message: string;
    }>;
    unfollow(CurrentUser: any, userId: string): Promise<{
        message: string;
    }>;
}
