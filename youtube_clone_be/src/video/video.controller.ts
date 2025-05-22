import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { CreateVideoDTO } from './dto/create-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/get-all')
  getAllVideos() {
    return this.videoService.getAllVideos();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/get-user-videos')
  getVideoUserById(@CurrentUser() CurrentUser) {
    const userId = CurrentUser.user.id;
    return this.videoService.getVideoUserById(userId);
  }

  @Get('/:videoId')
  async getVideoDetails(@Param('videoId') videoId: string) {
    return this.videoService.getVideoDetails(videoId);
  }

  @ApiBearerAuth()
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  createVideo(@CurrentUser() CurrentUser, @Body() body: CreateVideoDTO) {
    const userId = CurrentUser.user.id;
    return this.videoService.createVideo(userId, body);
  }
}
