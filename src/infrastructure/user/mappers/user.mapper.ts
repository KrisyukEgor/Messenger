import { User } from 'src/domain/user/entities/user.entity';
import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import { Status } from 'src/domain/user/value-objects/status.value-object';

export class UserMapper {
    static toDomain(ormUser: UserOrmEntity): User {
        return new User({
            id: ormUser.id,
            name: ormUser.name,
            email: ormUser.email,
            password: ormUser.password,
            status: Status.fromValue(ormUser.status)!, 
            createdAt: new Date(ormUser.createdAt),  
            updatedAt: new Date(ormUser.updatedAt), 
        });
    }

    static toOrm(user: User): UserOrmEntity {
        const ormEntity = new UserOrmEntity();

        ormEntity.id = user.getId();
        ormEntity.name = user.getName();
        ormEntity.email = user.getEmail();
        ormEntity.password = user.getPassword();
        ormEntity.status = user.getStatus().toString(); 
        ormEntity.createdAt = new Date(user.getCreatedAt()); 
        ormEntity.updatedAt = new Date(user.getUpdatedAt()); 

        return ormEntity;
    }
}