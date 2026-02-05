import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    year: string;

    @IsArray()
    @IsNotEmpty()
    techStack: string[];

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsOptional()
    @IsString()
    projectUrl?: string;
}
