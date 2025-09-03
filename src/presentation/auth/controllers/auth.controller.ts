import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterRequestDTO } from "../dto/request/register.request.dto";
import { RegisterResponseDTO } from "../dto/response/register.response.dto";
import { AuthService } from "src/application/auth/services/auth.service";
import { AuthResponseMapper } from "src/presentation/auth/mappers/auth-response.mapper";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: AuthService
    ){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() dto: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        const user = await this.userService.register(dto);
        return AuthResponseMapper.ToCreateUserResponse(user);
    }
}