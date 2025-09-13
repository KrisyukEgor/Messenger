import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrmEntity } from "src/infrastructure/user/orm-entities/user.orm-entity";
import { AuthController } from "../../../presentation/auth/controllers/auth.controller";
import { AuthService } from "src/application/auth/services/auth.service";
import { RegisterUseCase } from "src/application/auth/use-cases/register.use-case";
import { AbstractUserRepository } from "src/application/user/contracts/user.repository.contract";
import { UserRepository } from "src/infrastructure/user/implementations/user.repository";
import { AbstractPasswordHashService } from "src/application/auth/contracts/password/password-hash.service.contract";
import { BcryptPasswordHashService } from "src/infrastructure/auth/implementations/bcrypt-password-hasher.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoginUseCase } from "src/application/auth/use-cases/login.use-case";
import { CONFIG_TOKENS } from "src/infrastructure/config/config.constants";
import { JwtConfig } from "src/infrastructure/config/jwt.config";
import { AbstractAccessTokenService } from "src/application/auth/contracts/jwt/access-token/access-token.service.contract";
import { AccessTokenService } from "../implementations/jwt/access-token/access-token.service";
import { AbstractRefreshTokenRepository } from "src/application/auth/contracts/jwt/refresh-token/refresh-token.repository.contract";
import { RefreshTokenRepository } from "../implementations/jwt/refresh-token/refresh-token.repository";
import { AbstractRefreshTokenService } from "src/application/auth/contracts/jwt/refresh-token/refresh-token.service.contract";
import { RefreshTokenService } from "../implementations/jwt/refresh-token/refresh-token.service";
import { AbstractJwtPayloadFabric } from "src/application/auth/contracts/jwt/jwt-payload.factory.contract";
import { JwtPayloadFactory } from "../implementations/jwt/jwt-payload.factory";
import { RefreshTokenOrmEntity } from "../orm/orm-entities/refresh-token.orm-entity";
import { UserCreateService } from "src/application/auth/services/user-create.service";
import { TokenGeneratorService } from "src/application/auth/services/token-generator.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOrmEntity, RefreshTokenOrmEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory:(configService: ConfigService) => {
                const config = configService.get<JwtConfig>(CONFIG_TOKENS.JWT)

                return {
                    secret: config?.accessSecret,
                    signOptions: {
                        expiresIn: config?.accessExpiresIn
                    }
                }
            }
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        RegisterUseCase,
        LoginUseCase,
        UserCreateService,
        TokenGeneratorService,
        {
            provide: AbstractUserRepository,
            useClass: UserRepository
        },
        {
            provide: AbstractPasswordHashService,
            useClass: BcryptPasswordHashService
        },
        {
            provide: AbstractAccessTokenService,
            useClass: AccessTokenService
        },
        {
            provide: AbstractRefreshTokenRepository,
            useClass: RefreshTokenRepository
        },
        {
            provide: AbstractRefreshTokenService,
            useClass: RefreshTokenService
        },
        {
            provide: AbstractJwtPayloadFabric,
            useClass: JwtPayloadFactory
        }
    ]
})
export class AuthModule {}