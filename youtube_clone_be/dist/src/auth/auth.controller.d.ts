import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: SignUpDTO): Promise<{
        user: Partial<import("../../Schema/user.shema").User>;
        token: string;
    }>;
    login(loginData: LoginDTO): Promise<{
        user: import("../../Schema/user.shema").User;
        token: string;
    }>;
    getCurrentUser(CurrentUser: any): Promise<(import("mongoose").Document<unknown, {}, import("../../Schema/user.shema").User, {}> & import("../../Schema/user.shema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateUser(CurrentUser: any, body: UpdateUserDTO): Promise<(import("mongoose").Document<unknown, {}, import("../../Schema/user.shema").User, {}> & import("../../Schema/user.shema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
