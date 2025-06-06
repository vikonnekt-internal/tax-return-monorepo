import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordInput } from './dto/reset-password.input';
import { GraphQLError } from 'graphql';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { EnvService } from '../env-config/env.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}

  private _createToken(
    user: { email: string; role: string[]; id: number },
    expiresIn = '30m',
  ) {
    const token = this.jwtService.sign(user, {
      expiresIn,
    });
    return {
      expiresIn,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    const token = this._createToken({
      id: user.id,
      email: user.email,
      role: [user.role],
    });

    return {
      token,
      data: {
        ...user,
      },
    };
  }
  async resetPassword(input: ResetPasswordInput) {
    const user = await this.usersService.findOneByResetToken(input.token);

    if (!user) {
      throw new GraphQLError('Password reset token expired');
    }
    if (!user?.resetTokenExpiry || user?.resetTokenExpiry < new Date()) {
      throw new GraphQLError('Password reset token expired');
    }
    const hashedPassword = await hash(input.password, 10);
    return this.usersService.updateOne({
      id: user.id,
      resetToken: null,
      resetTokenExpiry: null,
      password: hashedPassword,
    });
  }
  async sendResetPasswordEmail(email: string) {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new GraphQLError('User not found');
    }

    const token = uuidv4();

    const resetPasswordUrl = `${this.envService.clientUrl}/reset-password/${token}`;

    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);
    await this.usersService.updateOne({
      id: user.id,
      resetToken: token,
      resetTokenExpiry,
    });

    return 'Password reset email sent';
  }
}
