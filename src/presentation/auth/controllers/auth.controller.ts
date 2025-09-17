import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterRequestDTO } from "../dto/request/register.request.dto";
import { AuthResponseDTO } from "../dto/response/auth.response.dto";
import { AuthService } from "src/application/auth/services/auth.service";
import { AuthResponseMapper } from "src/presentation/auth/mappers/auth-response.mapper";
import { LoginRequestDTO } from "../dto/request/login.request.dto";
import { Public } from "src/infrastructure/auth/decorators/public.decorator";
import { RefreshTokenDTO } from "../dto/request/refresh-token.dto";
import { JwtAuth } from "src/infrastructure/auth/decorators/jwt-auth.decorator";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @Public()
    async registerUser(@Body() dto: RegisterRequestDTO): Promise<AuthResponseDTO> {
        const serviceResponse = await this.authService.register(dto);
        return AuthResponseMapper.ToAuthResponseDTO(serviceResponse);
    }
    
    @Post('login')
    @JwtAuth()
    async login(@Body() dto: LoginRequestDTO): Promise<AuthResponseDTO> {
        const serviceResponse = await this.authService.login(dto);
        return AuthResponseMapper.ToAuthResponseDTO(serviceResponse);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @Public()
    async refreshToken(@Body() dto: RefreshTokenDTO): Promise<AuthResponseDTO> {
        const serviceResponse = await this.authService.refreshToken(dto);
        return AuthResponseMapper.ToAuthResponseDTO(serviceResponse);
    }

}