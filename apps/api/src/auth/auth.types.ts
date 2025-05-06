import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/users/users.type';

@ObjectType({ description: 'Token' })
export class Token {
  @Field()
  expiresIn: string;
  @Field()
  token: string;
}

@ObjectType({ description: 'LoginResult' })
export class LoginResult {
  @Field(() => Token)
  token: Token;

  @Field(() => User)
  data: User;
}

@ObjectType({ description: 'RoleGuest' })
export class RoleGuest {
  @Field(() => [String])
  accountType: ['GUEST'];
}

@ObjectType({ description: 'LoginGuest' })
export class LoginGuest {
  @Field(() => Token)
  token: Token;

  @Field(() => RoleGuest)
  data: RoleGuest;
}
