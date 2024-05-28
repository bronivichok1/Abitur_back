import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserData } from './entities/user.entity';
import { Repository } from 'typeorm';
/*import { JwtService } from '@nestjs/jwt';*/

@Injectable()
export class UserService {
  userService: any;
  constructor(
    @InjectRepository(UserData) private readonly userRepository: Repository<UserData>,
    /*private readonly jwtService:JwtService*/
    ){}
  async create(createUserDto: CreateUserDto) {
 /*   const existUser=await this.userRepository.findOne({
      where:{
        number:createUserDto.number,
        date_of_issue:createUserDto.date_of_issue
      },
    })
    if(existUser) throw new NotFoundException({error:'1'})
*/
    
    const user=await this.userRepository.save({
      name: createUserDto.name,
      surname: createUserDto.surname,
      namerus:createUserDto.namerus,
      surnamerus:createUserDto.surnamerus,
      surname_info: createUserDto.surname_info,
      date_of_birth: createUserDto.date_of_birth,
      citizenship: createUserDto.citizenship,
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
    console.log(user)
    /*const token= this.jwtService.sign({number:createUserDto.number})*/
    return user/*,token*/;

  }

  
  async findOne(number:string,date_of_issue:string) {
    return await this.userRepository.findOne({
      where:{
        number:number,
        date_of_issue:date_of_issue,
      }});
  }



  async update(number:string,updateUserDto: UpdateUserDto) {
    const user=await this.userRepository.findOne({
      where:{number},
    })
    

    if(!user) throw new NotFoundException({error:'2'})
    return await this.userRepository.update(number,updateUserDto);
  }

/*
  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
