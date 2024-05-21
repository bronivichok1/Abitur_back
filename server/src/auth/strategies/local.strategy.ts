import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField:'number',passwordField:'date_of_issue'});
  }

  async validate(number: string, date_of_issue: string): Promise<any> {
    const user = await this.authService.validateUser(number, date_of_issue);
    if (!user) {
      throw new NotFoundException({error:'3'});
    }
    return user;
  }
}