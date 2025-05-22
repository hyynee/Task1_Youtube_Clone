import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'config/database.module';
import * as multer from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UploadController } from './uploadImage/upload';
import { VideoModule } from './video/video.module';
import { SubscriptionModule } from './subscription/subscription.module';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // cau hinh de upload image
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    AuthModule,
    VideoModule,
    SubscriptionModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
