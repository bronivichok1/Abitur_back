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
  @Patch(':id') 
  update( 
    @Param('id') id:number,
    @Body() updateUserDto:UpdateUserDto, 
  ){ 
return this.userService.update(+id,updateUserDto) 
  }
  @Post('/drop/:id') 
  delete( 
    @Param('id') id:number,
  ){ 
return this.userService.delete(+id) 
  }
}
