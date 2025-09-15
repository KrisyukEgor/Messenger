import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterRequestDTO } from "../dto/request/register.request.dto";
import { AuthResponseDTO } from "../dto/response/auth.response.dto";
import { AuthService } from "src/application/auth/services/auth.service";
import { AuthResponseMapper } from "src/presentation/auth/mappers/auth-response.mapper";
import { LoginRequestDTO } from "../dto/request/login.request.dto";
import { Public } from "src/infrastructure/auth/decorators/public.decorator";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: AuthService
    ){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @Public()
    async registerUser(@Body() dto: RegisterRequestDTO): Promise<AuthResponseDTO> {
        const serviceResponse = await this.userService.register(dto);
        return AuthResponseMapper.ToAuthResponseDTO(serviceResponse);
    }
    
    @Post('login')
    @Public()
    async login(@Body() dto: LoginRequestDTO): Promise<AuthResponseDTO> {
        const serviceResponse = await this.userService.login(dto);
        return AuthResponseMapper.ToAuthResponseDTO(serviceResponse);
    }

}