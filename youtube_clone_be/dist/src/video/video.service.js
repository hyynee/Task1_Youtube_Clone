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
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_shema_1 = require("../../Schema/video.shema");
let VideoService = class VideoService {
    videoModel;
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async getAllVideos() {
        const videos = await this.videoModel
            .find()
            .populate('uploadedBy', 'name email avatar')
            .sort({ createdAt: -1 })
            .exec();
        return videos;
    }
    async getVideoUserById(userId) {
        const videos = await this.videoModel.find({ uploadedBy: userId });
        return videos;
    }
    async getVideoDetails(videoId) {
        const video = await this.videoModel
            .findById(videoId)
            .populate('uploadedBy', 'name email avatar')
            .exec();
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        video.views += 1;
        await video.save();
        return {
            status: 200,
            data: video,
        };
    }
    async createVideo(userId, createVideoDto) {
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
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_shema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideoService);
//# sourceMappingURL=video.service.js.map