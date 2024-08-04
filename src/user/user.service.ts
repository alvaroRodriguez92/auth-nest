import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { LoginOutput } from './dto/login.output';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService){}

    async findByEmail(email:string): Promise<User>{
        const user = await this.userRepository.findOne({where:{email}});
        return user
    }

    async findAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find()
        return users
    }

    async createUser(createUserInput:CreateUserInput): Promise<User>{
        const newUser = this.userRepository.create(createUserInput);
        return await this.userRepository.save(newUser)
    }

    async login(loginUserInput:LoginUserInput): Promise<LoginOutput>{
        const user = await this.findByEmail(loginUserInput.email);
        const bearerToken = this.jwtService.sign({username: user.firstName, sub: user.id}, {
            secret: 'test',
            expiresIn: '60s'
          })
        console.log(bearerToken)
        return {user: user, access_token: bearerToken}
    }
}
