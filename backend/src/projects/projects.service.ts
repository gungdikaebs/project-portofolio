import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    create(createProjectDto: CreateProjectDto) {
        // return this.prisma.project.create({
        //   data: createProjectDto,
        // });
        return { message: 'Project creation disabled for Auth testing' };
    }

    findAll() {
        // return this.prisma.project.findMany();
        return [];
    }

    findOne(id: string) {
        // return this.prisma.project.findUnique({
        //   where: { id },
        // });
        return {};
    }

    update(id: string, updateProjectDto: UpdateProjectDto) {
        // return this.prisma.project.update({
        //   where: { id },
        //   data: updateProjectDto,
        // });
        return {};
    }

    remove(id: string) {
        // return this.prisma.project.delete({
        //   where: { id },
        // });
        return {};
    }
}
