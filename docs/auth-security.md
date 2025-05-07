# Authentication & Security

This document provides information about the authentication and security mechanisms implemented in the Tax ID Return System.

## Authentication

### Authentication Flow

The system implements a JWT (JSON Web Token) based authentication flow:

1. **User Registration**:

   - User registers with email, password, and personal information
   - Password is hashed using bcrypt before storage
   - Verification email is sent to the user's email address
   - User account is created with `isVerified` set to `false`

2. **Email Verification**:

   - User clicks on the verification link in the email
   - System verifies the token and marks the user account as verified
   - User can now log in to the system

3. **User Login**:

   - User provides email and password
   - System verifies credentials against the database
   - If valid, system generates a JWT token and returns it to the client
   - Client stores the JWT token (typically in localStorage or secure cookies)

4. **Authenticated Requests**:

   - Client includes the JWT token in the `Authorization` header
   - Server validates the token for each protected request
   - If the token is valid, the request is processed
   - If the token is invalid or expired, a 401 Unauthorized response is returned

5. **Token Refresh**:

   - JWT tokens have an expiration time
   - Client can request a new token using a refresh token endpoint
   - System validates the current token and issues a new one if valid

6. **Password Reset**:
   - User requests a password reset via email
   - System sends a reset token to the user's email
   - User clicks on the reset link and provides a new password
   - System verifies the token and updates the user's password

### JWT Implementation

The JWT tokens contain:

- **User ID**: To identify the user
- **Role**: User's role for authorization
- **Expiration Time**: When the token becomes invalid
- **Issue Time**: When the token was created
- **Issuer**: The system that issued the token

```typescript
// Example JWT payload
interface JwtPayload {
  sub: string; // User ID
  role: string; // User role
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
  iss: string; // Issuer
}
```

## Authorization

### Role-Based Access Control

The system implements role-based access control (RBAC) with the following roles:

- **User**: Regular user with access to their own data
- **Admin**: Administrator with access to all data and administrative functions

```typescript
// Example authorization guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### Resource-Based Access Control

In addition to roles, the system implements resource-based access control:

- Users can only access their own taxpayer data
- Users can only access tax returns associated with their taxpayer ID
- Administrators can access all data

```typescript
// Example resource-based guard
@Injectable()
export class TaxpayerOwnerGuard implements CanActivate {
  constructor(private taxpayerService: TaxpayerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taxpayerId = request.params.id;

    // Admins can access all taxpayers
    if (user.role === "admin") {
      return true;
    }

    // Regular users can only access their own taxpayer
    return user.taxpayerId === taxpayerId;
  }
}
```

## API Security

### GraphQL Security

The GraphQL API implements several security measures:

- **Query Complexity Analysis**: Prevents complex queries that could impact performance
- **Query Depth Limiting**: Prevents deeply nested queries
- **Rate Limiting**: Limits the number of requests from a single client
- **Authentication Directives**: Protects specific fields or types with authentication requirements

```typescript
// Example GraphQL module configuration
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/schema.gql",
      sortSchema: true,
      context: ({ req }) => ({ req }),
      validationRules: [
        depthLimit(10),
        createComplexityRule({
          maximumComplexity: 50,
          variables: {},
          onComplete: (complexity) => {
            console.log("Query complexity:", complexity);
          },
        }),
      ],
    }),
  ],
})
export class AppModule {}
```

### REST API Security

The REST API implements:

- **JWT Authentication**: For protected endpoints
- **Request Validation**: Using DTO objects with class-validator
- **Rate Limiting**: Using nestjs/throttler
- **CORS Configuration**: Restricting cross-origin requests

```typescript
// Example CORS configuration
const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS.split(","),
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
});
```

## Data Security

### Password Security

- Passwords are hashed using bcrypt with a work factor of 10
- Password requirements:
  - Minimum length: 8 characters
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Must contain at least one number
  - Must contain at least one special character

```typescript
// Example password validation
export class UserService {
  async validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
```

### Data Encryption

- Sensitive data is encrypted in the database using:
  - Transport Layer Security (TLS) for database connections
  - Column-level encryption for highly sensitive data

### Personal Data Protection

The system follows data protection principles:

- **Data Minimization**: Only collecting necessary data
- **Purpose Limitation**: Using data only for its intended purpose
- **Storage Limitation**: Retaining data only as long as necessary
- **Accuracy**: Ensuring data is accurate and up-to-date
- **Integrity and Confidentiality**: Protecting data from unauthorized access

## Infrastructure Security

### Server Security

- Servers are protected with:
  - Firewall configurations
  - Regular security updates
  - Intrusion detection systems
  - Access control mechanisms

### Container Security

Docker containers follow security best practices:

- Running as non-root users
- Using minimal base images
- Implementing resource limitations
- Regular vulnerability scanning

```yaml
# Example secure Docker configuration
FROM node:18-alpine AS base

# Use a non-root user
USER node

# Set working directory to be owned by the non-root user
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# Copy application code
COPY --chown=node:node . .

# Run with minimal privileges
CMD ["node", "dist/main.js"]
```

## Compliance

The system is designed to comply with:

- **GDPR**: General Data Protection Regulation
- **PCI DSS**: Payment Card Industry Data Security Standard (where applicable)
- **OWASP**: Open Web Application Security Project guidelines

## Security Testing

The system undergoes regular security testing:

- **Static Application Security Testing (SAST)**: Code analysis for security vulnerabilities
- **Dynamic Application Security Testing (DAST)**: Testing running applications for security vulnerabilities
- **Dependency Scanning**: Checking dependencies for known vulnerabilities
- **Penetration Testing**: Simulated attacks to identify vulnerabilities

## Incident Response

The system has an incident response plan:

1. **Detection**: Monitoring systems for security incidents
2. **Containment**: Limiting the impact of an incident
3. **Eradication**: Removing the cause of the incident
4. **Recovery**: Restoring systems to normal operation
5. **Lessons Learned**: Documenting the incident and improving security
