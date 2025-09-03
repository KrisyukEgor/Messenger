import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule} from "@nestjs/typeorm";
import { join } from "path";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                logging: configService.get<boolean>('DB_LOGGING'),
                synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
                entities: [
                    join(__dirname, '..', '**', '*.orm-entity.{ts,js}')
                ]
            }),
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class DatabaseModule {}