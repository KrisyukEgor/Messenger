import { User } from "src/domain/user/entities/user.entity";

export abstract class AbstractUserRepository {
    abstract save(user: User): Promise<User>
    abstract findUserByEmail(email: string): Promise<User | null>
    abstract findUserById(id: string): Promise<User | null>
}