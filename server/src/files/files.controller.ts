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
import slugify from 'slugify';

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
            const iconv = require('iconv-lite');
            const slugify = require('slugify');
            const name = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const fileExtension = file.originalname.split('.').pop();
            const timestamp = Date.now();
            const sanitizedFileName = slugify(name, { lower: false }); 
            const newFileName = `${sanitizedFileName}_${timestamp}.${fileExtension}`;
            const utf8FileName = iconv.encode(newFileName, 'utf8');
            cb(null, utf8FileName.toString());
        }
      }),
      
      fileFilter: (req, file, cb) => {
        
          if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|pdf)$/)) {
              return cb(null, false);
          }
          cb(null, true);
          return HttpCode(200)
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
  @Post('drop/:nameFolder') 
  async deleteFolder(@Param('nameFolder') nameFolder: string) {
    const folderPath = `./static/default/${nameFolder}`;

    if (fs.existsSync(folderPath)) {
        try {
            await fs.promises.rm(folderPath, { recursive: true });
            return true;
        } catch (error) {
            throw new NotFoundException();
        }
    } else {
        throw new NotFoundException();
    }
}
}


