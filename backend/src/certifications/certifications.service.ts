import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationsService {
    constructor(private prisma: PrismaService) { }

    create(createCertificationDto: CreateCertificationDto) {
        return this.prisma.certification.create({
            data: createCertificationDto,
        });
    }

    findAll() {
        return this.prisma.certification.findMany({
            orderBy: { sortOrder: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.certification.findUnique({
            where: { id },
        });
    }

    update(id: string, updateCertificationDto: UpdateCertificationDto) {
        return this.prisma.certification.update({
            where: { id },
            data: updateCertificationDto,
        });
    }

    remove(id: string) {
        return this.prisma.certification.delete({
            where: { id },
        });
    }
}
