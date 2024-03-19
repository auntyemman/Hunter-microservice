import { validate, ValidationError } from 'class-validator';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { SignUpDTO } from '../dto/signUp.dto';

export const validateRequest = async (typeDTO: ClassConstructor<T>, requestData: SignUpDTO) => {
  const dto = plainToClass(typeDTO, requestData);
  const errors = await validate(
    dto,
    { whitelist: true, forbidNonWhitelisted: true },
    { validationError: { target: true } },
  );
  if (errors.length > 0) {
    const errorMessages = errors
      .map((error: ValidationError) => Object.values(error.constraints || {}))
      .join(', ');
    return Promise.reject(new Error(errorMessages));
  }
  return dto;
};
