import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, ProjectStatus } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async create(createProjectDto: CreateProjectDto) {
        const { skillIds, status, ...data } = createProjectDto;

        // Map status enum manually if needed, or rely on type compatibility
        // Using explicit cast to avoid type mismatches if enum generated differently
        const projectStatus = status as unknown as 'DRAFT' | 'PUBLISHED';

        return this.prisma.project.create({
            data: {
                ...data,
                status: projectStatus || 'DRAFT',
                skills: skillIds ? {
                    create: skillIds.map(skillId => ({ skillId }))
                } : undefined
            },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    }

    findAll() {
        return this.prisma.project.findMany({
            orderBy: { sortOrder: 'asc' },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    }

    findOne(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        const { skillIds, status, ...data } = updateProjectDto;
        const projectStatus = status as unknown as 'DRAFT' | 'PUBLISHED';

        return this.prisma.project.update({
            where: { id },
            data: {
                ...data,
                status: projectStatus,
                skills: skillIds ? {
                    deleteMany: {}, // Remove all existing relations
                    create: skillIds.map(skillId => ({ skillId })) // Add new ones
                } : undefined
            },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    }

    remove(id: string) {
        return this.prisma.project.delete({
            where: { id },
        });
    }
}
