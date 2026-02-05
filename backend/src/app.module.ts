import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProfileModule } from './profile/profile.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { CertificationsModule } from './certifications/certifications.module';
import { SkillsModule } from './skills/skills.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, ProjectsModule, ProfileModule, ExperienceModule, EducationModule, CertificationsModule, SkillsModule, MediaModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
