import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { iUser } from 'src/types/types';
@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,    
        /*private readonly jwtService: JwtService*/
        )
    {}

    async validateUser(number: string, date_of_expiry: string): Promise<any> {
        const user = await this.userService.findOne(number, date_of_expiry);
        if (user) {
            return user
        }        // TODO: Generate a JWT and return it here
        // instead of the user object
        throw new BadRequestException('Number or data are incorrect')
      }

/*
      async login(user: iUser) {
        const {id, number, date_of_expiry}=user
        return {
          id, number, date_of_expiry,token:this.jwtService.sign({id:user.id,number:user.number,date_of_expiry:user.date_of_expiry})
        };
}*/
}
