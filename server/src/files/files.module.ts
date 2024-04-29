import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {join} from 'path'
import {ServeStaticModule} from '@nestjs/serve-static'

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports:[]
})
export class FilesModule {}
