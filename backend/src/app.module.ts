import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
import { BlogModule } from './blog/blog.module';
import { BlogCategoriesModule } from './blog-categories/blog-categories.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    ProfileModule,
    ExperienceModule,
    EducationModule,
    CertificationsModule,
    SkillsModule,
    MediaModule,
    BlogModule,
    BlogCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

