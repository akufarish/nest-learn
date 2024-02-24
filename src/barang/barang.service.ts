import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BarangDto } from './dto/barang.dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) {}

  async index() {
    const barang = await this.prisma.barang.findMany();

    return barang;
  }

  async create(dto: BarangDto, img: Express.Multer.File) {
    try {
      const barang = await this.prisma.barang.create({
        data: {
          nama_barang: dto.nama_barang,
          harga: dto.harga,
          gambar: img.path,
        },
      });

      return barang;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Invalid Credentials');
      }
    }
  }

  async show(id: number) {
    const barang = await this.prisma.barang.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (barang) {
      return barang;
    } else {
      throw new NotFoundException('Credentials not found');
    }
  }

  async update(id: number, dto: BarangDto) {
    try {
      const barang = await this.prisma.barang.update({
        where: {
          id: Number(id),
        },
        data: {
          nama_barang: dto.nama_barang,
          harga: dto.harga,
        },
      });
      return barang;
    } catch (error) {
      if (error instanceof PrismaClientUnknownRequestError) {
        throw new ForbiddenException('Invalid Credentials');
      }
    }
  }

  async delete(id: number) {
    const barang = await this.prisma.barang.delete({
      where: {
        id: Number(id),
      },
    });

    if (barang) {
      return {
        msg: 'Data berhasil dihapus',
      };
    } else {
      throw new NotFoundException('Credentials not found');
    }
  }
}
