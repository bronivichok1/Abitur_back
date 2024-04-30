import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post()
  update(
    @Param() number: string,
    @Body() updateUserDto:UpdateUserDto,
  ){
return this.userService.update(number,updateUserDto)
  }
/*
  @Post()
  findOne() {
    return this.userService.findOne();
  }
  */
}
