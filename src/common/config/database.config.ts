import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`dist/**/*.entity.js`],
  migrations: [`dist/database/migrations/**/*.js`],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};
