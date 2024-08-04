import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'JKDÑFSJDKSLAJLKDJAÑLKFDLK',
        })
    }

    async validate(payload: any){ //payload = decoded JWT
        console.log(payload)
        return {userId: payload.sub, username: payload.username}
    }
}