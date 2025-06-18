import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for images
  },
});

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        // Check if file is an image
        if (!file.mimetype.startsWith('image/')) {
          return callback(
            new HttpException(
              'Định dạng file không hợp lệ.',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.handleUpload(file);
  }

  @Post('public')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        // Check if file is an image
        if (!file.mimetype.startsWith('image/')) {
          return callback(
            new HttpException(
              'Định dạng file không hợp lệ.',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadPublicFile(@UploadedFile() file: Express.Multer.File) {
    return this.handleUpload(file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('video')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.handleVideoUpload(file);
  }

  private async handleUpload(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    // Tạo promise để upload lên Cloudinary từ buffer
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });

    try {
      const result = (await uploadPromise) as {
        secure_url: string;
        public_id: string;
      };
      return {
        status: 200,
        message: 'File uploaded successfully',
        imageUrl: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new HttpException(
        'File upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async handleVideoUpload(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No video uploaded', HttpStatus.BAD_REQUEST);
    }

    // Kiểm tra file type
    if (!file.mimetype.startsWith('video/')) {
      throw new HttpException('File must be a video', HttpStatus.BAD_REQUEST);
    }

    // Tạo promise để upload video lên Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          chunk_size: 6000000,
          eager: [
            { format: 'mp4', quality: 'auto' },
            { format: 'webm', quality: 'auto' },
          ],
          eager_async: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });

    try {
      const result = (await uploadPromise) as {
        secure_url: string;
        public_id: string;
        eager: Array<{
          url: string;
          format: string;
        }>;
      };

      return {
        status: 200,
        message: 'Video uploaded successfully',
        videoUrl: result.secure_url,
        publicId: result.public_id,
        formats: result.eager.map((format) => ({
          url: format.url,
          type: format.format,
        })),
      };
    } catch (error) {
      console.error('Cloudinary video upload error:', error);
      throw new HttpException(
        'Video upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
