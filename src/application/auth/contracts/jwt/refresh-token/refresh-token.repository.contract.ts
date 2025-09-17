import { RefreshTokenEntity } from "src/domain/auth/entities/refresh-token.entity";

export abstract class AbstractRefreshTokenRepository {
    abstract save(token: RefreshTokenEntity): Promise<RefreshTokenEntity>;
    abstract findToken(token: string): Promise<RefreshTokenEntity | null>;
    abstract findExpired(): Promise<RefreshTokenEntity[]>;
    abstract findAllUserTokens(userId: string): Promise<RefreshTokenEntity[]>;
    abstract deleteTokens(tokens: RefreshTokenEntity[]): Promise<void>;
}