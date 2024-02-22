import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async doLogin(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        nama: dto.nama,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const password = await argon.verify(user.password, dto.password);

    if (!password) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return { user: user };
  }

  async doRegister(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          nama: dto.nama,
          kelas: dto.kelas,
          jurusan: dto.jurusan,
          password: hash,
        },
        select: {
          id: true,
          nama: true,
          kelas: true,
          jurusan: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }
}
