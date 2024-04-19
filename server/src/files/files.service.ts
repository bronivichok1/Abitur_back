import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {access, mkdir, writeFile} from 'fs/promises'
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { MFile } from './mfile.class';
import {v4} from 'uuid';
import { join } from 'path';
import sharp from 'sharp';
import { FileResponse } from './file.interface';

@Injectable()
export class FilesService {
  /*create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }*/
  async saveFiles(files:MFile[], folder='default'){
    const uploadFolder=join(__dirname,'..','..','static',folder);
    try{
      await access(uploadFolder);
    }
    catch(e){
      await mkdir(uploadFolder,{recursive:true});
    }

    const res: FileResponse[]=await Promise.all(
      files.map(
        async(file):Promise<FileResponse>=>{
        try{
          await writeFile(join(uploadFolder, file.originalname),file.buffer);
        }
        catch(e){
          throw new InternalServerErrorException('Ошибка при записи файла')
        }
        return {
          url:'/static/'+folder+'/'+file.originalname,
          name:file.originalname
        };
      })
    );
  }
  convertToWebP(file:Buffer):Promise<Buffer>{
    return sharp(file).webp().toBuffer();
  }

  async filterFiles(files:MFile[]){
    
    const newFiles=await Promise.all(
      
      files.map(
        async file=>{
          const mimetype =file.mimetype;
          const currentFileType = file.mimetype.split('/')[1];
          const newName=v4();
          const type=file.originalname.split('.')[1];

          if(mimetype.includes('image')){
            if(currentFileType!='svg+xml'){
              const buffer = await this.convertToWebP(file.buffer);
              return new MFile({
                  buffer,
                  originalname:newName+'.webp',
                  mimetype,
              });
            }
            return new MFile({
              buffer:file.buffer,
              originalname:newName+'.svg',
              mimetype,
            });
          }
          return new MFile({
            buffer: file.buffer,
            originalname: newName+'.'+type,
            mimetype,
          });
        })
    );
      
        return newFiles;
  }
}
