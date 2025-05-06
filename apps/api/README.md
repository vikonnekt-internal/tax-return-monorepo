# tax Monorepo Documentation

This monorepo contains various packages and applications for the tax project. Below is the documentation for each package.

## Packages

### Upload Package

The upload package provides an easy-to-use integration with AWS S3 for file uploads in NestJS applications.

#### Installation

```bash
# Inside your NestJS project
npm install @tax/upload
```

#### Usage

There are two main ways to use the upload package:

##### Method 1: Using UploadModule.register()

```typescript
import { Module } from '@nestjs/common';
import { UploadModule } from '@tax/upload';

@Module({
  imports: [
    UploadModule.register({
      config: {
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      },
      uploadConfig: {
        BUCKET_NAME: process.env.BUCKET_NAME,
        S3_URL: process.env.S3_URL,
      },
    }),
  ],
})
export class AppModule {}
```

##### Method 2: Using createS3Provider directly

```typescript
import { Global, Module } from '@nestjs/common';
import { createS3Provider, UploadModule, UploadService } from '@tax/upload';

@Global()
@Module({
  imports: [
    UploadModule,
    // Other modules...
  ],
  providers: [
    UploadService,
    createS3Provider({
      config: {
        region: process.env.REGION,
      },
      uploadConfig: {
        S3_URL: process.env.S3_URL,
        BUCKET_NAME: process.env.BUCKET_NAME,
      },
    }),
    // Other providers...
  ],
  exports: [UploadService],
})
export class YourModule {}
```

#### Using the UploadService

Once configured, inject and use the UploadService in your service or controller:

```typescript
import { Injectable } from '@nestjs/common';
import { UploadService } from '@tax/upload';

@Injectable()
export class YourService {
  constructor(private readonly uploadService: UploadService) {}

  // Upload a stream (e.g., from Apollo Upload)
  async uploadFile(file: FileUpload) {
    const { createReadStream, filename, mimetype } = file;

    const { key } = await this.uploadService.uploadStream({
      file: createReadStream(),
      destination: 'uploads/', // This will create a folder structure in S3
      filename: filename,
      filetype: mimetype,
      // Optional parameters
      // acl: 'public-read', // Default value
      // bucketName: 'custom-bucket', // Override default bucket
    });

    return key; // The S3 key can be stored in your database
  }

  // Example of updating a user profile with file upload
  async updateProfile(input, picture) {
    // Your existing logic...

    if (picture) {
      const { createReadStream, filename, mimetype } = picture;
      const stream = createReadStream();

      // Remove existing file if needed
      if (existingPictureUri) {
        await this.uploadService.remove(existingPictureUri);
      }

      // Upload new file
      const { key } = await this.uploadService.uploadStream({
        destination: `users/${userId}/profile/`,
        filename,
        filetype: mimetype,
        file: stream,
      });

      // Add key to payload for database update
      payload = {
        ...payload,
        pictureUri: key,
      };
    }

    // Continue with database update...
  }

  // Upload a buffer
  async uploadBuffer(buffer: Buffer, filename: string, mimetype: string) {
    return this.uploadService.uploadBuffer({
      file: buffer,
      destination: 'uploads/',
      filename: filename,
      filetype: mimetype,
    });
  }

  // Get a signed URL for a private file
  async getSignedUrl(key: string) {
    // Second parameter is expiresIn in seconds (e.g., 3600 for 1 hour)
    return this.uploadService.getSignedUrl(key, 3600);
  }

  // Remove a file
  async removeFile(key: string) {
    return this.uploadService.remove(key);
  }
}
```

#### API Reference

##### UploadModule

- `register(options)`: Registers the module with AWS S3 configuration.
  - `options.config`: AWS S3 client configuration (region, credentials, etc.)
  - `options.uploadConfig`: Upload-specific configuration
    - `BUCKET_NAME`: S3 bucket name
    - `S3_URL`: Base S3 URL

##### createS3Provider

- `createS3Provider(options)`: Creates a provider for S3 services.
  - `options.config`: AWS S3 client configuration (region, credentials, etc.)
  - `options.uploadConfig`: Upload-specific configuration
    - `BUCKET_NAME`: S3 bucket name
    - `S3_URL`: Base S3 URL

##### UploadService

- `uploadStream(params)`: Uploads a stream to S3

  - Parameters:
    - `file`: Stream (e.g., from file upload)
    - `destination`: Path prefix in the bucket (e.g., 'users/123/documents/')
    - `filename`: Original filename (used for extension)
    - `filetype`: MIME type
    - `acl` (optional): S3 ACL, defaults to 'public-read'
    - `bucketName` (optional): Override default bucket
  - Returns: `{ url, key }` where key is the S3 object key that can be stored in your database

