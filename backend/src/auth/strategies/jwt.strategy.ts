import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.JWT_SECRET ?? 'fallback_secret',
        });
    }

    async validate(payload: {userId:number; username:string; roomIds: number[]}){
        const user = await this.userService.findById(payload.userId);

        if(!user) throw new UnauthorizedException();

        return user;
    }
}