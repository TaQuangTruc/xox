import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_HOST, DB_PASS, DB_PORT, DB_USER, DB_NAME } from 'src/common/env';
import { Appointment } from './entities/appointment.entity';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: DB_PORT || 5432,
  username: DB_USER || 'admin',
  password: DB_PASS || 'admin',
  database: DB_NAME || 'blog-cooking',
  entities: [Appointment],
  synchronize: true,
});
