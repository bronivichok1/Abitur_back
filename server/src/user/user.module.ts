import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserData } from './entities/user.entity';
/*import { JwtModule } from '@nestjs/jwt';*/
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([UserData]),],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
