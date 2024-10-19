import { Controller } from '@nestjs/common';
import { PruebasService } from './pruebas.service';

@Controller('pruebas')
export class PruebasController {
  constructor(private readonly pruebasService: PruebasService) {}
}
