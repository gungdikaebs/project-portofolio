import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('certifications')
export class CertificationsController {
    constructor(private readonly certificationsService: CertificationsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCertificationDto: CreateCertificationDto) {
        return this.certificationsService.create(createCertificationDto);
    }

    @Get()
    findAll() {
        return this.certificationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.certificationsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
        return this.certificationsService.update(id, updateCertificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.certificationsService.remove(id);
    }
}
