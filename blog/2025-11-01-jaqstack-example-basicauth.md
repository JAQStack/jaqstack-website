---
slug: jaqstack-example-basic-auth
title: Basic Authentication
authors: [jaqstack]
tags: [welcome, docusaurus, typescript]
---

# Implementing JWT Authentication with the JAQ Stack

*Published: November 2025*

Authentication is one of the most critical aspects of any web application. In this blog post, I'll walk you through building a secure authentication system using the **JAQ Stack** - Java, Angular, Jersey, and MongoDB - with JSON Web Tokens (JWT) as the authentication mechanism.

## Why JWT Authentication?

Before diving into the implementation, let's understand why JWT is an excellent choice for modern web applications:

- **Stateless**: No need to store session data on the server
- **Scalable**: Works seamlessly across multiple servers
- **Secure**: Tokens are cryptographically signed
- **Standard**: Based on RFC 7519, widely supported
- **Flexible**: Can contain custom claims and user information

## Technology Stack

Our authentication system is built with:

- **Java 8**: Enterprise-grade reliability with proven stability
- **Jersey 2.26**: JAX-RS reference implementation for RESTful services
- **Angular 5**: Modern frontend framework with excellent tooling
- **MongoDB 3.9.1**: NoSQL database perfect for user management
- **JJWT 0.10.5**: Java library for creating and parsing JWTs
- **Weld 3.0.5**: CDI implementation for dependency injection
- **Tomcat**: Servlet container for WAR deployment

## Architecture Overview

The authentication system follows a clean, layered architecture:

```
┌─────────────────────────────────────┐
│   Angular 5 Frontend (Port 4200)   │
│  - Login Component                  │
│  - Registration Component          │
│  - Auth Service                     │
└──────────────┬──────────────────────┘
               │ HTTP/REST + JWT
               │
┌──────────────▼──────────────────────┐
│   Jersey REST API (Port 8080)       │
│  - Login Resource (/auth/login)     │
│  - Register Resource (/auth/register)│
│  - User Resource (/auth/users)      │
│  - JWT Token Service                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         MongoDB Database              │
│  - Database: jaqstack                │
│  - Collection: users                 │
└──────────────────────────────────────┘
```

## Backend Implementation

### JWT Token Service

The heart of our authentication system is the `AuthenticationTokenService`, which handles JWT creation:

```java
@RequestScoped
public class AuthenticationTokenService implements Serializable {

    public String issueToken(String username) {
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String jws = Jwts.builder()
            .setSubject(username)
            .signWith(key)
            .compact();
        return jws;
    }
}
```

**Key Points:**
- Uses HS256 (HMAC-SHA256) algorithm for signing
- Generates a secure random key for each token
- Sets the username as the subject claim
- Returns a compact JWT string

### Authentication Resource

The `Login` resource class handles authentication endpoints:

```java
@Path("/auth")
@RequestScoped
public class Login {

    @Inject
    AuthenticationTokenService authenticationTokenService;

    @Inject
    UserService userService;

    @POST
    @Path("/login")
    @PermitAll
    public Response authenticate(UserCredentials userCredentials) {
        // Validate credentials against database
        User user = userService.validateCredentials(userCredentials);
        
        // Issue JWT token
        String token = authenticationTokenService.issueToken(userCredentials.getUsername());
        
        AuthenticationToken authenticationToken = new AuthenticationToken();
        authenticationToken.setToken(token);
        
        return Response.ok(authenticationToken).build();
    }

    @POST
    @Path("/register")
    public Response registerUser(User user) {
        String message = userService.addUser(user);
        return Response.ok(message).build();
    }

    @GET
    @Path("/users")
    public Response getAllUsers() {
        List<User> users = userService.allUsers();
        return Response.ok(users).build();
    }
}
```

### User Validation

The `UserService` handles user validation logic:

```java
@ApplicationScoped
public class UserService implements Serializable {

    @Inject
    DataService dataService;

    public User validateCredentials(UserCredentials userCredentials) {
        User user = findUser(userCredentials);

        if (user == null) {
            throw new AuthenticationException("Bad credentials.");
        }

        return user;
    }

    private User findUser(UserCredentials userCredentials) {
        return dataService.findUsernamePassword(userCredentials);
    }
}
```

**Security Considerations:**
- Throws `AuthenticationException` for invalid credentials
- Does not reveal whether username or password is incorrect (security best practice)
- Uses CDI for dependency injection

### MongoDB Integration

User data is stored in MongoDB using the `DataService`:

