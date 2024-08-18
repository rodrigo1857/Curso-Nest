import { Injectable } from '@nestjs/common';
import { CreateBranDto } from './dto/create-bran.dto';
import { UpdateBranDto } from './dto/update-bran.dto';

@Injectable()
export class BransService {
  create(createBranDto: CreateBranDto) {
    return 'This action adds a new bran';
  }

  findAll() {
    return `This action returns all brans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bran`;
  }

  update(id: number, updateBranDto: UpdateBranDto) {
    return `This action updates a #${id} bran`;
  }

  remove(id: number) {
    return `This action removes a #${id} bran`;
  }
}
