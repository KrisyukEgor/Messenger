import { Injectable } from "@nestjs/common";
import { AbstractPasswordHashService } from "../contracts/password/password-hash.service.contract";
import { RegisterParams } from "../use-cases/register.use-case";
import {v4 as uuid} from 'uuid'
import { Status } from "src/domain/user/value-objects/status.value-object";
import { User } from "src/domain/user/entities/user.entity";

@Injectable()
export class UserCreateService {

    constructor(
        private readonly passwordHashService: AbstractPasswordHashService
    ) {}

    async createUser(params: RegisterParams): Promise<User> {
        const hashedPassword = await this.passwordHashService.hash(params.password);

        const user = new User({
            id: uuid(),
            name: params.name,
            email: params.email,
            password: hashedPassword,
            status: Status.offline(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return user;
    }
}