```java
@ApplicationScoped
public class DataService implements Serializable {

    public User findUsernamePassword(UserCredentials userCredentials) {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase database = mongoClient.getDatabase("jaqstack");
        MongoCollection<Document> collection = database.getCollection("users");

        BasicDBObject query = new BasicDBObject("username", userCredentials.getUsername())
            .append("password", userCredentials.getPassword());

        Document doc = collection.find(query).first();
        
        if (doc == null) {
            mongoClient.close();
            return null;
        }

        User user = new User();
        user.setUsername(doc.getString("username"));
        user.setPassword(doc.getString("password"));
        // ... map other fields
        
        mongoClient.close();
        return user;
    }

    public String addUser(User user) {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase database = mongoClient.getDatabase("jaqstack");
        MongoCollection<Document> collection = database.getCollection("users");

        Document doc = new Document("username", user.getUsername())
            .append("password", user.getPassword())
            .append("firstname", user.getFirstname())
            .append("lastname", user.getLastname());

        collection.insertOne(doc);
        mongoClient.close();
        
        return "User " + user.getFirstname() + " added successfully.";
    }
}
```

## Frontend Implementation

### Authentication Service

The Angular frontend uses a service to handle authentication:

```typescript
@Injectable()
export class AuthService {
  private baseUrl: string = environment.BACKEND_URL + "/service/auth";

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
```

### Token Storage

After successful login, the JWT token should be stored securely:

```typescript
login(credentials: any): void {
  this.authService.login(credentials).subscribe(
    (response) => {
      // Store token in localStorage or sessionStorage
      localStorage.setItem('authToken', response.token);
      // Redirect to protected area
    },
    (error) => {
      console.error('Login failed:', error);
    }
  );
}
```

## Security Best Practices

### 1. Password Storage

**Important**: In production, never store passwords in plain text! Always use password hashing:

```java
// Production-ready approach (not implemented in this example)
import org.mindrot.jbcrypt.BCrypt;

public String hashPassword(String plainPassword) {
    return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
}

public boolean checkPassword(String plainPassword, String hashedPassword) {
    return BCrypt.checkpw(plainPassword, hashedPassword);
}
```

### 2. JWT Secret Key Management

The current implementation generates a new key for each token. In production:

- Use a fixed, secure secret key stored in configuration
- Rotate keys periodically
- Never commit keys to version control

```java
// Production approach
@ApplicationScoped
public class AuthenticationTokenService {
    private static final String SECRET_KEY = System.getenv("JWT_SECRET_KEY");
    private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String issueToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
            .signWith(key)
            .compact();
    }
}
```

### 3. Token Expiration

Always set expiration times on tokens:

```java
Date expiration = new Date(System.currentTimeMillis() + 3600000); // 1 hour
String jws = Jwts.builder()
    .setSubject(username)
    .setExpiration(expiration)
    .signWith(key)
    .compact();
```

### 4. HTTPS Only

In production, always use HTTPS to prevent token interception:
- Configure Tomcat for SSL/TLS
- Use reverse proxy (nginx, Apache) with SSL certificates
- Set secure cookie flags if storing tokens in cookies

## CDI and Dependency Injection

The application uses CDI (Contexts and Dependency Injection) with Weld:

```java
// beans.xml configuration
<beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       bean-discovery-mode="all">
</beans>
```

**Benefits:**
- Loose coupling between components
- Easy testing with mock objects
- Lifecycle management (@ApplicationScoped, @RequestScoped)
- Interceptor support for cross-cutting concerns

## Deployment Architecture

### WAR Deployment

The application is packaged as a WAR file for deployment to Tomcat:

```xml
<packaging>war</packaging>
```

**Build Process:**
1. Compile Java sources
2. Build Angular frontend
3. Copy Angular dist to WAR resources
4. Package everything into `basicauth.war`

### Tomcat Configuration

The application uses Tomcat's servlet container with:
- Jersey servlet for REST endpoints
- Weld listener for CDI
- CORS filter for cross-origin requests

## API Endpoints

### Authentication Endpoints

1. **POST** `/basicauth/service/auth/login`
   - Authenticates user and returns JWT token
   - Request: `{"username":"user", "password":"pass"}`
   - Response: `{"token":"eyJhbGciOiJIUzI1NiJ9..."}`

2. **POST** `/basicauth/service/auth/register`
   - Registers a new user
   - Request: `{"username":"user", "password":"pass", "firstname":"John", "lastname":"Doe"}`
   - Response: `"User John added successfully."`

3. **GET** `/basicauth/service/auth/users`
   - Retrieves all users (should be protected in production)
   - Response: `[{"username":"user1", ...}, {"username":"user2", ...}]`

## Frontend Integration

### Login Flow

