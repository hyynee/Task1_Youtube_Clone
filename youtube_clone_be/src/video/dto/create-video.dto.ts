import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVideoDTO {
  @ApiProperty({
    description: 'The title of the video',
    example: 'My first video',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the video',
    example: 'This is my first video',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The duration of the video',
    example: 100,
  })
  @IsOptional()
  duration?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  video: Express.Multer.File;
}
