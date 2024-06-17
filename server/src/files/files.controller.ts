import { Controller,HttpCode, Query,UploadedFiles,UseInterceptors ,Get, Post, Body, Patch, Param, Delete, UploadedFile, NotFoundException, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import {rimraf} from 'rimraf'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserData } from 'src/user/entities/user.entity';
import  path from 'path';

@Controller('files')
export class FilesController {
  constructor( private readonly filesService: FilesService){
  }
  @Post()
  @UseInterceptors(FilesInterceptor('file', 15, {
      storage: diskStorage({
          destination: async (req, file, cb) => {

              const folderName=req.body.name
              const dir = `./static/default/${folderName}`;
              const fs = require('fs');
             
              if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir); 
              }

              cb(null, dir);
          },
          
          filename: (req, file, cb) => {
              const name = file.originalname.split('.')[0];
              const fileExtension = file.originalname.split('.')[1];
              const newFileName = name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;
              cb(null, newFileName);
          }
      }),
      
      fileFilter: (req, file, cb) => {
        
          if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|pdf)$/)) {
              return cb(null, false);
          }
          cb(null, true);
      }
  }))
  
  async UploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() requestBody: any) {
 
  }
  @Post('delete/:nameFolder/:fileName') 
  async deleteFile(@Param('nameFolder') nameFolder: string, @Param('fileName') fileName: string) {
      const fileToDeletePath = `./static/default/${nameFolder}/${fileName}`;
      const fs = require('fs');
  
      if (fs.existsSync(fileToDeletePath)) {
          fs.unlinkSync(fileToDeletePath); 
          return true;
      } else {
          return BadRequestException;
      }
  }

    /*
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string
  ){
    const newFiles=await this.filesService.filterFiles(files);
    return this.filesService.saveFiles(newFiles, folder)
  }
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }*/
}

