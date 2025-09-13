import { Injectable } from "@nestjs/common";
import { AbstractPasswordHashService } from "src/application/auth/contracts/password/password-hash.service.contract";
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptPasswordHashService implements AbstractPasswordHashService {
    private readonly salt = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt)
    }

    async compare(plainPassword: any, hashedPassword: any): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}