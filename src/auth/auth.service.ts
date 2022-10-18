import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user) {
      const { is_active } = user;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!is_active && user.password === password) {
        return user;
      }

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async updatePassword(id, payload) {
    const { newPassword, password, ...result } = payload;
    const hash = await bcrypt.hash(newPassword, 10);

    const data = {
      ...result,
      password: hash,
      password_reset: new Date(),
    };

    return await this.prisma.user.update({ where: { id }, data });
  }
}
