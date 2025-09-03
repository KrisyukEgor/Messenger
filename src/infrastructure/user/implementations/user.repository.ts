import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractUserRepository } from "src/application/user/contracts/user.repository.contract";
import { User } from "src/domain/user/entities/user.entity";
import { Repository } from "typeorm";
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements AbstractUserRepository {

    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepository: Repository<UserOrmEntity>
    ){}
    async save(user: User): Promise<User> {
        const ormUser = UserMapper.toOrm(user);
        const savedUser = await this.userRepository.save(ormUser);
        return UserMapper.toDomain(savedUser);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const ormUser = await this.userRepository.findOne({
            where: {
                email: email
            }
        })

        return this.toDomain(ormUser);
    }

    private toDomain(ormUser: UserOrmEntity | null) {
        return ormUser !== null ? UserMapper.toDomain(ormUser) : null;
    }
}