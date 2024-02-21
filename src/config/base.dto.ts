import { IsOptional, IsUUID } from "class-validator";

  export  class BaseDTO {
    @IsUUID()
    @IsOptional()
    id!: string;
  
    @IsOptional()
    createdAt!: Date;
  
    @IsOptional()
    updatedAt!: Date;
  }
  