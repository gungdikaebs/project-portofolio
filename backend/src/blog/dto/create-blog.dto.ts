import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, IsEnum, IsUUID, IsDateString } from 'class-validator';

export enum BlogStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    excerpt: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsEnum(BlogStatus)
    status?: BlogStatus;

    @IsOptional()
    @IsBoolean()
    featured?: boolean;

    @IsOptional()
    @IsInt()
    sortOrder?: number;

    @IsOptional()
    @IsDateString()
    publishedAt?: string;
}
