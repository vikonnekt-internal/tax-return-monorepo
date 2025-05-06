import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { User } from 'src/users/users.type';
import { LoginResult } from './auth.types';
import { ResetPasswordInput } from './dto/reset-password.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResult)
  loginAdmin(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.login({ email, password });
  }
  @Mutation(() => Boolean)
  async resetPassword(
    @Args('input', { type: () => ResetPasswordInput })
    input: ResetPasswordInput,
  ) {
    await this.authService.resetPassword(input);
    return true;
  }
  @Mutation(() => String)
  sendResetPasswordEmail(@Args('email', { type: () => String }) email: string) {
    return this.authService.sendResetPasswordEmail(email);
  }
}
