import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    getProfile() {
        return this.profileService.findProfile();
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.update(updateProfileDto);
    }
}
