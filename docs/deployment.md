# Deployment Guide

This document provides comprehensive instructions for deploying the Tax ID Return System in various environments.

## Overview

The Tax ID Return System is designed to be deployed using Docker containers, which ensures consistency across environments and simplifies the deployment process. The system consists of several services:

- **API Service**: NestJS backend application
- **Web Service**: Next.js frontend application
- **Database Service**: PostgreSQL database
- **Nginx Service**: Web server for routing and serving static files (production only)

## Prerequisites

Before deploying the system, ensure you have the following:

- **Docker** and **Docker Compose** installed on the target machine
- Access to a PostgreSQL database (can be containerized or external)
- Domain name configured (for production deployments)
- SSL certificates (for production deployments)

## Environment Variables

Create environment files for each environment (development, staging, production):

### API Service (.env)

```
# Database
DATABASE_URL=postgresql://username:password@db:5432/tax_system?schema=public

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=3600

# Server
PORT=3000
NODE_ENV=production

# Logging
LOG_LEVEL=info

# CORS
ALLOWED_ORIGINS=https://yourdomain.com

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
EMAIL_FROM=noreply@yourdomain.com
```

### Web Service (.env)

```
# API
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_GRAPHQL_URL=https://api.yourdomain.com/graphql

# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true

# Environment
NEXT_PUBLIC_NODE_ENV=production

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Database Service (.env)

```
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=tax_system
```

## Local Development Deployment

For local development, use the provided Docker Compose file:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Staging Deployment

For staging environments, use the staging-specific Docker Compose file:

```bash
# Start all services in staging mode
docker-compose -f docker-compose.staging.yml up -d

# Apply database migrations
docker-compose -f docker-compose.staging.yml exec api npm run migrate:deploy

# Seed the database (if needed)
docker-compose -f docker-compose.staging.yml exec api npm run seed
```

## Production Deployment

### Using Docker Compose (Single Server)

For production deployments on a single server:

```bash
# Start all services in production mode
docker-compose -f docker-compose.prod.yml up -d

# Apply database migrations
docker-compose -f docker-compose.prod.yml exec api npm run migrate:deploy
```

### Docker Compose Production Configuration

The `docker-compose.prod.yml` file should be configured as follows:

```yaml
version: "3.8"

services:
  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    env_file:
      - ./db.env
    restart: always
    networks:
      - backend

  api:
    image: yourdomain/tax-system-api:latest
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    depends_on:
      - db
    env_file:
      - ./api.env
    restart: always
    networks:
      - backend
      - frontend

  web:
    image: yourdomain/tax-system-web:latest
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    env_file:
      - ./web.env
    restart: always
    networks:
      - frontend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
      - web_build:/usr/share/nginx/html
    depends_on:
      - api
      - web
    restart: always
    networks:
      - frontend

networks:
  frontend:
  backend:

volumes:
  postgres_data:
  web_build:
```

### Using Kubernetes

For larger-scale deployments, Kubernetes is recommended:

1. Build and push Docker images to a container registry:

   ```bash
   docker build -t yourdomain/tax-system-api:latest -f apps/api/Dockerfile .
   docker build -t yourdomain/tax-system-web:latest -f apps/web/Dockerfile .

   docker push yourdomain/tax-system-api:latest
   docker push yourdomain/tax-system-web:latest
   ```

2. Deploy using Kubernetes manifests or Helm charts (example using kubectl):
   ```bash
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/config-maps.yaml
   kubectl apply -f k8s/database.yaml
   kubectl apply -f k8s/api.yaml
   kubectl apply -f k8s/web.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

## SSL Configuration

For production deployments, configure SSL:

### Using Let's Encrypt with Certbot

```bash
# Install Certbot
apt-get update
apt-get install certbot python3-certbot-nginx

# Generate certificates
certbot --nginx -d api.yourdomain.com -d www.yourdomain.com -d yourdomain.com

# Configure auto-renewal
systemctl enable certbot.timer
systemctl start certbot.timer
```

