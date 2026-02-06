import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    bio: string;

    @IsInt()
    @IsNotEmpty()
    yearsExperience: number;

    @IsInt()
    @IsNotEmpty()
    projectsDone: number;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsOptional()
    @IsString()
    cvUrl?: string;

    @IsOptional()
    @IsBoolean()
    availableForHi?: boolean;
}
