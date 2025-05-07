# Technology Stack

This document outlines the technologies used in the Tax ID Return System.

## Core Technologies

### Languages

- **TypeScript**: Used throughout the codebase, providing static typing for improved development experience and code quality.
- **JavaScript**: Base language for the ecosystem.

### Frontend

- **Next.js**: React framework for building the web application with server-side rendering and static site generation capabilities.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **Apollo Client**: GraphQL client for managing data fetching and state.

### Backend

- **NestJS**: Progressive Node.js framework for building efficient, scalable server-side applications.
- **GraphQL**: Query language and runtime for APIs.
- **Apollo Server**: GraphQL server implementation.
- **RESTful APIs**: Used for specific endpoints where appropriate.

### Database

- **PostgreSQL**: Relational database for storing application data.
- **Prisma**: Next-generation ORM for TypeScript and Node.js.

### Authentication & Authorization

- **JSON Web Tokens (JWT)**: For secure authentication.
- **bcrypt**: For password hashing.
- **Custom role-based access control**: Managing permissions based on user roles.

## Development Tools

### Build & Development

- **Turborepo**: High-performance build system for JavaScript and TypeScript codebases.
- **pnpm**: Fast, disk space efficient package manager.
- **Node.js**: JavaScript runtime for server-side code execution.

### Code Quality & Testing

- **ESLint**: Static code analysis tool for identifying problematic patterns.
- **Prettier**: Code formatter to ensure consistent code style.
- **Jest**: JavaScript testing framework.
- **Cypress**: End-to-end testing framework for web applications.

### Containerization & Deployment

- **Docker**: Platform for developing, shipping, and running applications in containers.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.

## Version Control & Collaboration

- **Git**: Distributed version control system.
- **GitHub**: Platform for hosting and collaborating on Git repositories.
- **GitHub Actions**: CI/CD platform integrated with GitHub.

## Infrastructure & Hosting

- **Vercel**: Platform for frontend hosting (optional).
- **Cloud Services**: Various cloud providers can be used for hosting the application (AWS, GCP, Azure, etc.).

## Package Management

- **pnpm Workspace**: Manages dependencies across multiple packages in the monorepo.
- **Node Package Manager (npm)**: For individual package dependencies.

## File Upload & Storage

- **Custom upload package**: For handling file uploads.
- **Cloud Storage**: For storing uploaded files (implementation dependent).

## Logging & Monitoring

- **Custom logger package**: For consistent logging across services.
- **External monitoring tools**: Can be integrated as needed.
