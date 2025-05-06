import { Injectable } from '@nestjs/common';
import { DatabaseService, User } from '@tax/database';
export type UserWithoutPassword = Omit<
  User,
  'password' | 'resetTokenExpiry' | 'resetToken' | 'verificationToken'
>;
@Injectable()
export class UsersRepository {
  constructor(private prisma: DatabaseService) {}

  async getOneWithPassword(params = { where: {} }) {
    return await this.prisma.user.findFirst({
      ...params,
    });
  }
  async updateUser(user: Partial<User> & Pick<User, 'id'>) {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
    return updatedUser;
  }
  async getOne(params: {
    where: Record<string, unknown>;
    select?: Record<string, boolean>;
  }) {
    const user = await this.prisma.user.findFirst({
      where: params.where,
      select: params.select,
    });
    if (!user) throw new Error('User not found');
    return user;
  }
}
