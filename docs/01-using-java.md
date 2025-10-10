# Using Java

Learn how to use Java with Helidon in the JAQ Stack ecosystem.

## Overview

Java with Helidon is the backbone of the JAQ Stack, providing lightweight, cloud-native backend services with enterprise-grade functionality and performance.

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

### Installation

```bash
# Clone the repository
git clone https://github.com/jaqstack/jaqstack-java.git

# Navigate to the project
cd jaqstack-java

# Build the project
mvn clean install
```

## Core Features

- **Helidon SE**: Lightweight microservices framework
- **Cloud Native**: Built for containers and Kubernetes
- **Security**: Built-in authentication and authorization
- **Database Connectivity**: Seamless integration with NoSQL databases
- **RESTful APIs**: Clean and consistent API design with JAX-RS
- **Observability**: Built-in metrics, health checks, and tracing
- **Testing**: Comprehensive test suite included

## Configuration

### Application Configuration

```yaml
# application.yaml
server:
  port: 8080
  host: 0.0.0.0

app:
  name: jaqstack-backend
  version: 1.0.0

database:
  mongodb:
    host: localhost
    port: 27017
    database: jaqstack
    username: admin
    password: password

security:
  jwt:
    secret: your-jwt-secret
    expiration: 3600

logging:
  level:
    io.helidon: INFO
    com.jaqstack: DEBUG
```

### Maven Dependencies

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>io.helidon.microprofile.bundles</groupId>
        <artifactId>helidon-microprofile</artifactId>
        <version>3.2.0</version>
    </dependency>
    
    <dependency>
        <groupId>io.helidon.integrations.mongo</groupId>
        <artifactId>helidon-integrations-mongo</artifactId>
        <version>3.2.0</version>
    </dependency>
    
    <dependency>
        <groupId>io.helidon.security</groupId>
        <artifactId>helidon-security</artifactId>
        <version>3.2.0</version>
    </dependency>
    
    <dependency>
        <groupId>io.helidon.metrics</groupId>
        <artifactId>helidon-metrics</artifactId>
        <version>3.2.0</version>
    </dependency>
</dependencies>
```

## Best Practices

1. **Code Organization**: Follow the standard Helidon project structure
2. **Error Handling**: Use global exception mappers
3. **Validation**: Implement proper input validation with Bean Validation
4. **Logging**: Use structured logging with appropriate levels
5. **Documentation**: Keep API documentation up to date with OpenAPI
6. **Configuration**: Use external configuration for environment-specific settings
7. **Health Checks**: Implement comprehensive health checks

## Examples

### Creating a REST Resource

```java
@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    
    @Inject
    private UserService userService;
    
    @GET
    public Response getAllUsers() {
        List<User> users = userService.findAll();
        return Response.ok(users).build();
    }
    
    @POST
    public Response createUser(@Valid User user) {
        User createdUser = userService.save(user);
        return Response.status(Response.Status.CREATED)
                      .entity(createdUser)
                      .build();
    }
    
    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") String id) {
        return userService.findById(id)
                .map(user -> Response.ok(user).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }
}
```

### Service Layer

```java
@ApplicationScoped
public class UserService {
    
    @Inject
    private UserRepository userRepository;
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
    
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
    
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }
}
```

### Repository Layer

```java
@ApplicationScoped
public class UserRepository {
    
    @Inject
    private MongoClient mongoClient;
    
    private MongoCollection<User> getCollection() {
        return mongoClient.getDatabase("jaqstack")
                         .getCollection("users", User.class);
    }
    
    public List<User> findAll() {
        return getCollection().find().into(new ArrayList<>());
    }
    
    public User save(User user) {
        if (user.getId() == null) {
            user.setId(UUID.randomUUID().toString());
        }
        getCollection().replaceOne(
            eq("_id", user.getId()), 
            user, 
            new ReplaceOptions().upsert(true)
        );
        return user;
    }
    
    public Optional<User> findById(String id) {
        User user = getCollection().find(eq("_id", id)).first();
        return Optional.ofNullable(user);
    }
    
    public void deleteById(String id) {
        getCollection().deleteOne(eq("_id", id));
    }
}
```

### Application Main Class

```java
public class Main {
    public static void main(String[] args) {
        Server server = Server.builder()
                .port(8080)
                .routing(r -> r
                    .register("/api", new UserResource())
                    .register("/health", HealthSupport.create())
                    .register("/metrics", MetricsSupport.create())
                )
                .build();
        
        server.start();
    }
}
```

## Advanced Features

### Security Configuration

```java
@ApplicationScoped
public class SecurityConfig {
    
    @Produces
    public Security security() {
        return Security.builder()
                .addProvider(basicAuthProvider())
                .addProvider(jwtProvider())
                .build();
    }
    
    private AuthenticationProvider basicAuthProvider() {
        return HttpBasicAuthProvider.builder()
                .userStore(userStore())
                .build();
    }
    
    private AuthenticationProvider jwtProvider() {
        return JwtProvider.builder()
                .verifyKey(publicKey())
                .build();
    }
}
```

### Health Checks

```java
@ApplicationScoped
public class DatabaseHealthCheck implements HealthCheck {
    
    @Inject
    private MongoClient mongoClient;
    
    @Override
    public HealthCheckResponse call() {
        try {
            mongoClient.getDatabase("jaqstack").runCommand(new Document("ping", 1));
            return HealthCheckResponse.named("database")
                    .status(HealthCheckResponse.Status.UP)
                    .withData("database", "jaqstack")
                    .build();
        } catch (Exception e) {
            return HealthCheckResponse.named("database")
                    .status(HealthCheckResponse.Status.DOWN)
                    .withData("error", e.getMessage())
                    .build();
        }
    }
}
```

### Metrics

```java
@ApplicationScoped
public class UserMetrics {
    
    private final Counter userCreationCounter;
    private final Timer userQueryTimer;
    
    public UserMetrics(MeterRegistry meterRegistry) {
        this.userCreationCounter = Counter.builder("user.creation.total")
                .description("Total number of users created")
                .register(meterRegistry);
        
        this.userQueryTimer = Timer.builder("user.query.duration")
                .description("User query duration")
                .register(meterRegistry);
    }
    
    public void incrementUserCreation() {
        userCreationCounter.increment();
    }
    
    public void recordQueryDuration(Duration duration) {
        userQueryTimer.record(duration);
    }
}
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**: Change the server port in application.yaml
2. **Database Connection**: Ensure MongoDB is running and accessible
3. **Memory Issues**: Increase JVM heap size for large applications
4. **CDI Issues**: Ensure proper CDI annotations are used

### Getting Help

- Check the [GitHub Issues](https://github.com/jaqstack/jaqstack-java/issues)
- Join our [Discord Community](https://discord.gg/jaqstack)
- Read the [Helidon Documentation](https://helidon.io/docs/latest/)
- Read the [FAQ](https://docs.jaqstack.com/faq)

## Next Steps

- [Using Angular](./02-using-angular.md) - Frontend development
- [Using NoSQL](./03-using-nosql.md) - Database integration
- [DevOps](./04-devops.md) - Deployment and operations