1. User enters credentials in Angular form
2. Frontend sends POST request to `/auth/login`
3. Backend validates credentials against MongoDB
4. Backend generates JWT token
5. Frontend stores token (localStorage/sessionStorage)
6. Frontend includes token in subsequent requests

### Protected Routes

To protect routes in Angular, implement a route guard:

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    }
    // Redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
```

## Testing the Authentication System

### Manual Testing with cURL

**Register a User:**
```bash
curl -X POST http://localhost:8080/basicauth/service/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123","firstname":"Test","lastname":"User"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/basicauth/service/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

**Use Token in Requests:**
```bash
curl -X GET http://localhost:8080/basicauth/service/auth/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Challenges and Solutions

### Challenge 1: CORS Configuration

**Problem**: Angular app on port 4200 couldn't access backend on port 8080.

**Solution**: Configured CORS filter in `web.xml`:
```xml
<filter>
    <filter-name>CorsFilter</filter-name>
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    <init-param>
        <param-name>cors.allowed.origins</param-name>
        <param-value>*</param-value>
    </init-param>
</filter>
```

### Challenge 2: CDI Discovery

**Problem**: Weld wasn't discovering CDI beans.

**Solution**: 
- Added `beans.xml` with `bean-discovery-mode="all"`
- Configured Weld listener in `web.xml`
- Used proper CDI annotations (@ApplicationScoped, @RequestScoped)

### Challenge 3: Jersey Auto-Discovery

**Problem**: REST endpoints weren't being discovered.

**Solution**: 
- Configured Jersey servlet in `web.xml`
- Used package scanning for JAX-RS resources
- Ensured proper annotations (@Path, @GET, @POST)

## Production Considerations

### 1. Password Hashing

**Critical**: Implement password hashing before production deployment:
- Use BCrypt or Argon2
- Never store plain text passwords
- Implement password strength requirements

### 2. Token Validation

Implement token validation middleware:
```java
@Provider
public class JwtFilter implements ContainerRequestFilter {
    @Override
    public void filter(ContainerRequestContext requestContext) {
        // Extract token from Authorization header
        // Validate token signature and expiration
        // Set user context
    }
}
```

### 3. Rate Limiting

Implement rate limiting to prevent brute force attacks:
- Limit login attempts per IP
- Implement exponential backoff
- Use Redis for distributed rate limiting

### 4. Logging and Monitoring

- Log authentication attempts (success and failure)
- Monitor for suspicious patterns
- Set up alerts for multiple failed login attempts

## Lessons Learned

### What Worked Well

1. **JWT Simplicity**: JWT tokens are easy to implement and understand
2. **CDI Integration**: Dependency injection made the code clean and testable
3. **MongoDB Flexibility**: Easy to add new user fields without migrations
4. **Jersey REST**: Clean REST API implementation with JAX-RS

### Areas for Improvement

1. **Password Security**: Need to implement password hashing
2. **Token Refresh**: Should implement refresh token mechanism
3. **Role-Based Access**: Add role-based authorization
4. **Token Revocation**: Implement token blacklisting for logout

## Future Enhancements

1. **OAuth2 Integration**: Support for social login (Google, GitHub, etc.)
2. **Multi-Factor Authentication**: Add 2FA support
3. **Password Reset**: Implement password reset flow with email
4. **Account Lockout**: Lock accounts after multiple failed attempts
5. **Session Management**: Track active sessions and allow logout from all devices
6. **Audit Logging**: Comprehensive audit trail for security events

## Conclusion

Building a JWT-based authentication system with the JAQ Stack has been a valuable learning experience. The combination of Java, Jersey, Angular, and MongoDB provides a solid foundation for secure authentication.

**Key Takeaways:**
- JWT provides a stateless, scalable authentication mechanism
- CDI makes the codebase maintainable and testable
- MongoDB's flexibility is perfect for user management
- Security must be considered at every layer

While this implementation provides a good starting point, remember that security is an ongoing process. Always:
- Keep dependencies updated
- Follow security best practices
- Conduct regular security audits
- Stay informed about new vulnerabilities

## Resources

- [JWT.io](https://jwt.io/) - JWT debugger and information
- [JJWT Documentation](https://github.com/jwtk/jjwt)
- [Jersey Documentation](https://eclipse-ee4j.github.io/jersey/)
- [Angular Security Guide](https://angular.io/guide/security)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

*This blog post was written as part of the Basic Authentication application demonstration. The complete source code is available in the repository.*

**Built with JAQ Stack - Java 8, Jersey 2.26, Angular 5, MongoDB 3.9.1, JWT (JJWT 0.10.5)**

## References

- [Basic Authentication Example - GitHub Repository](https://github.com/JAQStack/jaqstack-examples/tree/main/examples/basicauthentication)

