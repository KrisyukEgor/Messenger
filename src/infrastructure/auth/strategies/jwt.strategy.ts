import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from 'src/infrastructure/config/jwt.config';
import { CONFIG_TOKENS } from 'src/infrastructure/config/config.constants';
import { AbstractAccessTokenService } from 'src/application/auth/contracts/jwt/access-token/access-token.service.contract';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly accessTokenService: AbstractAccessTokenService,
        private readonly configService: ConfigService
    ) {
        const jwtConfig = configService.get<JwtConfig>(CONFIG_TOKENS.JWT);
  
        if (!jwtConfig?.accessSecret) {
            throw new Error('JWT access secret is not configured! Check your .env file');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConfig.accessSecret, 
        });
    }

    async validate(payload) {

        if(this.accessTokenService.isValidPayload(payload)) {
            return payload;
        }

        throw new UnauthorizedException('Invalid token structure');
    }
}