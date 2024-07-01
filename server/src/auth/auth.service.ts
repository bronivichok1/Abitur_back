import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { iUser } from 'src/types/types';
@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,    
        )
    {}

    async validateUser(number: string, date_of_issue: string): Promise<any> {
        const user = await this.userService.findOne(number, date_of_issue);
        if (user) {
            return user
        }        
        throw new NotFoundException({error:'3'})
      }

    }
