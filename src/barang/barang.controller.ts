import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangDto } from './dto/barang.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('barang')
export class BarangController {
  constructor(private BarangService: BarangService) {}
  @Get()
  Index() {
    return this.BarangService.index();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('gambar', {
      storage: diskStorage({
        destination: './image',
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random());
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${unique}-${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  Store(@Body() dto: BarangDto, @UploadedFile() img: Express.Multer.File) {
    return this.BarangService.create(dto, img);
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
