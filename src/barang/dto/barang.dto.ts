import { IsNotEmpty } from 'class-validator';

export class BarangDto {
  @IsNotEmpty()
  nama_barang: string;

  @IsNotEmpty()
  harga: string;
}
