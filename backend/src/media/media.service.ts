import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import sharp from 'sharp';

@Injectable()
export class MediaService {
    constructor(private prisma: PrismaService) { }

    async create(file: Express.Multer.File) {
        if (!file?.buffer) {
            throw new BadRequestException('No file was uploaded.');
        }

        const uploadsDirectory = join(process.cwd(), 'uploads');
        await mkdir(uploadsDirectory, { recursive: true });

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const isImage = file.mimetype.startsWith('image/');

        let outputBuffer = file.buffer;
        let outputMimeType = file.mimetype;
        let outputFileName = `file-${uniqueSuffix}${extname(file.originalname).toLowerCase()}`;

        if (isImage) {
            try {
                outputBuffer = await sharp(file.buffer)
                    .rotate()
                    .resize({
                        width: 1920,
                        height: 1920,
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .webp({ quality: 80, effort: 4 })
                    .toBuffer();
                outputMimeType = 'image/webp';
                outputFileName = `image-${uniqueSuffix}.webp`;
            } catch {
                throw new BadRequestException('The uploaded image could not be processed.');
            }
        }

        await writeFile(join(uploadsDirectory, outputFileName), outputBuffer);
        const fileUrl = `/uploads/${outputFileName}`;

        return this.prisma.media.create({
            data: {
                fileName: outputFileName,
                fileUrl,
                mimeType: outputMimeType,
                size: outputBuffer.length,
            },
        });
    }

    findAll() {
        return this.prisma.media.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}
