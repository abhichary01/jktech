"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_service_1 = require("../user/user.service");
const common_2 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async register(createUserDto) {
        const existingUser = await this.userService.findUserByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_2.UnauthorizedException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = {
            ...createUserDto,
            password: hashedPassword,
        };
        return await this.userService.createUser(newUser);
    }
    async login(email, password) {
        const userDetails = await this.userService.findUserByEmail(email);
        if (!userDetails) {
            throw new common_2.UnauthorizedException('Invalid email or password from user search.');
        }
        const isMatch = await bcrypt.compare(password, userDetails.password);
        if (!isMatch) {
            throw new common_2.UnauthorizedException('Invalid email or password.');
        }
        const accessToken = (0, jsonwebtoken_1.sign)(userDetails, process.env.JWT_SECRET);
        return {
            access_token: accessToken,
        };
    }
    async validateUser(email, password) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_2.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_2.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async logout() {
        return 'jwt token destroyed';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map