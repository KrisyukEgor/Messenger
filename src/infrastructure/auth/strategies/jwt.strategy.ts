import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from 'src/infrastructure/config/jwt.config';
import { CONFIG_TOKENS } from 'src/infrastructure/config/config.constants';
import { AbstractAccessTokenService } from 'src/application/auth/contracts/jwt/access-token/access-token.service.contract';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly accessTokenService: AbstractAccessTokenService,
        private readonly configService: ConfigService
    ) {
        const jwtAccessSecret = configService.get<JwtConfig>(CONFIG_TOKENS.JWT)?.accessSecret;

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtAccessSecret!
        })
    }

    async validate(payload) {
        if(this.accessTokenService.isValidPayload(payload)) {
            return payload;
        }

        throw new UnauthorizedException('Invalid token structure');
    }
}