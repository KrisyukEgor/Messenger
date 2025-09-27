import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { randomBytes } from "crypto";
import { RefreshTokenPayload } from "src/application/auth/contracts/jwt/refresh-token/refresh-token-payload.contract";
import { AbstractRefreshTokenService } from "src/application/auth/contracts/jwt/refresh-token/refresh-token.service.contract";
import { RefreshTokenEntity } from "src/domain/auth/entities/refresh-token.entity";
import { v4 } from "uuid";
import { AbstractRefreshTokenRepository } from "src/application/auth/contracts/jwt/refresh-token/refresh-token.repository.contract";
import { JwtConfig } from 'src/infrastructure/config/jwt.config';
import { CONFIG_TOKENS } from 'src/infrastructure/config/config.constants';
import { AbstractJwtPayloadFabric } from 'src/application/auth/contracts/jwt/jwt-payload.factory.contract';


@Injectable()
export class RefreshTokenService implements AbstractRefreshTokenService {

   constructor (
      private readonly refreshTokenRepository: AbstractRefreshTokenRepository,
      private readonly jwtPayloadFabric: AbstractJwtPayloadFabric,
      private readonly configService: ConfigService
   ) {}

   async generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
      
      try {
         const token = await this.generateUniqueToken();

         const expiresAt = new Date();
         const jwtConfig = this.configService.get<JwtConfig>(CONFIG_TOKENS.JWT);

         const refreshTokenExpiresInDays  = jwtConfig?.refreshExpiresInDays!;

         expiresAt.setDate(expiresAt.getDate() + refreshTokenExpiresInDays);

         const refreshToken = new RefreshTokenEntity({
            id: v4(),
            token: token,
            userId: payload.sub,
            expiresAt: expiresAt, 
            createdAt: new Date(),
            isRevoked: false
         });

         const savedToken = await this.refreshTokenRepository.save(refreshToken);

         return savedToken.token;
      }

      catch(error) {
         console.log("Refresh token service error", error);
         throw new InternalServerErrorException("Can't generate refresh token");
      }
   }
   async validate(token: string): Promise<RefreshTokenPayload> {
      let refreshToken = await this.refreshTokenRepository.findToken(token);

      refreshToken = this.validateToken(refreshToken);

      return this.jwtPayloadFabric.createPayloadFromRefreshToken(refreshToken);
   }
   
   async revoke(token: string): Promise<void> {
      try {
         const refreshToken = await this.refreshTokenRepository.findToken(token);

         if(refreshToken && !refreshToken.isRevoked) {
            refreshToken.revoke();
   
            await this.refreshTokenRepository.save(refreshToken);
         }
         else {
            console.log(refreshToken);
            throw new Error('Can not find refreshToken');
         }
      }
      catch(error) {
         console.log('Refresh token revoke failed', error);
         throw new InternalServerErrorException("Failed to revoke refresh token");
      }
   }

   async revokeAllUserTokens(userId: string): Promise<void> {
      try {
         const userRefreshTokens = await this.refreshTokenRepository.findAllUserTokens(userId);

         const activeTokens = userRefreshTokens.filter(token => !token.isExpired() && !token.isRevoked);

         await Promise.all(
            activeTokens.map(entity => this.revoke(entity.token))
         )
      }
      catch(error) {
         
      }
   }

   async rotate(oldToken: string): Promise<string> {
      try {
         let refreshToken = await this.refreshTokenRepository.findToken(oldToken);

         refreshToken = this.validateToken(refreshToken);

         await this.revoke(refreshToken.token);

         const payload = this.jwtPayloadFabric.createPayloadFromRefreshToken(refreshToken);

         const newToken = await this.generateRefreshToken(payload);
         return newToken;
      }
      catch(error) {
         console.log("Can't rotate token", error);
         throw new InternalServerErrorException("Failed to rotate refresh token");
      }
   }

   private async generateUniqueToken(): Promise<string> {
      let token = "";
      let existingToken: RefreshTokenEntity | null;

      do {
         token = randomBytes(40).toString('hex');
         existingToken = await this.refreshTokenRepository.findToken(token);
      }
      while(existingToken);

      return token;
   }

   private validateToken(refreshToken: RefreshTokenEntity | null): RefreshTokenEntity {
      if(!refreshToken) {
         throw new UnauthorizedException("Invalid refresh token");
      }

      if(refreshToken.isRevoked) {
         throw new UnauthorizedException("Refresh token already revoked");
      }

      if(refreshToken.isExpired()) {
         throw new UnauthorizedException("Refresh token already expired");
      }

      return refreshToken;
   }
}