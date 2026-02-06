import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
    constructor(private prisma: PrismaService) { }

    create(createExperienceDto: CreateExperienceDto) {
        return this.prisma.experience.create({
            data: createExperienceDto,
        });
    }

    findAll() {
        return this.prisma.experience.findMany({
            orderBy: { sortOrder: 'asc' }, // Or startDate desc
        });
    }

    findOne(id: string) {
        return this.prisma.experience.findUnique({
            where: { id },
        });
    }

    update(id: string, updateExperienceDto: UpdateExperienceDto) {
        return this.prisma.experience.update({
            where: { id },
            data: updateExperienceDto,
        });
    }

    remove(id: string) {
        return this.prisma.experience.delete({
            where: { id },
        });
    }
}