- `uploadBuffer(params)`: Uploads a buffer to S3

  - Parameters: Same as `uploadStream` but with `file` as Buffer
  - Returns: `{ url, destination }`

- `getSignedUrl(key, expiresIn)`: Gets a signed URL for a private file

  - Parameters:
    - `key`: S3 object key
    - `expiresIn`: Expiration time in seconds
  - Returns: Signed URL string

- `remove(key)`: Removes a file from S3
  - Parameters:
    - `key`: S3 object key
  - Returns: S3 delete command response

### Database Package

The database package provides a standardized way to connect to Prisma in NestJS applications.

#### Installation

```bash
# Inside your NestJS project
npm install @tax/database
```

#### Usage

Simply import the DatabaseModule in your module:

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  // other module configuration
})
export class AppModule {}
```

Then inject the DatabaseService where needed:

```typescript
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';

@Injectable()
export class YourService {
  constructor(private readonly db: DatabaseService) {}

  async findUser(id: number) {
    return this.db.user.findUnique({
      where: { id },
    });
  }
}
```

#### API Reference

##### DatabaseModule

- Main module that provides the DatabaseService

##### DatabaseService

- Extends the PrismaClient to provide database access
- Automatically connects to the database on module initialization

##### Entity Decorator

The package also provides an Entity decorator for identifying Prisma models:

```typescript
import { Entity } from '@tax/database';
import { PrismaModelName } from '@tax/database';

@Entity(PrismaModelName.User)
export class UserService {
  // ...
}
```

### Mail Package

The mail package provides email sending capabilities using SendGrid for NestJS applications.

#### Installation

```bash
# Inside your NestJS project
npm install @tax/mail
```

#### Usage

Import the MailModule in your module:

```typescript
import { Module } from '@nestjs/common';
import { MailModule } from '@tax/mail';

@Module({
  imports: [MailModule],
  // other module configuration
})
export class AppModule {}
```

Then use the MailService to send emails:

```typescript
import { Injectable } from '@nestjs/common';
import { MailService } from '@tax/mail';

@Injectable()
export class YourService {
  constructor(private readonly mailService: MailService) {}

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailService.sendEmail({
      to,
      subject: 'Welcome to tax!',
      text: `Hello ${name}, welcome to tax!`,
      html: `<p>Hello ${name}, welcome to tax!</p>`,
    });
  }
}
```

#### API Reference

##### MailModule

- Main module that provides the MailService
- Automatically loads environment variables using ConfigModule

##### MailService

- `sendEmail(params)`: Sends an email using SendGrid
  - Parameters:
    - `to`: Recipient email address
    - `subject`: Email subject
    - `text`: Plain text email body
    - `html`: HTML email body
    - `from` (optional): Sender email address (defaults to FROM_EMAIL environment variable)

### Microservice Client Package

The microservice-client package provides a standardized way to communicate with microservices in NestJS applications.

#### Installation

```bash
# Inside your NestJS project
npm install @tax/microservice-client
```

#### Usage

Import the MicroserviceClientModule in your module:

```typescript
import { Module } from '@nestjs/common';
import { MicroserviceClientModule } from '@tax/microservice-client';
import { EnvModule } from './env/env.module';
import { EnvService } from './env/env.service';

@Module({
  imports: [
    MicroserviceClientModule.registerAsync({
      global: true,
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => {
        return {
          services: [
            {
              name: 'legal-parser-ms',
              url: envService.legalParserServiceUrl,
            },
          ],
          timeout: envService.microserviceTimeout,
          retries: envService.microserviceRetries,
          global: true,
        };
      },
    }),
  ],
})
export class AppModule {}
```

Then inject and use the MicroserviceClientService:

```typescript
import { Injectable } from '@nestjs/common';
import { MicroserviceClientService } from '@tax/microservice-client';

@Injectable()
export class YourService {
  constructor(private readonly microserviceClient: MicroserviceClientService) {}

  async parseDocument(document: string) {
    const client = this.microserviceClient.getServiceClient('legal-parser-ms');
    const response = await client.post('/parse', { document });
    return response.data;
  }
}
```

#### API Reference

##### MicroserviceClientModule

- `register(options)`: Registers the module with static options

  - `options.services`: Array of microservice configurations
  - `options.timeout`: Global timeout for all microservice requests (in ms)
  - `options.retries`: Number of retry attempts for failed requests
  - `options.global`: Whether to make the module global

- `registerAsync(options)`: Registers the module with async options
  - `options.imports`: Array of modules to import
  - `options.inject`: Array of providers to inject
  - `options.useFactory`: Factory function that returns module options
  - `options.global`: Whether to make the module global

##### MicroserviceClientService

- `registerService(config, globalTimeout)`: Registers a new microservice

  - `config.name`: Microservice name
  - `config.url`: Microservice base URL
  - `config.headers` (optional): Default headers for all requests
  - `config.timeout` (optional): Service-specific timeout

- `getServiceClient(serviceName)`: Gets the Axios client for a specific service

### Apollo Package

The apollo package provides utilities for working with Apollo Client in React applications.

#### Installation

```bash
# Inside your React project
npm install @tax/apollo
```

#### Usage

The package provides custom hooks for GraphQL operations that can be used to abstract away the data fetching layer:

```typescript
import { useQuery, useMutation, useLazyQuery } from '@tax/apollo';
import { YOUR_QUERY, YOUR_MUTATION } from './graphql/operations';

