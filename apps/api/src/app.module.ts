import { GraphQLUpload } from 'graphql-upload';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './env-config/env.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { validate } from './env-config/env.constants';
import { Upload } from './common/upload/upload-scalar';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import logger from './common/logger';
import { ZodError } from 'zod';
import { LoggerMiddleware } from './common/logger/logger.middlewear';
import { TaxpayersModule } from './taxpayers/taxpayers.module';
import { IncomeSourcesModule } from './income-sources/income-sources.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { HousingLoansModule } from './housing-loans/housing-loans.module';
import { OtherDebtsModule } from './other-debts/other-debts.module';
import { RealEstatesModule } from './real-estates/real-estates.module';
import { BenefitsModule } from './benefits/benefits.module';
import { TaxReportsModule } from './tax-reports/tax-reports.module';
import { AssetsModule } from './assets/assets.module';
import { DebtsModule } from './debts/debts.module';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: '.env',
      validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      formatError: (error) => {
        logger.error(
          'Error:',
          error,
          error.extensions?.statusCode,
          error.extensions?.originalError,
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let errors: any[] = [];
        if (error.extensions?.originalError) {
          errors = (error.extensions?.originalError as ZodError)?.errors;
        }
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          errors,
          statusCode: error.extensions?.statusCode || 400,
        };
      },
      playground: true,
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
      resolvers: {
        Upload: GraphQLUpload,
      },
    }),
    AuthModule,
    UsersModule,
    EnvModule,
    TaxpayersModule,
    IncomeSourcesModule,
    VehiclesModule,
    HousingLoansModule,
    OtherDebtsModule,
    RealEstatesModule,
    BenefitsModule,
    TaxReportsModule,
    AssetsModule,
    DebtsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppResolver,
    AppService,
    Upload,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
