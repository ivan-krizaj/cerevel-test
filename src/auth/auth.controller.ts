import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('/change-password')
  async changePassword(@Request() req) {
    return this.authService.updatePassword(req.user.id, req.body);
  }
}
