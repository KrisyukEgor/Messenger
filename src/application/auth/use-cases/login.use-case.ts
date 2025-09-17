import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AbstractUserRepository } from "src/application/user/contracts/user.repository.contract";
import { AuthResponse } from "../dto/auth-response.interface";
import { AbstractPasswordHashService } from "../contracts/password/password-hash.service.contract";
import { TokenGeneratorService } from "../services/token-generator.service";
import { AbstractRefreshTokenService } from "../contracts/jwt/refresh-token/refresh-token.service.contract";

export interface LoginParams {
    email: string;
    password: string;
}

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: AbstractUserRepository,
        private readonly passwordHashService: AbstractPasswordHashService,
        private readonly tokenGeneratorService: TokenGeneratorService,
        private readonly refreshTokenService: AbstractRefreshTokenService
    ) {}

    async execute(params: LoginParams): Promise<AuthResponse> {
        const existingUser = await this.userRepository.findUserByEmail(params.email);

        if(!existingUser) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isValidPassword = await this.passwordHashService.compare(
            params.password, existingUser.getPassword()
        )

        if(!isValidPassword) {
            throw new UnauthorizedException('Invalid email or password')
        }

        await this.refreshTokenService.revokeAllUserTokens(existingUser.getId());
        
        const {accessToken, refreshToken} = await this.tokenGeneratorService.generateTokens(existingUser);

        return {
            accessToken,
            refreshToken,
            user: {
                id: existingUser.getId(),
                name: existingUser.getName(),
                email: existingUser.getEmail()
            }
        }
    }
}