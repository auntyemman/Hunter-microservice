import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

enum Gender {
  Male = 'male',
  Female = 'female',
}

class AddressDTO {
  @IsString()
  street!: string;

  @IsString()
  city!: string;

  @IsString()
  LGA!: string;

  @IsString()
  state!: string;

  @IsString()
  zipCode!: string;
}

export class ProfileDTO {
  @IsOptional()
  @IsString()
  _id!: string;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  middleName!: string;

  @IsString()
  phone!: string;

  @IsString()
  alternatePhone!: string;

  @IsOptional()
  @IsOptional()
  DOB!: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender!: Gender | string;

  @IsString()
  @IsOptional()
  age!: number;

  @IsString()
  nationality!: string;

  @IsString()
  origin!: string;

  @IsArray()
  @IsString({ each: true })
  languages!: string[];

  @IsOptional()
  @IsString()
  picture!: string;

  @IsOptional()
  @IsString()
  summary!: string;

  @IsOptional()
  @IsString()
  occupation!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  address!: AddressDTO[];

  @IsArray()
  @IsString({ each: true })
  openTo!: string[];
}
