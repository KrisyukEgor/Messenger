import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/auth/modules/auth.module';
import { EnvConfigModule } from './infrastructure/config/env.config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './infrastructure/config/jwt.config';

@Module({
  imports: [
    AuthModule,
    EnvConfigModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [jwtConfig]
    })
  ],
})
export class AppModule {}
