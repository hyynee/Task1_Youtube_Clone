import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'Schema/user.shema';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    createUserDto: SignUpDTO,
  ): Promise<{ user: Partial<User>; token: string }> {
    const { email, password, avatar, name } = createUserDto;

    try {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new HttpException(
          { statusCode: 400, message: 'Email đã tồn tại' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = new this.userModel({ email, password, name, avatar });

      await newUser.save();
      const payload = { user: { id: newUser.id } };
      const token = this.jwtService.sign(payload);

      const userResponse = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      };

      return { user: userResponse, token };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error('❌ Register error:', error);
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(login: LoginDTO): Promise<{ user: User; token: string }> {
    const { email, password } = login;
    try {
      const user = await this.userModel.findOne({
        email,
      });
      if (!user) {
        throw new HttpException(
          { statusCode: 400, message: 'Invalid credentials' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new HttpException(
          { statusCode: 400, message: 'Invalid credentials' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = { user: { id: user.id } };
      // sign and return the token
      const token = this.jwtService.sign(payload);
      return { user: user, token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async updateUser(id: string, body: UpdateUserDTO) {
    // console.log('Update user id:', id);
    // console.log('Update user body:', body);
    const { name, email, avatar } = body;
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { name, email, avatar },
        { new: true },
      );
      return user;
    } catch (error) {
      console.error('Update user error:', error);
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
