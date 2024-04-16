import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService)
    {}

    async validateUser(number: string, date_of_expiry: string): Promise<any> {
        const user = await this.userService.findOne(number, date_of_expiry);
        if (user) {
            return user
        }        // TODO: Generate a JWT and return it here
        // instead of the user object
        throw new UnauthorizedException('Number or data are incorrect')
      }
}
