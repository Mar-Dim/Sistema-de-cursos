import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<{
        access_token: string;
        user: import("../users/entities/user.entity").User;
    }>;
    login(dto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: import("../users/entities/user.entity").User;
    }>;
}
