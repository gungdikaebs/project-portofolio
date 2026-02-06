import { Controller, Post, UseInterceptors, UploadedFile, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.mediaService.create(file);
    }

    @Get()
    findAll() {
        return this.mediaService.findAll();
    }
}
