import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogCategoriesService } from './blog-categories.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blog-categories')
export class BlogCategoriesController {
    constructor(private readonly blogCategoriesService: BlogCategoriesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBlogCategoryDto: CreateBlogCategoryDto) {
        return this.blogCategoriesService.create(createBlogCategoryDto);
    }

    @Get()
    findAll() {
        return this.blogCategoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogCategoriesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogCategoryDto: UpdateBlogCategoryDto) {
        return this.blogCategoriesService.update(id, updateBlogCategoryDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blogCategoriesService.remove(id);
    }
}
