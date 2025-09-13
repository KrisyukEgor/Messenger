import { RefreshTokenEntity } from "src/domain/auth/entities/refresh-token.entity";
import { RefreshTokenOrmEntity } from "../orm-entities/refresh-token.orm-entity";

export class RefreshTokenMapper {
    static toDomain(ormEntity: RefreshTokenOrmEntity): RefreshTokenEntity {
        const domainEntity = new RefreshTokenEntity ({
            id: ormEntity.id,
            token: ormEntity.token,
            userId: ormEntity.userId,
            expiresAt: ormEntity.expiresAt,
            createdAt: ormEntity.createdAt,
            isRevoked: ormEntity.isRevoked,
            revokedAt: ormEntity.revokedAt
        });

        return domainEntity;
    }

    static ToOrm(domainEntity: RefreshTokenEntity): RefreshTokenOrmEntity {
        const ormEntity = new RefreshTokenOrmEntity();

        ormEntity.id = domainEntity.id;
        ormEntity.token = domainEntity.token;
        ormEntity.userId = domainEntity.userId;
        ormEntity.expiresAt = domainEntity.expiresAt;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.isRevoked = domainEntity.isRevoked;
        ormEntity.revokedAt = domainEntity.revokedAt;

        return ormEntity;
    }
}