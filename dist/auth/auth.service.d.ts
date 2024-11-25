import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(email: string, password: string): Promise<any>;
    validateUser(email: string, password: string): Promise<Partial<User>>;
    logout(): Promise<string>;
}
