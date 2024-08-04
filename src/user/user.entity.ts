import { Field, ObjectType } from "@nestjs/graphql";
import { isNullableType } from "graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class User {

@PrimaryGeneratedColumn()
@Field(() => Number)
id: number

@Column()
@Field(() => String)
firstName: string

@Column()
@Field(() => String)
lastName: string

@Column()
@Field(() => String)
email: string

@Column()
@Field(() => String)
password: string

@Column()
@Field(() => String)
role: string
}