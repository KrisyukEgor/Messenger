import { User } from "src/domain/user/entities/user.entity";
import { RefreshTokenPayload } from "./refresh-token-payload.contract";

export abstract class AbstractRefreshTokenService {
    abstract generateRefreshToken(payload: RefreshTokenPayload): Promise<string>;
    abstract validate(token: string): Promise<RefreshTokenPayload>;
    abstract revoke(token: string): Promise<void>;
    abstract revokeAllUserTokens(userId: string): Promise<void>;
    abstract rotate(oldToken: string): Promise<string>;
}