### Manual SSL Configuration in Nginx

Create an Nginx configuration file:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/yourdomain.com.crt;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/api.yourdomain.com.crt;
    ssl_certificate_key /etc/nginx/ssl/api.yourdomain.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://api:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Database Migrations

Run database migrations during deployment:

```bash
# Using Docker Compose
docker-compose -f docker-compose.prod.yml exec api npm run migrate:deploy

# Using Kubernetes
kubectl exec -it $(kubectl get pods -l app=api -o jsonpath="{.items[0].metadata.name}") -- npm run migrate:deploy
```

## Deployment with CI/CD

### GitHub Actions

Example GitHub Actions workflow for CI/CD:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "pnpm"

      - name: Install dependencies
        run: |
          npm install -g pnpm
          pnpm install

      - name: Build applications
        run: pnpm build

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push API Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: apps/api/Dockerfile
          push: true
          tags: yourdomain/tax-system-api:latest

      - name: Build and push Web Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: apps/web/Dockerfile
          push: true
          tags: yourdomain/tax-system-web:latest

      - name: Deploy to production server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PRODUCTION_SERVER_HOST }}
          username: ${{ secrets.PRODUCTION_SERVER_USERNAME }}
          key: ${{ secrets.PRODUCTION_SERVER_SSH_KEY }}
          script: |
            cd /path/to/production
            git pull
            docker-compose -f docker-compose.prod.yml pull
            docker-compose -f docker-compose.prod.yml up -d
            docker-compose -f docker-compose.prod.yml exec -T api npm run migrate:deploy
```

## Monitoring and Logging

### Prometheus and Grafana

Set up monitoring using Prometheus and Grafana:

1. Add the Prometheus Node Exporter to your Docker Compose file:

   ```yaml
   node-exporter:
     image: prom/node-exporter:latest
     container_name: node-exporter
     restart: unless-stopped
     volumes:
       - /proc:/host/proc:ro
       - /sys:/host/sys:ro
       - /:/rootfs:ro
     command:
       - "--path.procfs=/host/proc"
       - "--path.rootfs=/rootfs"
       - "--path.sysfs=/host/sys"
       - "--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)"
     ports:
       - "9100:9100"
     networks:
       - monitoring

   prometheus:
     image: prom/prometheus:latest
     container_name: prometheus
     restart: unless-stopped
     volumes:
       - ./prometheus:/etc/prometheus
       - prometheus_data:/prometheus
     command:
       - "--config.file=/etc/prometheus/prometheus.yml"
       - "--storage.tsdb.path=/prometheus"
       - "--web.console.libraries=/etc/prometheus/console_libraries"
       - "--web.console.templates=/etc/prometheus/consoles"
       - "--web.enable-lifecycle"
     ports:
       - "9090:9090"
     networks:
       - monitoring

   grafana:
     image: grafana/grafana:latest
     container_name: grafana
     restart: unless-stopped
     volumes:
       - grafana_data:/var/lib/grafana
     ports:
       - "3000:3000"
     networks:
       - monitoring
   ```

2. Create a Prometheus configuration file at `./prometheus/prometheus.yml`:

   ```yaml
   global:
     scrape_interval: 15s
     evaluation_interval: 15s

   scrape_configs:
     - job_name: "prometheus"
       static_configs:
         - targets: ["localhost:9090"]

     - job_name: "node-exporter"
       static_configs:
         - targets: ["node-exporter:9100"]

     - job_name: "api"
       static_configs:
         - targets: ["api:3000"]
   ```

### Centralized Logging with ELK Stack

Set up centralized logging with the ELK (Elasticsearch, Logstash, Kibana) Stack:

1. Add the ELK stack to your Docker Compose file:

   ```yaml
   elasticsearch:
     image: docker.elastic.co/elasticsearch/elasticsearch:7.16.2
     container_name: elasticsearch
     environment:
       - discovery.type=single-node
       - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
     volumes:
       - elasticsearch_data:/usr/share/elasticsearch/data
     ports:
       - "9200:9200"
     networks:
       - elk

   logstash:
     image: docker.elastic.co/logstash/logstash:7.16.2
     container_name: logstash
     volumes:
       - ./logstash/pipeline:/usr/share/logstash/pipeline
     ports:
       - "5000:5000/tcp"
       - "5000:5000/udp"
       - "9600:9600"
     networks:
       - elk
     depends_on:
       - elasticsearch

   kibana:
     image: docker.elastic.co/kibana/kibana:7.16.2
     container_name: kibana
     ports:
       - "5601:5601"
     networks:
       - elk
     depends_on:
       - elasticsearch
   ```

## Backup and Restore

### Database Backup

Set up regular database backups:

```bash
#!/bin/bash
# database-backup.sh

BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_FILE="$BACKUP_DIR/database-backup-$TIMESTAMP.sql"

# Create backup
docker exec -t postgres pg_dump -U username tax_system > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Clean up old backups (keep last 7 days)
find $BACKUP_DIR -name "database-backup-*.sql.gz" -type f -mtime +7 -delete
```

Add the script to a daily cron job:

```bash
0 2 * * * /path/to/database-backup.sh
```

### Database Restore

To restore a database from backup:

```bash
#!/bin/bash
# database-restore.sh

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup-file>"
  exit 1
fi

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
  echo "Backup file not found: $BACKUP_FILE"
  exit 1
fi

# Check if gzipped
if [[ $BACKUP_FILE == *.gz ]]; then
  # Unzip first
  gunzip -c $BACKUP_FILE | docker exec -i postgres psql -U username tax_system
else
  # Direct restore
  cat $BACKUP_FILE | docker exec -i postgres psql -U username tax_system
fi

echo "Database restored from $BACKUP_FILE"
```

## Scaling

### Horizontal Scaling

For horizontal scaling, consider:

1. Using a load balancer in front of API instances:

   ```nginx
   upstream api_backend {
       server api1:3000;
       server api2:3000;
       server api3:3000;
   }

   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://api_backend;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

2. Scaling with Docker Compose:

   ```bash
   docker-compose -f docker-compose.prod.yml up -d --scale api=3
   ```

3. Scaling with Kubernetes:
   ```bash
   kubectl scale deployment api --replicas=3
   ```

### Database Scaling

For database scaling:

1. Use connection pooling with PgBouncer:

   ```yaml
   pgbouncer:
     image: edoburu/pgbouncer:latest
     environment:
       - DB_USER=username
       - DB_PASSWORD=password
       - DB_HOST=db
       - DB_NAME=tax_system
       - POOL_MODE=transaction
       - MAX_CLIENT_CONN=100
       - DEFAULT_POOL_SIZE=20
     ports:
       - "6432:5432"
     depends_on:
       - db
     networks:
       - backend
   ```

2. Configure read replicas for read-heavy workloads:
   ```
   DATABASE_WRITE_URL=postgresql://username:password@db-master:5432/tax_system
   DATABASE_READ_URL=postgresql://username:password@db-replica:5432/tax_system
   ```

## Troubleshooting

### Common Deployment Issues

1. **Database Connection Issues**:

   - Check if the database container is running: `docker ps | grep postgres`
   - Verify network connectivity between services
   - Check database credentials in environment variables

2. **Container Startup Failures**:

   - Check container logs: `docker logs <container_id>`
   - Verify environment variables are set correctly
   - Check for disk space issues: `df -h`

3. **Performance Issues**:

   - Monitor resource usage: `docker stats`
   - Check for slow database queries in logs
   - Consider adding caching (Redis) for frequently accessed data

4. **SSL/TLS Issues**:
   - Verify certificate paths and permissions
   - Check certificate expiration dates
   - Test SSL configuration: `openssl s_client -connect yourdomain.com:443`
