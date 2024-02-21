import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
    @IsOptional()
    id: string;

    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    city!: string;

    @IsNotEmpty()
    province!: string; 

    constructor(){ super(); this.id= ""}
}

export class UpdateUserDTO extends BaseDTO {
@IsOptional()
username!: string;

@IsOptional()
name!: string;

@IsOptional()
lastName!: string;

@IsOptional()
email!: string;

@IsOptional()
password!: string;

@IsOptional()
city!: string;

@IsOptional()
province!: string; 
}
