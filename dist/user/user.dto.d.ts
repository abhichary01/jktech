export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    VIEWER = "viewer"
}
export declare class CreateUserDto {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
