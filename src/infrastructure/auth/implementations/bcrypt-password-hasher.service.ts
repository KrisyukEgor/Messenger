import { Injectable } from "@nestjs/common";
import { AbstractPasswordHasher } from "src/application/auth/contracts/password-hasher.contract";
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptPasswordHasherService implements AbstractPasswordHasher {
    private readonly salt = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt)
    }

    async compare(plainPassword: any, hashedPassword: any): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}