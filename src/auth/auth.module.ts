import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        signOptions: { expiresIn: '60s' },
        secret:'JKDÑFSJDKSLAJLKDJAÑLKFDLK' //process.env.JWT_SECRET
      })],
    providers: [AuthGuard, JwtStrategy],
})
export class AuthModule {

}
