import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { ReorderSkillCategoriesDto } from './dto/reorder-skill-categories.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

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

  async createCategory(createDto: CreateSkillCategoryDto) {
    const lastCategory =
      createDto.sortOrder === undefined
        ? await this.prisma.skillCategory.findFirst({
            orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
            select: { sortOrder: true },
          })
        : null;

    return this.prisma.skillCategory.create({
      data: {
        ...createDto,
        sortOrder: createDto.sortOrder ?? (lastCategory?.sortOrder ?? -1) + 1,
      },
    });
  }

  findAllCategories() {
    return this.prisma.skillCategory.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      include: {
        skills: {
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        },
      },
    });
  }

  updateCategory(id: string, updateDto: UpdateSkillCategoryDto) {
    return this.prisma.skillCategory.update({
      where: { id },
      data: updateDto,
    });
  }

  async reorderCategories(reorderDto: ReorderSkillCategoriesDto) {
    await this.prisma.$transaction(
      reorderDto.categories.map((category) =>
        this.prisma.skillCategory.update({
          where: { id: category.id },
          data: { sortOrder: category.sortOrder },
        }),
      ),
    );

    return this.findAllCategories();
  }

  removeCategory(id: string) {
    return this.prisma.skillCategory.delete({
      where: { id },
    });
  }
}
