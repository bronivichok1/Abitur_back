import { Controller, Post, UseGuards, Request,Get, Param, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService){}
   
     @Post('login')
     @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }
  @Get(':folderName')
  async getFileNamesFromFolder(@Param('folderName') folderName: string, @Res() res: Response) {
      const directoryPath = './static/default/' + folderName + '/';
  
      fs.readdir(directoryPath, (err, files) => {
          if (err) {
            res.status(200).json({ fileNames: null });
          } else {
              const fileNames = files.map(file => file);
              res.status(200).json({ fileNames: fileNames }); 
          }
      });
  }
}
