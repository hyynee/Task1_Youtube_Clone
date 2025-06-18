"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscription_shema_1 = require("../../Schema/subscription.shema");
const user_shema_1 = require("../../Schema/user.shema");
let SubscriptionService = class SubscriptionService {
    subscriptionModel;
    userModel;
    constructor(subscriptionModel, userModel) {
        this.subscriptionModel = subscriptionModel;
        this.userModel = userModel;
    }
    async getAllSubscriptions(currentUserId) {
        const subscriptions = await this.subscriptionModel
            .find({ subscriber: currentUserId })
            .populate('subscribedTo', 'name avatar');
        return subscriptions;
    }
    async getAllSubscribers(currentUserId) {
        const subscribers = await this.subscriptionModel
            .find({ subscribedTo: currentUserId })
            .populate('subscriber', 'name avatar');
        return subscribers;
    }
    async checkSubscriptionStatus(currentUserId, userId) {
        if (currentUserId === userId) {
            throw new common_1.HttpException('Không thể kiểm tra trạng thái với chính mình', common_1.HttpStatus.BAD_REQUEST);
        }
        const subscription = await this.subscriptionModel.findOne({
            subscriber: currentUserId,
            subscribedTo: userId,
        });
        return { isSubscribed: !!subscription };
    }
    async follow(currentUserId, userId) {
        if (currentUserId === userId) {
            throw new common_1.HttpException('Không thể tự theo dõi chính mình', common_1.HttpStatus.BAD_REQUEST);
        }
        const subscribedUser = await this.userModel.findById(userId);
        if (!subscribedUser) {
            throw new common_1.HttpException('Người dùng không tồn tại', common_1.HttpStatus.NOT_FOUND);
        }
        const existingSubscription = await this.subscriptionModel.findOne({
            subscriber: currentUserId,
            subscribedTo: userId,
        });
        if (existingSubscription) {
            throw new common_1.HttpException('Đã theo dõi người dùng này', common_1.HttpStatus.BAD_REQUEST);
        }
        const newSubscription = await this.subscriptionModel.create({
            subscriber: currentUserId,
            subscribedTo: userId,
        });
        await newSubscription.save();
        return { message: 'Đăng ký theo dõi thành công!' };
    }
    async unfollow(currentUserId, userId) {
        const subscription = await this.subscriptionModel.findOneAndDelete({
            subscriber: currentUserId,
            subscribedTo: userId,
        });
        if (!subscription) {
            throw new common_1.HttpException('Không tìm thấy đăng ký theo dõi', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Hủy theo dõi thành công!' };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_shema_1.Subscription.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_shema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map