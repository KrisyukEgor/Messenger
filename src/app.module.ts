import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/auth/modules/auth.module';
import { EnvConfigModule } from './infrastructure/config/env.config.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    AuthModule,
    EnvConfigModule,
    DatabaseModule
  ],
})
export class AppModule {}
