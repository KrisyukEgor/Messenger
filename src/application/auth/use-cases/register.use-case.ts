import { BadRequestException, Injectable } from "@nestjs/common";
import { AbstractUserRepository } from "../../user/contracts/user.repository.contract";
import { User } from "src/domain/user/entities/user.entity";
import { RegisterRequestDTO } from "src/presentation/auth/dto/request/register.request.dto";
import { AbstractPasswordHasher } from "../contracts/password-hasher.contract";
import { v4 as uuid } from "uuid";
import { Status } from "src/domain/user/value-objects/status.value-object";

@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly userRepository: AbstractUserRepository,
        private readonly passwordHasher: AbstractPasswordHasher
    ) {}

    async execute(dto: RegisterRequestDTO): Promise<User> {
        const existingUser = await this.userRepository.findUserByEmail(dto.email);

        if(existingUser) {
            throw new BadRequestException(`user with this email ${dto.email} already exists`);
        }

        const hashedPassword = await this.passwordHasher.hash(dto.password);

        const user = new User({
            id: uuid(),
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            status: Status.offline(),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.userRepository.save(user);
    }
}