import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Country {
  FR = 'FR',
}

export class AddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  streetNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Country)
  countryCode: Country;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
