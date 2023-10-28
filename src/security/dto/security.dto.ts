import { IsEmail, IsNotEmpty, IsString, IsEnum } from "class-validator"

export enum authRoles {
    DOCTOR = 'DOCTOR',
    CONSULTANT = 'CONSULTANT',
};

export class LoginRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class SignupRequest {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(authRoles, {message: "role is required"})
    role: string
}