# DevOps

Learn how to deploy, monitor, and maintain JAQ Stack applications using modern DevOps practices.

## Overview

DevOps practices for JAQ Stack focus on automation, monitoring, and continuous delivery to ensure reliable and scalable applications.

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017
      redis:
        image: redis:latest
        ports:
          - 6379:6379
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Cache Maven dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
    
    - name: Install dependencies
      run: |
        cd backend && mvn clean install -DskipTests
        cd ../frontend && npm ci
    
    - name: Run backend tests
      run: |
        cd backend && mvn test
    
    - name: Run frontend tests
      run: |
        cd frontend && npm test -- --coverage --watchAll=false
    
    - name: Build application
      run: |
        cd backend && mvn package -DskipTests
        cd ../frontend && npm run build
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: |
          backend/target/surefire-reports/
          frontend/coverage/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment..."
        # Add your deployment commands here
    
    - name: Run smoke tests
      run: |
        echo "Running smoke tests..."
        # Add smoke test commands here
    
    - name: Deploy to production
      run: |
        echo "Deploying to production environment..."
        # Add production deployment commands here
```

## Containerization

### Docker Configuration

#### Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build the application
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/jaqstack-backend.jar"]
```

#### Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: jaqstack-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db
    networks:
      - jaqstack-network

  redis:
    image: redis:latest
    container_name: jaqstack-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - jaqstack-network

  backend:
    build: ./backend
    container_name: jaqstack-backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATA_MONGODB_HOST: mongodb
      SPRING_DATA_MONGODB_PORT: 27017
      SPRING_REDIS_HOST: redis
      SPRING_REDIS_PORT: 6379
    depends_on:
      - mongodb
      - redis
    networks:
      - jaqstack-network

  frontend:
    build: ./frontend
    container_name: jaqstack-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - jaqstack-network

volumes:
  mongodb_data:
  redis_data:

networks:
  jaqstack-network:
    driver: bridge
```

## Kubernetes Deployment

### Namespace

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: jaqstack
```

### ConfigMap

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: jaqstack-config
  namespace: jaqstack
data:
  MONGODB_HOST: mongodb-service
  MONGODB_PORT: "27017"
  REDIS_HOST: redis-service
  REDIS_PORT: "6379"
  API_URL: "http://backend-service:8080"
```

### Secrets

```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: jaqstack-secrets
  namespace: jaqstack
type: Opaque
data:
  MONGODB_USERNAME: YWRtaW4=  # base64 encoded
  MONGODB_PASSWORD: cGFzc3dvcmQ=  # base64 encoded
  JWT_SECRET: eW91ci1qd3Qtc2VjcmV0  # base64 encoded
```

### MongoDB Deployment

```yaml
# k8s/mongodb.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
  namespace: jaqstack
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:latest
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: jaqstack-secrets
              key: MONGODB_USERNAME
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: jaqstack-secrets
              key: MONGODB_PASSWORD
        volumeMounts:
        - name: mongodb-storage
          mountPath: /data/db
      volumes:
      - name: mongodb-storage
        persistentVolumeClaim:
          claimName: mongodb-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
  namespace: jaqstack
spec:
  selector:
    app: mongodb
  ports:
  - port: 27017
    targetPort: 27017
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
  namespace: jaqstack
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

### Backend Deployment

```yaml
# k8s/backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: jaqstack
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: jaqstack/backend:latest
        ports:
        - containerPort: 8080
        envFrom:
        - configMapRef:
            name: jaqstack-config
        - secretRef:
            name: jaqstack-secrets
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: jaqstack
spec:
  selector:
    app: backend
  ports:
  - port: 8080
    targetPort: 8080
  type: ClusterIP
```

### Frontend Deployment

```yaml
# k8s/frontend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: jaqstack
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: jaqstack/frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: jaqstack
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

### Ingress

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: jaqstack-ingress
  namespace: jaqstack
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - jaqstack.example.com
    secretName: jaqstack-tls
  rules:
  - host: jaqstack.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

## Monitoring and Observability

### Prometheus Configuration

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'jaqstack-backend'
    static_configs:
      - targets: ['backend-service:8080']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s

  - job_name: 'jaqstack-mongodb'
    static_configs:
      - targets: ['mongodb-exporter:9216']

  - job_name: 'jaqstack-redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

### Grafana Dashboard

```json
{
  "dashboard": {
    "title": "JAQ Stack Monitoring",
    "panels": [
      {
        "title": "Application Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_server_requests_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Database Connections",
        "type": "graph",
        "targets": [
          {
            "expr": "mongodb_connections_current",
            "legendFormat": "MongoDB Connections"
          }
        ]
      }
    ]
  }
}
```

### Application Monitoring

```java
// Backend monitoring configuration
@Configuration
@EnableMetrics
public class MonitoringConfig {
    
