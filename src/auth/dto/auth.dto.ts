import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  kelas: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  jurusan: string;
}
