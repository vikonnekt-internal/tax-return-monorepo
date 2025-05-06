import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService, User } from '@tax/database';
import { SignupInput } from './dto/signup-user-output';
export type UserWithoutPassword = Omit<
  User,
  'password' | 'resetTokenExpiry' | 'resetToken' | 'verificationToken'
>;
@Injectable()
export class UsersRepository {
  constructor(private prisma: DatabaseService) {}

  async signup(dto: SignupInput) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new BadRequestException('User with this email already exists.');
    }

    const { ...userData } = dto;

    const user = await this.prisma.user.create({
      data: {
        ...userData,
      },
    });

    return user;
  }

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
