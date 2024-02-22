import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BarangModule } from './barang/barang.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, BarangModule],
})
export class AppModule {}
