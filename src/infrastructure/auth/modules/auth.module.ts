import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrmEntity } from "src/infrastructure/user/orm-entities/user.orm-entity";
import { AuthController } from "../../../presentation/auth/controllers/auth.controller";
import { AuthService } from "src/application/auth/services/auth.service";
import { RegisterUseCase } from "src/application/auth/use-cases/register.use-case";
import { AbstractUserRepository } from "src/application/user/contracts/user.repository.contract";
import { UserRepository } from "src/infrastructure/user/implementations/user.repository";
import { AbstractPasswordHasher as AbstractPasswordHashService } from "src/application/auth/contracts/password-hasher.contract";
import { BcryptPasswordHasherService as BcryptPasswordHashService } from "src/infrastructure/auth/implementations/bcrypt-password-hasher.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserOrmEntity])
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        RegisterUseCase,
        {
            provide: AbstractUserRepository,
            useClass: UserRepository
        },
        {
            provide: AbstractPasswordHashService,
            useClass: BcryptPasswordHashService
        }
    ]
})
export class AuthModule {}