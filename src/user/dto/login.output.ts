import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../user.entity";

@ObjectType()
export class LoginOutput{

    @Field(() => User)
    user: User

    @Field(() => String)
    access_token: string
}