import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AbstractRefreshTokenRepository } from '../contracts/jwt/refresh-token/refresh-token.repository.contract';
import { TokenGeneratorService } from "../services/token-generator.service";
import { AbstractUserRepository } from "src/application/user/contracts/user.repository.contract";
import { AbstractRefreshTokenService } from "../contracts/jwt/refresh-token/refresh-token.service.contract";
import { AuthResponse } from "../dto/auth-response.interface";

export interface RefreshTokenParams {
    token: string;
}

@Injectable()
export class RefreshTokenUseCase {

    constructor(
        private readonly refreshTokenService: AbstractRefreshTokenService,
        private readonly refreshTokenRepository: AbstractRefreshTokenRepository,
        private readonly tokenService: TokenGeneratorService,
        private readonly userRepository: AbstractUserRepository

    ) {}

    async execute(params: RefreshTokenParams): Promise<AuthResponse> {
        try {
           
            const isValid = await this.refreshTokenService.validate(params.token);

            if(!isValid) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const refreshTokenEntity = await this.refreshTokenRepository.findToken(params.token);

            if(!refreshTokenEntity) {
                throw new UnauthorizedException('Can\'t find refresh token');
            }

            if(refreshTokenEntity.isRevoked) {
                throw new UnauthorizedException('Refresh token has been revoked');
            }

            if(refreshTokenEntity.isExpired()) {
                await this.refreshTokenService.revoke(params.token);
                throw new UnauthorizedException('Refresh token is expired');
            }

            const user = await this.userRepository.findUserById(refreshTokenEntity.userId);

            if (!user) {
                await this.refreshTokenService.revoke(params.token);
                throw new UnauthorizedException('User not found');
            }

            await this.refreshTokenService.revoke(params.token);

            const {accessToken, refreshToken} = await this.tokenService.generateTokens(user);

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail()
                }
            }
        }
        catch(error) {
            if(error instanceof UnauthorizedException) {
                throw error;
            }

            throw new UnauthorizedException('Failed to refresh token');
        }
    }
}