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
}
