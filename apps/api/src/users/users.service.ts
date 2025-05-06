import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { UsersRepository, UserWithoutPassword } from './users.repository';
import { LoginUserDto } from 'src/auth/dto/login-user.input';
import { User } from '@tax/database';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRepository.getOneWithPassword({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (!user?.isActive) {
      throw new HttpException('Account blocked', HttpStatus.FORBIDDEN);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...rest } = user;
    return rest;
  }

  async updateOne(
    userData: Partial<User> & Pick<User, 'id'>,
  ): Promise<UserWithoutPassword> {
    if (userData.email) {
      const existingUser = await this.userRepository.getOneWithPassword({
        where: {
          email: userData.email,
          id: { not: userData.id },
        },
      });
      if (existingUser) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }
    }

    return this.userRepository.updateUser(userData);
  }
  async findOneByResetToken(token: string): Promise<User | null> {
    return this.userRepository.getOneWithPassword({
      where: {
        resetToken: token,
      },
    });
  }
  async findOneByEmailWithPassword(email: string) {
    return this.userRepository.getOneWithPassword({
      where: { email },
    });
  }

  async findUser(id: number) {
    const user = await this.userRepository.getOne({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      ...user,
    };
  }

  async updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.getOneWithPassword({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Current password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hashedPassword = await hash(newPassword, 10);
    const updatedUser = await this.userRepository.updateUser({
      id: userId,
      password: hashedPassword,
    });

    return updatedUser;
  }
}
