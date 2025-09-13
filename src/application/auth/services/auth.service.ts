
import { Injectable } from "@nestjs/common";
import { RegisterRequestDTO } from "src/presentation/auth/dto/request/register.request.dto";
import { RegisterUseCase } from "../use-cases/register.use-case";
import { AuthResponse } from "../dto/auth-response.interface";
import { LoginRequestDTO } from "src/presentation/auth/dto/request/login.request.dto";
import { LoginUseCase } from "../use-cases/login.use-case";

@Injectable()
export class AuthService {
    constructor(
        private readonly createUserUC: RegisterUseCase,
        private readonly loginUC: LoginUseCase
    ){}

    async register(dto: RegisterRequestDTO): Promise<AuthResponse> {
        return await this.createUserUC.execute({
            name: dto.name,
            email: dto.email,
            password: dto.password,
        });
    }

    async login(dto: LoginRequestDTO): Promise<AuthResponse> {
        return await this.loginUC.execute({
            email: dto.email,
            password: dto.password
        })
    }
}