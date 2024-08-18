import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BransService } from './brans.service';
import { CreateBranDto } from './dto/create-bran.dto';
import { UpdateBranDto } from './dto/update-bran.dto';

@Controller('brans')
export class BransController {
  constructor(private readonly bransService: BransService) {}

  @Post()
  create(@Body() createBranDto: CreateBranDto) {
    return this.bransService.create(createBranDto);
  }

  @Get()
  findAll() {
    return this.bransService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bransService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranDto: UpdateBranDto) {
    return this.bransService.update(+id, updateBranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bransService.remove(+id);
  }
}
