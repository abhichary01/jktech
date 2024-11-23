import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './user.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.authguard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Trigger the ingestion process' })
  @ApiResponse({
    status: 200,
    description: 'Ingestion started',
    type: CreateUserDto,
  })
  @ApiBearerAuth() // Requires Bearer token for this endpoint
  @Put('change-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateRole(@Body() createUserDto: CreateUserDto) {
    return this.userService.updateUserRole(
      createUserDto.id,
      createUserDto.role,
    );
  }

  @Delete('delete-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteRole(@Body() createUserDto: CreateUserDto) {
    return this.userService.deleteUser(createUserDto.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
