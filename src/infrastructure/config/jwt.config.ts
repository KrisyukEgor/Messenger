import { registerAs } from "@nestjs/config";
import { CONFIG_TOKENS } from "./config.constants";

export interface JwtConfig {
    accessSecret: string;
    accessExpiresIn: string;
    refreshExpiresInDays: number;
}

export default registerAs(CONFIG_TOKENS.JWT, (): JwtConfig => ({
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresInDays: parseInt(process.env.JWT_REFRESH_EXPIRES_IN_DAYS ?? "7")
}))