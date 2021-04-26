import {
  Controller,
  Get,
  Post,
  Request,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/login')
  async test(@Request() req: Request) {
    const token = req.headers['authorization'];
    return this.authService.extractFromJwt(token.slice(7));
  }
}