    @Bean
    public MeterRegistry meterRegistry() {
        return new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
    }
    
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
}

// Custom metrics
@Component
public class ApplicationMetrics {
    
    private final Counter requestCounter;
    private final Timer requestTimer;
    
    public ApplicationMetrics(MeterRegistry meterRegistry) {
        this.requestCounter = Counter.builder("jaqstack.requests.total")
            .description("Total number of requests")
            .register(meterRegistry);
        
        this.requestTimer = Timer.builder("jaqstack.requests.duration")
            .description("Request duration")
            .register(meterRegistry);
    }
    
    public void incrementRequestCount() {
        requestCounter.increment();
    }
    
    public void recordRequestDuration(Duration duration) {
        requestTimer.record(duration);
    }
}
```

## Logging

### Centralized Logging

```yaml
# logging/fluentd-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
  namespace: jaqstack
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*jaqstack*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      format json
      time_key time
      time_format %Y-%m-%dT%H:%M:%S.%NZ
    </source>
    
    <match kubernetes.**>
      @type elasticsearch
      host elasticsearch-service
      port 9200
      index_name jaqstack-logs
      type_name _doc
    </match>
```

### Application Logging

```java
// Logging configuration
@Configuration
public class LoggingConfig {
    
    @Bean
    public Logger jaqstackLogger() {
        return LoggerFactory.getLogger("jaqstack");
    }
}

// Structured logging
@Service
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    public User createUser(User user) {
        logger.info("Creating user", 
            kv("userId", user.getId()),
            kv("email", user.getEmail()),
            kv("timestamp", Instant.now()));
        
        try {
            User createdUser = userRepository.save(user);
            logger.info("User created successfully", 
                kv("userId", createdUser.getId()));
            return createdUser;
        } catch (Exception e) {
            logger.error("Failed to create user", 
                kv("userId", user.getId()),
                kv("error", e.getMessage()));
            throw e;
        }
    }
}
```

## Security

### Security Scanning

```yaml
# security/trivy-scan.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: trivy-scan
  namespace: jaqstack
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: trivy
            image: aquasec/trivy:latest
            command:
            - trivy
            - image
            - --format
            - json
            - --output
            - /tmp/scan-results.json
            - jaqstack/backend:latest
            volumeMounts:
            - name: scan-results
              mountPath: /tmp
          volumes:
          - name: scan-results
            emptyDir: {}
          restartPolicy: OnFailure
```

### Network Policies

```yaml
# security/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: jaqstack-network-policy
  namespace: jaqstack
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: mongodb
    ports:
    - protocol: TCP
      port: 27017
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
```

## Backup and Disaster Recovery

### Database Backup

```bash
#!/bin/bash
# scripts/backup.sh

# MongoDB backup
mongodump --host mongodb-service:27017 \
  --db jaqstack \
  --out /backup/mongodb/$(date +%Y%m%d_%H%M%S)

# Redis backup
redis-cli -h redis-service -p 6379 BGSAVE

# Upload to cloud storage
aws s3 sync /backup s3://jaqstack-backups/$(date +%Y%m%d)/
```

### Disaster Recovery Plan

1. **RTO (Recovery Time Objective)**: 4 hours
2. **RPO (Recovery Point Objective)**: 1 hour
3. **Backup Frequency**: Daily full backup, hourly incremental
4. **Testing**: Monthly disaster recovery drills

## Getting Help

- Check the [GitHub Issues](https://github.com/jaqstack/jaqstack-devops/issues)
- Join our [Discord Community](https://discord.gg/jaqstack)
- Read the [Kubernetes Documentation](https://kubernetes.io/docs/)
- Read the [Docker Documentation](https://docs.docker.com/)

## Next Steps

- [Using Java](./01-using-java.md) - Backend development
- [Using Angular](./02-using-angular.md) - Frontend development
- [Using NoSQL](./03-using-nosql.md) - Database integration
