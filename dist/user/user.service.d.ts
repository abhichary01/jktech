import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
export declare class UserService {
    private tableName;
    private dynamoDBClient;
    createUser(createUserDto: CreateUserDto): Promise<Partial<User>>;
    findUserByEmail(email: string): Promise<Partial<User> | null>;
    updateUserRole(id: string, newRole: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
}
