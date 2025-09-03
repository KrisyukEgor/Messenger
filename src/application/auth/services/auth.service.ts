
import { Injectable } from "@nestjs/common";
import { RegisterRequestDTO } from "src/presentation/auth/dto/request/register.request.dto";
import { RegisterUseCase } from "../use-cases/register.use-case";
import { User } from "src/domain/user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly createUserUC: RegisterUseCase,
    ){}
    async register(dto: RegisterRequestDTO): Promise<User> {
        return await this.createUserUC.execute(dto);
    }
}