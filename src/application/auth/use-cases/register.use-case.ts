import { BadRequestException, Injectable } from "@nestjs/common";
import { AbstractUserRepository } from "../../user/contracts/user.repository.contract";
import { AuthResponse } from "../dto/auth-response.interface";
import { TokenGeneratorService } from "../services/token-generator.service";
import { UserCreateService } from "../services/user-create.service";

export interface RegisterParams {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly userRepository: AbstractUserRepository,
        private readonly tokenGeneratorService: TokenGeneratorService,
        private readonly userCreateService: UserCreateService
    ){}

    async execute(params: RegisterParams): Promise<AuthResponse> {
        const existingUser = await this.userRepository.findUserByEmail(params.email);

        if(existingUser) {
            throw new BadRequestException(`user with this email ${params.email} already exists`);
        }

        const user = await this.userCreateService.createUser(params);

        const savedUser = await this.userRepository.save(user);

        const {accessToken, refreshToken} = await this.tokenGeneratorService.generateTokens(savedUser);

        return {
            accessToken,
            refreshToken,
            user: {
                id: savedUser.getId(),
                name: savedUser.getName(),
                email: savedUser.getEmail()
            }
        }
    }
}