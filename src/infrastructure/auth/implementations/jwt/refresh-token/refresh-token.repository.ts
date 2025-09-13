import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRefreshTokenRepository } from "src/application/auth/contracts/jwt/refresh-token/refresh-token.repository.contract";
import { RefreshTokenEntity } from "src/domain/auth/entities/refresh-token.entity";
import { RefreshTokenMapper } from "src/infrastructure/auth/orm/mappers/refresh-token.mapper";
import { RefreshTokenOrmEntity } from "src/infrastructure/auth/orm/orm-entities/refresh-token.orm-entity";
import { LessThan, Repository } from "typeorm";

export class RefreshTokenRepository implements AbstractRefreshTokenRepository {

    constructor(
        @InjectRepository(RefreshTokenOrmEntity)
        private readonly refreshTokenRepository: Repository<RefreshTokenOrmEntity>
    ) {}

    async save(token: RefreshTokenEntity): Promise<RefreshTokenEntity> {
        const refreshTokenOrmEntity = RefreshTokenMapper.ToOrm(token);
        const savedRefreshToken = await this.refreshTokenRepository.save(refreshTokenOrmEntity);

        return RefreshTokenMapper.toDomain(savedRefreshToken);
    }

    async findToken(token: string): Promise<RefreshTokenEntity | null> {
        const refreshToken = await this.refreshTokenRepository.findOne({
            where:  {
                token: token
            }
        })

        return this.toDomain(refreshToken);
    }

    async findExpired(): Promise<RefreshTokenEntity[]> {
        const ormEntities = await this.refreshTokenRepository.find({
            where: {
                expiresAt: LessThan(new Date())
            }
        })

        return ormEntities.map(entity => RefreshTokenMapper.toDomain(entity));
    }


    async deleteTokens(entities: RefreshTokenEntity[]): Promise<void> {
        const ids = entities.map(entity => entity.id);

        await this.refreshTokenRepository.delete(ids);
    }

    private toDomain(refreshTokenOrmEntity: RefreshTokenOrmEntity | null) {
        return refreshTokenOrmEntity !== null ? RefreshTokenMapper.toDomain(refreshTokenOrmEntity) : null; 
    }
}