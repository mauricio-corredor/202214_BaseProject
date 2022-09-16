/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Url } from "url";

export class AerolineaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
    
    @IsString()
    @IsNotEmpty()
    readonly fechaFundada: string;

    @IsUrl()
    @IsNotEmpty()
    readonly paginaWeb: Url;
    
}
