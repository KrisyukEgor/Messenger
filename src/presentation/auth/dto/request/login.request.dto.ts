import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginRequestDTO {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;
}