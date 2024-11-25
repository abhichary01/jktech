import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { LoginDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    logout(): Promise<string>;
}
