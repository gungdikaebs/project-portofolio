import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateEducationDto {
    @IsString()
    @IsNotEmpty()
    degree: string;

    @IsString()
    @IsNotEmpty()
    institution: string;

    @IsInt()
    @IsNotEmpty()
    startYear: number;

    @IsOptional()
    @IsInt()
    endYear?: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}
