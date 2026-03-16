import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@Injectable()
export class BlogCategoriesService {
    constructor(private prisma: PrismaService) { }

    create(createBlogCategoryDto: CreateBlogCategoryDto) {
        return this.prisma.blogCategory.create({
            data: createBlogCategoryDto,
        });
    }

    findAll() {
        return this.prisma.blogCategory.findMany({
            orderBy: { sortOrder: 'asc' },
            include: {
                _count: {
                    select: { blogs: true },
                },
            },
        });
    }

    findOne(id: string) {
        return this.prisma.blogCategory.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { blogs: true },
                },
            },
        });
    }

    update(id: string, updateBlogCategoryDto: UpdateBlogCategoryDto) {
        return this.prisma.blogCategory.update({
            where: { id },
            data: updateBlogCategoryDto,
        });
    }

    remove(id: string) {
        return this.prisma.blogCategory.delete({
            where: { id },
        });
    }
}
