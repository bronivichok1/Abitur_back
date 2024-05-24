import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import {access, mkdir, writeFile} from 'fs/promises'
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import {v4} from 'uuid';
import { join } from 'path';
import sharp from 'sharp';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserData } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(UserData) private readonly userRepository: Repository<UserData>,
    /*private readonly jwtService:JwtService*/
    ){}
  async findByNumber(number: string,date_of_issue:string) {
    const exUser= await this.userRepository.findOne({
      where:{
        number:number,
        date_of_issue:date_of_issue,
      },
    }) 
    if(exUser){
      return exUser.id
    } else throw NotFoundException

}


  /*async findUserIdByNumber(number: string) {
    const userID = await this.userService.findByNumber(number);
    return userID ; // Предположим, что метод findByNumber возвращает данные пользователя с его ID
  }*/
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
  }
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
  }*/
}
