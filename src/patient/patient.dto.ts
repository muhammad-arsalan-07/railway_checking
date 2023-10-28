import { IsNotEmpty, IsString, IsMongoId } from "class-validator"


export class ApplyappointmentRequest {
    @IsNotEmpty()
    @IsString()
    message: string

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    doctorid: string
}