import { Controller, Post, UseGuards, Request,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService){}
   
     @Post('login')
     @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return /*this.authService.login(*/req.user/*)*/;
  }
  /* Защищённый токином роут
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  */
}
