import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    async create(createBlogDto: CreateBlogDto) {
        const { status, publishedAt, ...data } = createBlogDto;

        const blogStatus = status as unknown as 'DRAFT' | 'PUBLISHED';

        return this.prisma.blog.create({
            data: {
                ...data,
                status: blogStatus || 'DRAFT',
                publishedAt: publishedAt ? new Date(publishedAt) : null,
            },
            include: {
                category: true,
            },
        });
    }

    findAll() {
        return this.prisma.blog.findMany({
            orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }],
            include: {
                category: true,
            },
        });
    }

    findById(id: string) {
        return this.prisma.blog.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
    }

    findBySlug(slug: string) {
        return this.prisma.blog.findUnique({
            where: { slug },
            include: {
                category: true,
            },
        });
    }

    async update(id: string, updateBlogDto: UpdateBlogDto) {
        const { status, publishedAt, ...data } = updateBlogDto;

        const blogStatus = status as unknown as 'DRAFT' | 'PUBLISHED';

        return this.prisma.blog.update({
            where: { id },
            data: {
                ...data,
                status: blogStatus,
                publishedAt: publishedAt ? new Date(publishedAt) : undefined,
            },
            include: {
                category: true,
            },
        });
    }

    remove(id: string) {
        return this.prisma.blog.delete({
            where: { id },
        });
    }
}
