import { IsNotEmpty, IsString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsOptional()
    svgContent?: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}
