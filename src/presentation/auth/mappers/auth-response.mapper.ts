import { User } from "src/domain/user/entities/user.entity";
import { RegisterResponseDTO } from "../dto/response/register.response.dto";

export class AuthResponseMapper {
    static ToCreateUserResponse(user: User): RegisterResponseDTO {
        const dto = new RegisterResponseDTO();

        dto.id = user.getId();
        dto.name = user.getName();
        dto.email = user.getEmail();
        dto.status = user.getStatus().toString();
        dto.createdAt = user.getCreatedAt();
        dto.updatedAt = user.getUpdatedAt();

        return dto;
    }
}