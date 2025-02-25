import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  dataBaseUrl: string;

  @IsString()
  @IsNotEmpty()
  directUrl: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dataBaseUrl: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL,
});

const errors = validateSync(env);

if (errors.length) {
  throw new Error(JSON.stringify(errors, null, 2));
}
