import { IsString, IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
enum AccountType {
  Hunter = 'hunter',
  Agent = 'agent',
  Landlord = 'landlord',
}

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(AccountType)
  accountType!: AccountType | string;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;
}
