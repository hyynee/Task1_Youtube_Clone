import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'Schema/user.shema';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(createUserDto: SignUpDTO): Promise<{
        user: Partial<User>;
        token: string;
    }>;
    login(login: LoginDTO): Promise<{
        user: User;
        token: string;
    }>;
    getCurrentUser(req: any): Promise<any>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateUser(id: string, body: UpdateUserDTO): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
