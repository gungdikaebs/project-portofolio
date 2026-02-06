import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateExperienceDto {
    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    company: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: string; // ISO Date

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsBoolean()
    isCurrent?: boolean;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}
