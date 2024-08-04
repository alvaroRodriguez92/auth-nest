import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import {PassportModule} from "@nestjs/passport";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]),PassportModule, JwtModule.register({
    signOptions: { expiresIn: '60s' },
    secret:'JKDÑFSJDKSLAJLKDJAÑLKFDLK', //process.env.JWT_SECRET
    secretOrPrivateKey: 'JKDÑFSJDKSLAJLKDJAÑLKFDLK',
    
  })],
  providers: [UserService, UserResolver,JwtService]
})
export class UserModule {}