// In your component
function YourComponent() {
  // Use query
  const { data, loading, error } = useQuery(YOUR_QUERY, {
    variables: { id: '123' },
  });

  // Use mutation
  const [mutate, { loading: mutationLoading }] = useMutation(YOUR_MUTATION);

  // Use lazy query
  const [fetchData, { data: lazyData }] = useLazyQuery(YOUR_QUERY);

  // Call the mutation
  const handleSubmit = async () => {
    await mutate({ variables: { input: { name: 'Test' } } });
  };

  return (
    // Your component JSX
  );
}
```

The package also provides React Query integration:

```typescript
import {
  QueryClientProvider,
  createRQClient,
  ReactQueryDevtools
} from '@tax/apollo';

// In your app root
function App() {
  const queryClient = createRQClient();

  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
```

#### Key Features

- Custom hooks that wrap Apollo Client hooks
- React Query integration
- Cache update utilities
- Type-safe GraphQL operations with TypeScript

### UI Shadcn Package

The ui-shadcn package provides a collection of UI components built with Shadcn UI, Tailwind CSS, and Radix UI primitives.

#### Installation

```bash
# Inside your React project
npm install @tax/ui-shadcn
```

#### Usage

Import the components directly in your React components:

```tsx
import { Button, Card, Input, Select } from '@tax/ui-shadcn';

function YourComponent() {
  return (
    <Card>
      <form>
        <Input placeholder="Enter your name" />
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </Select.Content>
        </Select>
        <Button>Submit</Button>
      </form>
    </Card>
  );
}
```

#### Available Components

The package includes various UI components, including:

- Button
- Card
- Input
- Select
- Checkbox
- Dialog
- Tabs
- and many more

### UI Package

The ui package provides custom UI components and utilities.

#### Installation

```bash
# Inside your React project
npm install @tax/ui
```

#### Usage

Import components directly from the package:

```tsx
import { CustomButton, Modal } from '@tax/ui';

function YourComponent() {
  return (
    <div>
      <CustomButton>Click me</CustomButton>
      <Modal title="Example Modal">
        <p>Modal content</p>
      </Modal>
    </div>
  );
}
```

### TypeScript Config Package

The typescript-config package provides shared TypeScript configurations for different project types.

#### Installation

```bash
# Inside your project
npm install @tax/typescript-config
```

#### Usage

Extend the appropriate configuration in your tsconfig.json:

```json
{
  "extends": "@tax/typescript-config/nest.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

Available configurations:

- `nest.json`: For NestJS applications
- `react.json`: For React applications
- `base.json`: Base configuration for all TypeScript projects

### ESLint Config Package

The eslint-config package provides shared ESLint configurations for different project types.

#### Installation

```bash
# Inside your project
npm install @tax/eslint-config
```

#### Usage

Extend the appropriate configuration in your .eslintrc:

```json
{
  "root": true,
  "extends": ["@tax/eslint-config/node"]
}
```

Available configurations:

- `node`: For Node.js applications
- `react`: For React applications
- `base`: Base configuration for all projects

## Applications

The monorepo includes several applications:

- `api`: Main API service
- `web`: Web frontend
- `front`: Front-end application
- `docs`: Documentation site
- Various microservices for specific functionality:
  - `legal-parser-ms`: Legal document parsing service
  - `eurlex-parser-ms`: EU law parsing service
  - `efta-workflow-ms`: EFTA workflow service
  - `api-example`: Example API application

## Development

### Prerequisites

- Node.js (LTS version)
- pnpm package manager
- Docker (for local development)

### Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/your-org/tax-monorepo.git
   cd tax-monorepo
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# AWS S3 Configuration
REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
BUCKET_NAME=your-bucket-name
S3_URL=https://your-bucket.s3.amazonaws.com

# SendGrid Configuration
SENDGRID_KEY=your-sendgrid-key
FROM_EMAIL=noreply@example.com

# Microservice URLs
LEGAL_PARSER_SERVICE_URL=http://localhost:3001
```

## Contributing

Guidelines for contributing to the project...
