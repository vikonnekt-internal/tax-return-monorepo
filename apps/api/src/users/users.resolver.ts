import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';
import { User } from './users.type';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/auth/entities/user-entities';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async whoAmI(@CurrentUser() user: UserEntity) {
    const result = await this.usersService.findUser(user.id);
    return result;
  }
}
