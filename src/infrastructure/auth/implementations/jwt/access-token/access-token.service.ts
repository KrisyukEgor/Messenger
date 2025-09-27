    import { AbstractAccessTokenService } from "src/application/auth/contracts/jwt/access-token/access-token.service.contract";
    import { JwtService as NestJwtService } from "@nestjs/jwt";
    import { Injectable, UnauthorizedException } from "@nestjs/common";
    import { AccessTokenPayload } from "src/application/auth/contracts/jwt/access-token/access-token-payload.contract";
    import { ConfigService } from "@nestjs/config";

    @Injectable()
    export class AccessTokenService implements AbstractAccessTokenService {

        constructor(
            private readonly nestJwtService: NestJwtService,
            private readonly configService: ConfigService
        ) {}

        async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
            const token = await this.nestJwtService.signAsync(payload);
                    
            return token;
        }

        async verifyAccessToken(token: string): Promise<AccessTokenPayload> {

            try {
                const payload = await this.nestJwtService.verifyAsync(token)

                if(!this.isValidPayload(payload)) {
                    throw new UnauthorizedException('Invalid token payload');
                }

                return payload;
            }
            catch (error) {
                throw new UnauthorizedException("Invalid access token");
            }
        }

        decodeAccessToken(token: string): AccessTokenPayload {
            try {
                const payload = this.nestJwtService.decode<AccessTokenPayload>(token)

                if(!this.isValidPayload) {
                    throw new UnauthorizedException('Invalid token payload');
                }
                return payload;
            }

            catch(error) {
                throw new UnauthorizedException('Invalid token format');
            }
        }

        isValidPayload(payload: any): payload is AccessTokenPayload {
            return (
                typeof payload === "object" &&
                payload !== null && 
                typeof payload.sub === "string" &&
                typeof payload.name === "string" &&
                typeof payload.email === "string"
            );
        }
    }