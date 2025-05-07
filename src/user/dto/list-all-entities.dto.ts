import { IsOptional, IsInt } from 'class-validator'
import { Type } from 'class-transformer'

export class ListAllEntities {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}