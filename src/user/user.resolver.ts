import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { LoginOutput } from './dto/login.output';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
export class UserResolver {
    constructor(@Inject() private readonly userService: UserService) {}

    @Query(() => User,{nullable:true})
    async findByEmail(@Args('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Query(() => [User])
    @UseGuards(JwtAuthGuard)
    async findAllUsers() {
        return this.userService.findAllUsers();
    }
    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
        
    }

    @Query(() => LoginOutput)
    @UseGuards(AuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginOutput>{
        return this.userService.login(loginUserInput);
    }
}
