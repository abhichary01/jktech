import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.userService.createUser(newUser); // Use UserService to create user
  }

  async login(email: string, password: string): Promise<any> {
    const userDetails = await this.userService.findUserByEmail(email);
    if (!userDetails) {
      throw new UnauthorizedException(
        'Invalid email or password from user search.',
      );
    }

    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const accessToken = sign(userDetails, process.env.JWT_SECRET);

    return {
      access_token: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async logout(): Promise<string> {
    return 'jwt token destroyed';
  }
}
