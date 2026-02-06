import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
    constructor(private prisma: PrismaService) { }

    async create(file: Express.Multer.File) {
        const fileUrl = `/uploads/${file.filename}`;

        return this.prisma.media.create({
            data: {
                fileName: file.filename,
                fileUrl: fileUrl,
                mimeType: file.mimetype,
                size: file.size,
            },
        });
    }

    findAll() {
        return this.prisma.media.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}
