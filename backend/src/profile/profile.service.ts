import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async findProfile() {
        const profile = await this.prisma.profile.findFirst();
        if (!profile) {
            // Create default if not exists
            return this.prisma.profile.create({
                data: {
                    bio: 'Welcome to my portfolio!',
                    yearsExperience: 0,
                    projectsDone: 0,
                    location: 'Remote',
                    availableForHi: true,
                },
            });
        }
        return profile;
    }

    async update(updateProfileDto: UpdateProfileDto) {
        const profile = await this.findProfile();
        return this.prisma.profile.update({
            where: { id: profile.id },
            data: updateProfileDto,
        });
    }
}
