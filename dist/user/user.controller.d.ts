import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<Partial<import("./user.entity").User>>;
    updateRole(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    deleteRole(createUserDto: CreateUserDto): Promise<void>;
    getUsers(): Promise<import("./user.entity").User[]>;
}
