import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvService } from './env.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EnvService, ConfigService],
  exports: [EnvService, ConfigService],
})
export class EnvModule {}
