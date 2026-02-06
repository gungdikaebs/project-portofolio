import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';

@Injectable()
export class SkillsService {
    constructor(private prisma: PrismaService) { }

    // --- Skills ---

    create(createSkillDto: CreateSkillDto) {
        return this.prisma.skill.create({
            data: createSkillDto,
        });
    }

    findAll() {
        return this.prisma.skill.findMany({
            include: { category: true },
            orderBy: { sortOrder: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.skill.findUnique({
            where: { id },
            include: { category: true },
        });
    }

    update(id: string, updateSkillDto: UpdateSkillDto) {
        return this.prisma.skill.update({
            where: { id },
            data: updateSkillDto,
        });
    }

    remove(id: string) {
        return this.prisma.skill.delete({
            where: { id },
        });
    }

    // --- Categories ---

    createCategory(createDto: CreateSkillCategoryDto) {
        return this.prisma.skillCategory.create({
            data: createDto
        });
    }

    findAllCategories() {
        return this.prisma.skillCategory.findMany({
            include: { skills: true }
        });
    }

    updateCategory(id: string, updateDto: UpdateSkillCategoryDto) {
        return this.prisma.skillCategory.update({
            where: { id },
            data: updateDto
        });
    }

    removeCategory(id: string) {
        return this.prisma.skillCategory.delete({
            where: { id }
        });
    }
}
