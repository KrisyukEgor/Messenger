import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user/entities/user.entity";
import { AbstractRefreshTokenService } from "../contracts/jwt/refresh-token/refresh-token.service.contract";
import { AbstractAccessTokenService } from "../contracts/jwt/access-token/access-token.service.contract";
import { AbstractJwtPayloadFabric } from "../contracts/jwt/jwt-payload.factory.contract";


@Injectable()
export class TokenGeneratorService {

    constructor(
        private readonly accessTokenService: AbstractAccessTokenService,
        private readonly refreshTokenService: AbstractRefreshTokenService,
        private readonly jwtPayloadFabric: AbstractJwtPayloadFabric
    ) {}

    async generateTokens(user: User): Promise<{accessToken: string, refreshToken: string}> {
        const accessTokenPayload = await this.jwtPayloadFabric.createAccessTokenPayload(user);
        const refreshTokenPayload = await this.jwtPayloadFabric.createRefreshTokenPayload(user);

        const accessToken = await this.accessTokenService.generateAccessToken(accessTokenPayload);
        const refreshToken = await this.refreshTokenService.generateRefreshToken(refreshTokenPayload);

        return {
            accessToken,
            refreshToken
        }
    }
}