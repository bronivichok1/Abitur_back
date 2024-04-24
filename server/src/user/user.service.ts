import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    /*private readonly jwtService:JwtService*/
    ){}
  async create(createUserDto: CreateUserDto) {
    const existUser=await this.userRepository.findOne({
      where:{
        number:createUserDto.number,
        date_of_expiry:createUserDto.date_of_expiry
      },
    })
    if(existUser) throw new BadRequestException('This passport number have in base, use editing')

    
    const user=await this.userRepository.save({
      name: createUserDto.name,
      surname: createUserDto.surname,
      surname_info: createUserDto.surname_info,
      date_of_birth: createUserDto.date_of_birth,
      citizenship: createUserDto.citizenship,
      serial:createUserDto.serial,
      number:createUserDto.number,
      PlaceOfIssue:createUserDto.PlaceOfIssue,
      date_of_issue:createUserDto.date_of_issue,
      date_of_expiry:createUserDto.date_of_expiry,
      settlement_name:createUserDto.settlement_name,
      mobile_tel:createUserDto.mobile_tel,
      email:createUserDto.email,
      edu_date_of_issue:createUserDto.edu_date_of_issue,
      edu_serial_number:createUserDto.edu_serial_number,
      edu_name:createUserDto.edu_name,
      sex:createUserDto.sex,
      country:createUserDto.country,
      DD:createUserDto.DD,
      religion:createUserDto.religion,
      DataYourPeople:createUserDto.DataYourPeople,
      NameSurname:createUserDto.NameSurname,
      PhoneRepresantative:createUserDto.PhoneRepresantative,
      country_pass:createUserDto.country_pass,
      NatPassw:createUserDto.NatPassw,
      HostelLive:createUserDto.HostelLive,
      numberNational:createUserDto.numberNational,
      pref_faculty:createUserDto.pref_faculty,
      nameFolder:createUserDto.nameFolder,
    })
    /*const token= this.jwtService.sign({number:createUserDto.number})*/
    return {user/*,token*/};

  }

  
  async findOne(number:string,date_of_expiry:string) {
    return await this.userRepository.findOne({
      where:{
        number:number,
        date_of_expiry:date_of_expiry,
      }});
  }

/*
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
