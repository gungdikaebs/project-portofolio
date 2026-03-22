import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateBlogCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}
