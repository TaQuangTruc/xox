import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffsModule } from './features/staffs/staffs.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [StaffsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
