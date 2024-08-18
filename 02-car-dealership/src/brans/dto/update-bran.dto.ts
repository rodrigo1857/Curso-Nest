import { PartialType } from '@nestjs/mapped-types';
import { CreateBranDto } from './create-bran.dto';

export class UpdateBranDto extends PartialType(CreateBranDto) {}
