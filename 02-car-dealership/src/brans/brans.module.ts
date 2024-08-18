import { Module } from '@nestjs/common';
import { BransService } from './brans.service';
import { BransController } from './brans.controller';

@Module({
  controllers: [BransController],
  providers: [BransService],
})
export class BransModule {}
