import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from 'Schema/video.shema';
import { CreateVideoDTO } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}

  async getAllVideos() {
    const videos = await this.videoModel
      .find()
      .populate('uploadedBy', 'name email avatar')
      .sort({ createdAt: -1 })
      .exec();
    return videos;
  }

  async getVideoUserById(userId: string) {
    const videos = await this.videoModel.find({ uploadedBy: userId });
    return videos;
  }
  async getVideoDetails(videoId: string) {
    const video = await this.videoModel
      .findById(videoId)
      .populate('uploadedBy', 'name email avatar')
      .exec();

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    // Tăng lượt xem
    video.views += 1;
    await video.save();

    return {
      status: 200,
      data: video,
    };
  }

  async createVideo(userId: string, createVideoDto: CreateVideoDTO) {
    const newVideo = new this.videoModel({
      ...createVideoDto,
      uploadedBy: userId,
      views: 0,
      likes: [],
      dislikes: [],
    });

    const savedVideo = await newVideo.save();
    return {
      status: 200,
      message: 'Video created successfully',
      data: savedVideo,
    };
  }
}
