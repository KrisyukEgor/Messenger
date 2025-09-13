import { User } from "src/domain/user/entities/user.entity";
import { AccessTokenPayload } from "./access-token/access-token-payload.contract";
import { RefreshTokenPayload } from "./refresh-token/refresh-token-payload.contract";
import { RefreshTokenEntity } from "src/domain/auth/entities/refresh-token.entity";

export abstract class AbstractJwtPayloadFabric {
    abstract createAccessTokenPayload(user: User): AccessTokenPayload;
    abstract createRefreshTokenPayload(user: User): RefreshTokenPayload;
    abstract createPayloadFromRefreshToken(token: RefreshTokenEntity): RefreshTokenPayload;
}