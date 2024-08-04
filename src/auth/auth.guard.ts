import { CanActivate, Injectable,ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly userService: UserService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        const args = ctx.getArgs().loginUserInput;
        // const {email, password} = ctx.req.body.variables;
        // console.log(ctx.req.body)
        const {email, password} = args
        const user: User = await this.userService.findByEmail(email);
        console.log(user)
        if(user && user.password === password){
            return true;
        } else{
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }


}