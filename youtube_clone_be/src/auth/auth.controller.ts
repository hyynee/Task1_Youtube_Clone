import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/currentUser.decorator';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() createUserDto: SignUpDTO) {
    return await this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginData: LoginDTO) {
    return await this.authService.login(loginData);
  }

  @ApiBearerAuth()
  @Get('/currentUser')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@CurrentUser() CurrentUser) {
    const userId = CurrentUser.user.id;
    const user = this.authService.getUserById(userId);
    return user;
  }

  @ApiBearerAuth()
  @Put('/update')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@CurrentUser() CurrentUser, @Body() body: UpdateUserDTO) {
    const userId = CurrentUser.user.id;
    const user = this.authService.updateUser(userId, body);
    return user;
  }
}
