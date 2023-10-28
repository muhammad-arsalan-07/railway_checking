import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class DoctorRequest {
    @IsString()
    @IsNotEmpty()
    profile: string
  
    @IsString()
    @IsNotEmpty()
    category: string
  
    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    start: string

    @IsString()
    @IsNotEmpty()
    end: string
}