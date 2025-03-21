import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password: string;
    
}
