import { User } from "src/domain/user/entities/user.entity";
import { RegisterRequestDTO } from "src/presentation/auth/dto/request/register.request.dto";

export abstract class AbstractUserRepository {
    abstract save(user: User): Promise<User>
    abstract findUserByEmail(email: string): Promise<User | null>
}