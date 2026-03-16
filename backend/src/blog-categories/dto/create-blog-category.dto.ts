import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateBlogCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}
