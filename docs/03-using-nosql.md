# Using NoSQL

Learn how to use NoSQL databases in the JAQ Stack ecosystem for flexible and scalable data storage.

## Overview

NoSQL databases provide the data persistence layer for JAQ Stack, offering flexibility, scalability, and performance for modern applications.

## Supported Databases

JAQ Stack supports multiple NoSQL databases:

- **MongoDB** - Document database (Primary)
- **CouchDB** - Document database
- **Redis** - Key-value store
- **Cassandra** - Wide-column store

## Getting Started

### Prerequisites

- Docker (recommended)
- Java 17+ (for Spring Boot integration)
- Node.js 18+ (for JavaScript/TypeScript integration)

### Installation

#### Using Docker (Recommended)

```bash
# MongoDB
docker run -d --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Redis
docker run -d --name redis \
  -p 6379:6379 \
  redis:latest

# CouchDB
docker run -d --name couchdb \
  -p 5984:5984 \
  -e COUCHDB_USER=admin \
  -e COUCHDB_PASSWORD=password \
  couchdb:latest
```

#### Manual Installation

```bash
# MongoDB (Ubuntu/Debian)
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Redis (Ubuntu/Debian)
sudo apt update
sudo apt install redis-server
```

## Configuration

### Spring Boot Configuration

```properties
# application.properties
# MongoDB Configuration
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=jaqstack
spring.data.mongodb.username=admin
spring.data.mongodb.password=password
spring.data.mongodb.authentication-database=admin

# Redis Configuration
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=
spring.redis.timeout=2000ms
spring.redis.jedis.pool.max-active=8
spring.redis.jedis.pool.max-idle=8
spring.redis.jedis.pool.min-idle=0
```

### Java Configuration

```java
// MongoDB Configuration
@Configuration
@EnableMongoRepositories
public class MongoConfig {
    
    @Value("${spring.data.mongodb.host}")
    private String host;
    
    @Value("${spring.data.mongodb.port}")
    private int port;
    
    @Value("${spring.data.mongodb.database}")
    private String database;
    
    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(
            MongoClientSettings.builder()
                .applyToClusterSettings(builder -> 
                    builder.hosts(Arrays.asList(new ServerAddress(host, port))))
                .build()
        );
    }
    
    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), database);
    }
}
```

## Data Models

### Document Structure

```java
// User Document
@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    @Field("name")
    private String name;
    
    @Field("email")
    private String email;
    
    @Field("profile")
    private UserProfile profile;
    
    @Field("created_at")
    private LocalDateTime createdAt;
    
    @Field("updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors, getters, setters
}

// Embedded Document
@Document
public class UserProfile {
    private String bio;
    private String avatar;
    private List<String> skills;
    private Map<String, Object> preferences;
}
```

### Repository Pattern

```java
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    // Custom query methods
    List<User> findByNameContainingIgnoreCase(String name);
    
    List<User> findByEmail(String email);
    
    @Query("{ 'profile.skills': { $in: ?0 } }")
    List<User> findBySkillsIn(List<String> skills);
    
    @Query("{ 'created_at': { $gte: ?0, $lte: ?1 } }")
    List<User> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    // Aggregation queries
    @Aggregation("{ $group: { _id: '$role', count: { $sum: 1 } } }")
    List<RoleCount> countUsersByRole();
}
```

## Best Practices

### Data Modeling

1. **Denormalization**: Store related data together for better performance
2. **Embedding vs Referencing**: Embed for 1:1 or 1:few relationships
3. **Indexing**: Create indexes on frequently queried fields
4. **Schema Design**: Design for your query patterns

### Performance Optimization

```java
// Index Configuration
@Document(collection = "users")
@CompoundIndex(def = "{'name': 1, 'email': 1}")
@CompoundIndex(def = "{'created_at': -1}")
public class User {
    // Document fields
}

// Query Optimization
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> findUsersOptimized(String name) {
        // Use projection to limit returned fields
        Query query = new Query();
        query.addCriteria(Criteria.where("name").regex(name, "i"));
        query.fields().include("name", "email", "profile.avatar");
        
        return mongoTemplate.find(query, User.class);
    }
}
```

## Caching with Redis

```java
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setDefaultSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }
    
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
        
        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(config)
            .build();
    }
}

// Using Cache
@Service
public class UserService {
    
    @Cacheable(value = "users", key = "#id")
    public User findById(String id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
    
    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
```

## Data Migration

```java
@Component
public class DataMigrationService {
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        migrateUserData();
    }
    
    private void migrateUserData() {
        // Example migration: Add new field to existing documents
        Query query = new Query();
        Update update = new Update().set("migrated", true);
        
        UpdateResult result = mongoTemplate.updateMulti(query, update, User.class);
        log.info("Migrated {} user documents", result.getModifiedCount());
    }
}
```

## Monitoring and Maintenance

### Health Checks

```java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @Override
    public Health health() {
        try {
            mongoTemplate.getCollection("users").countDocuments();
            return Health.up()
                .withDetail("database", "MongoDB")
                .withDetail("status", "Connected")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("database", "MongoDB")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

### Backup and Restore

```bash
# MongoDB Backup
mongodump --host localhost:27017 --db jaqstack --out /backup/jaqstack

# MongoDB Restore
mongorestore --host localhost:27017 --db jaqstack /backup/jaqstack

# Redis Backup
redis-cli BGSAVE
```

## Troubleshooting

### Common Issues

1. **Connection Timeout**: Check network connectivity and firewall settings
2. **Memory Usage**: Monitor memory consumption and adjust cache settings
3. **Index Performance**: Analyze slow queries and optimize indexes
4. **Data Consistency**: Implement proper transaction handling

### Performance Monitoring

```java
@Component
public class DatabaseMetrics {
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @Scheduled(fixedRate = 60000) // Every minute
    public void collectMetrics() {
        // Collect database metrics
        Document stats = mongoTemplate.getDb().runCommand(new Document("dbStats", 1));
        log.info("Database stats: {}", stats);
    }
}
```

## Getting Help

- Check the [GitHub Issues](https://github.com/jaqstack/jaqstack-nosql/issues)
- Join our [Discord Community](https://discord.gg/jaqstack)
- Read the [MongoDB Documentation](https://docs.mongodb.com/)
- Read the [Redis Documentation](https://redis.io/documentation)

## Next Steps

- [Using Java](./01-using-java.md) - Backend integration
- [Using Angular](./02-using-angular.md) - Frontend development
- [DevOps](./04-devops.md) - Deployment and operations
