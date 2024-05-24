import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {join} from 'path'
import {ServeStaticModule} from '@nestjs/serve-static'
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserData } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserData])],
  controllers: [FilesController],
  providers: [FilesService],
  exports:[FilesService],
})
export class FilesModule {}
