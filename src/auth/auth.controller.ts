import { Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  validateUser() {
    return this.authService.validateUser('john@doe.com', 'changeme');
  }
}
