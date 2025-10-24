# 🚀 Deployment Guide

Hướng dẫn triển khai WebApp Quản Lý Giám Định Nghiệp Đoàn DC.

## 🎯 Deployment Options

### 🐳 Docker Deployment (Recommended)
- **Pros**: Isolated environment, easy scaling
- **Cons**: Requires Docker knowledge
- **Best for**: Production, staging

### 🌐 Traditional Deployment
- **Pros**: Simple setup, direct control
- **Cons**: Manual dependency management
- **Best for**: Small deployments, development

### ☁️ Cloud Deployment
- **Pros**: Auto-scaling, managed services
- **Cons**: Higher cost, vendor lock-in
- **Best for**: Large scale, high availability

## 🐳 Docker Deployment

### 📋 Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 🐙 Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./production.db
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  data:
```

### 🚀 Docker Commands
```bash
# Build image
docker build -t eaip-management .

# Run container
docker run -d \
  --name eaip-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -v $(pwd)/data:/app/data \
  eaip-management

# Use docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 🌐 Traditional Deployment

### 📋 Server Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+
- **Node.js**: 18+
- **RAM**: 2GB minimum
- **Storage**: 20GB minimum
- **SSL Certificate**: Recommended

### 🛠️ Setup Steps

#### 1️⃣ Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Certbot
sudo apt install certbot python3-certbot-nginx -y
```

#### 2️⃣ Application Setup
```bash
# Clone repository
git clone <repository-url> /var/www/eaip-management
cd /var/www/eaip-management

# Install dependencies
npm ci --production

# Build application
npm run build

# Setup environment
cp .env.example .env.production
# Edit .env.production with production values

# Setup database
npm run db:push
```

#### 3️⃣ PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'eaip-management',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
```

#### 4️⃣ Start Application
```bash
# Create logs directory
mkdir logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

## 🔧 Nginx Configuration

### 📋 Nginx Config
```nginx
# /etc/nginx/sites-available/eaip-management
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        # ... same proxy settings
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 🔒 SSL Setup
```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run

# Enable site
sudo ln -s /etc/nginx/sites-available/eaip-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## ☁️ Cloud Deployment

### 🅰️ Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Setup custom domain
vercel domains add your-domain.com
```

### 🔵 Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### 🟢 DigitalOcean App Platform
```yaml
# .do/app.yaml
name: eaip-management
services:
- name: web
  source_dir: /
  github:
    repo: your-username/eaip-management
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  env:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
databases:
- name: db
  engine: PG
  version: "14"
```

## 📊 Monitoring & Logging

### 📈 Application Monitoring
```typescript
// lib/monitoring.ts
import { createPrometheusMetrics } from 'prom-client'

export const httpRequestDuration = new createPrometheusMetrics.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
})

export const httpRequestTotal = new createPrometheusMetrics.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
})
```

### 📝 Log Management
```typescript
// lib/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}
```

## 🔒 Security

### 🛡️ Security Checklist
- ✅ HTTPS enabled
- ✅ Security headers configured
- ✅ Rate limiting implemented
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Environment variables secured

### 🔐 Environment Variables
```bash
# .env.production
NODE_ENV=production
DATABASE_URL="file:./production.db"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# Email configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
```

## 🔄 CI/CD Pipeline

### 📋 GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/eaip-management
            git pull origin main
            npm ci --production
            npm run build
            pm2 reload eaip-management
```

## 📞 Deployment Support

### 🆘 Troubleshooting
1. **Check logs**: `pm2 logs` or `docker-compose logs`
2. **Health check**: `curl http://localhost:3000/api/health`
3. **Database**: Verify database connection
4. **Environment**: Check environment variables

### 📞 Contact Support
- **EMS SOLUTION**: admin@gpems.net
- **Hotline**: 0903375265 (Mr.Hiền)
- **Website**: www.gpems.net

---

© 2024 EMS SOLUTION - Deployment Guide for Nghiệp Đoàn DC