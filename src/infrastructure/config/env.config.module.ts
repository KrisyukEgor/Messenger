import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule as NestConfigModule } from "@nestjs/config";


@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
    ],
})
export class EnvConfigModule {}