import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateCertificationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    issuer: string;

    @IsInt()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    credentialUrl?: string;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}
