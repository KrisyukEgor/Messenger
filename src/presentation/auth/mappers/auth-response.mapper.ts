import { User } from "src/domain/user/entities/user.entity";
import { AuthResponseDTO } from "../dto/response/auth.response.dto";
import { AuthResponse } from "src/application/auth/dto/auth-response.interface";

export class AuthResponseMapper {
    static ToAuthResponseDTO(response: AuthResponse): AuthResponseDTO {

        const {accessToken, user, refreshToken, ...rest} = response;

        const dto = new AuthResponseDTO();

        dto.accessToken = accessToken;
        dto.refreshToken = refreshToken;
        dto.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return dto;
    }

 }

