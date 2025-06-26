import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register({ email, username, password }: {
        email: any;
        username: any;
        password: any;
    }): Promise<{
        access_token: string;
    }>;
    login({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        access_token: string;
    }>;
}
