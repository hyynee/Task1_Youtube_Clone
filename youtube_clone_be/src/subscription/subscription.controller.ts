import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { SubscriptionService } from './subscription.service';

@ApiTags('Subscription')
@Controller('subscription')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('/getAllSubscriptions')
  @HttpCode(200)
  getAllSubscriptions(@CurrentUser() CurrentUser) {
    const currentUserId = CurrentUser.user.id;
    return this.subscriptionService.getAllSubscriptions(currentUserId);
  }

  @Get('/getAllSubscribers')
  @HttpCode(200)
  getAllSubscribers(@CurrentUser() CurrentUser) {
    const currentUserId = CurrentUser.user.id;
    return this.subscriptionService.getAllSubscribers(currentUserId);
  }
  @Get('/status/:userId')
  @HttpCode(200)
  checkSubscriptionStatus(
    @CurrentUser() CurrentUser,
    @Param('userId') userId: string,
  ) {
    const currentUserId = CurrentUser.user.id;
    return this.subscriptionService.checkSubscriptionStatus(
      currentUserId,
      userId,
    );
  }
  @Post(':userId')
  @HttpCode(200)
  follow(@CurrentUser() CurrentUser, @Param('userId') userId: string) {
    const currentUserId = CurrentUser.user.id;
    return this.subscriptionService.follow(currentUserId, userId);
  }

  @Post('/unfollow/:userId')
  @HttpCode(200)
  unfollow(@CurrentUser() CurrentUser, @Param('userId') userId: string) {
    const currentUserId = CurrentUser.user.id;
    return this.subscriptionService.unfollow(currentUserId, userId);
  }
}
