import { Module } from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './image',
    }),
  ],
  providers: [BarangService],
  controllers: [BarangController],
})
export class BarangModule {}
