import { AccessTokenPayload } from "./access-token-payload.contract";

export abstract class AbstractAccessTokenService {
    abstract generateAccessToken(payload: AccessTokenPayload): Promise<string>;
    abstract verifyAccessToken(token: string): Promise<AccessTokenPayload>;
    abstract decodeAccessToken(token: string): AccessTokenPayload;
}