import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    // --- Categories Endpoints ---

    @UseGuards(JwtAuthGuard)
    @Post('categories')
    createCategory(@Body() createDto: CreateSkillCategoryDto) {
        return this.skillsService.createCategory(createDto);
    }

    @Get('categories')
    findAllCategories() {
        return this.skillsService.findAllCategories();
    }

    @UseGuards(JwtAuthGuard)
    @Patch('categories/:id')
    updateCategory(@Param('id') id: string, @Body() updateDto: UpdateSkillCategoryDto) {
        return this.skillsService.updateCategory(id, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('categories/:id')
    removeCategory(@Param('id') id: string) {
        return this.skillsService.removeCategory(id);
    }

    // --- Skills Endpoints ---

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillsService.create(createSkillDto);
    }

    @Get()
    findAll() {
        return this.skillsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.skillsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
        return this.skillsService.update(id, updateSkillDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.skillsService.remove(id);
    }
}
