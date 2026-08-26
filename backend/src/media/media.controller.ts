import { Controller, Post, UseInterceptors, UploadedFile, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
        storage: memoryStorage(),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.mediaService.create(file);
    }

    @Get()
    findAll() {
        return this.mediaService.findAll();
    }
}
