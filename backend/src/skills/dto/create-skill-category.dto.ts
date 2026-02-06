import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
