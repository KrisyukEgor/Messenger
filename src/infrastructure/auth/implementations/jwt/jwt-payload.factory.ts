import { AccessTokenPayload } from "src/application/auth/contracts/jwt/access-token/access-token-payload.contract";
import { AbstractJwtPayloadFabric } from "src/application/auth/contracts/jwt/jwt-payload.factory.contract";
import { RefreshTokenPayload } from "src/application/auth/contracts/jwt/refresh-token/refresh-token-payload.contract";
import { RefreshTokenEntity } from "src/domain/auth/entities/refresh-token.entity";
import { User } from "src/domain/user/entities/user.entity";

export class JwtPayloadFactory implements AbstractJwtPayloadFabric {

    createAccessTokenPayload(user: User): AccessTokenPayload {
        const payload = {
            sub: user.getId(),
            name: user.getName(),
            email: user.getEmail()
        }
        return payload;
    }
    createRefreshTokenPayload(user: User): RefreshTokenPayload {
        const payload = {
            sub: user.getId()
        }
        return payload;
    }

    createPayloadFromRefreshToken(token: RefreshTokenEntity): RefreshTokenPayload {
        const payload = {
            sub: token.userId
        }
        return payload;
    }
}