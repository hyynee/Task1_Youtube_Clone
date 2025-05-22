import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from 'Schema/subscription.shema';
import { User } from 'Schema/user.shema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<Subscription>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getAllSubscriptions(currentUserId: string) {
    const subscriptions = await this.subscriptionModel
      .find({ subscriber: currentUserId })
      .populate('subscribedTo', 'name avatar');
    return subscriptions;
  }

  async getAllSubscribers(currentUserId: string) {
    const subscribers = await this.subscriptionModel
      .find({ subscribedTo: currentUserId })
      .populate('subscriber', 'name avatar');
    return subscribers;
  }

  async follow(currentUserId: string, userId: string) {
    // console.log('currentUserId', currentUserId);
    // console.log('userId', userId);
    if (currentUserId === userId) {
      throw new HttpException(
        'Không thể tự theo dõi chính mình',
        HttpStatus.BAD_REQUEST,
      );
    }
    const subscribedUser = await this.userModel.findById(userId);
    if (!subscribedUser) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    const existingSubscription = await this.subscriptionModel.findOne({
      subscriber: currentUserId,
      subscribedTo: userId,
    });
    if (existingSubscription) {
      throw new HttpException(
        'Đã theo dõi người dùng này',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newSubscription = await this.subscriptionModel.create({
      subscriber: currentUserId,
      subscribedTo: userId,
    });
    await newSubscription.save();
    return { message: 'Đăng ký theo dõi thành công!' };
  }
}
