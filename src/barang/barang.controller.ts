import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangDto } from './dto/barang.dto';

@Controller('barang')
export class BarangController {
  constructor(private BarangService: BarangService) {}
  @Get()
  Index() {
    return this.BarangService.index();
  }

  @Post()
  Store(@Body() dto: BarangDto) {
    return this.BarangService.create(dto);
  }

  @Get(':id')
  Show(@Param('id') id: number) {
    return this.BarangService.show(id as number);
  }

  @Put(':id')
  Update(@Param('id') id: number, @Body() dto: BarangDto) {
    return this.BarangService.update(id as number, dto);
  }

  @Delete(':id')
  Delete(@Param('id') id: number) {
    return this.BarangService.delete(id as number);
  }
}
