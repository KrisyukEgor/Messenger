import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterRequestDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;
}