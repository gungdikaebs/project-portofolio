import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, IsEnum, IsArray, IsUUID } from 'class-validator';

export enum ProjectStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

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

    @IsInt()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsOptional()
    @IsString()
    projectUrl?: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;

    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;

    @IsOptional()
    @IsBoolean()
    featured?: boolean;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    skillIds?: string[];
}
