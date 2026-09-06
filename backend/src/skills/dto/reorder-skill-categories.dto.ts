import { Type } from 'class-transformer';
import { IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';

class SkillCategoryOrderDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

export class ReorderSkillCategoriesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillCategoryOrderDto)
  categories: SkillCategoryOrderDto[];
}
