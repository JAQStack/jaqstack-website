---
slug: jaqstack-example-simple-blog
title: Simple Blog
authors: [jaqstack]
tags: [welcome, docusaurus, typescript]
---

# Building a Modern Blog Application with the JAQ Stack

*Published: November 2025*

As a developer who has worked with countless technology stacks over the years, I'm always on the lookout for combinations that offer the perfect balance of performance, developer experience, and modern best practices. Recently, I embarked on a journey to build a simple blog application using what I've come to call the **JAQ Stack** - Java, Angular, Helidon, and MongoDB. The results were impressive, and I'd like to share my experience with you.

## Why the JAQ Stack?

Before diving into the implementation details, let me explain why I chose this particular combination:

- **Java 21**: With its modern features like virtual threads, pattern matching, and record classes, Java 21 brings enterprise-grade reliability with cutting-edge capabilities
- **Helidon MP 4.3.1**: A lightweight, cloud-native MicroProfile implementation that starts fast and runs efficiently
- **Angular 20.0.0**: The latest version of Angular brings improved performance, better developer experience, and enhanced type safety
- **MongoDB 3.9.1**: A NoSQL database that's perfect for document-based applications like blogs

Together, these technologies form a stack that's both powerful and pragmatic.

## Architecture Overview

The Simple Blog application follows a clean, layered architecture:

```
┌─────────────────────────────────────┐
│     Angular 20 Frontend (Port 4200) │
│  - Home Component                   │
│  - Blog Detail Component            │
│  - Blog Service                     │
└──────────────┬──────────────────────┘
               │ HTTP/REST
               │
┌──────────────▼──────────────────────┐
│   Helidon MP Backend (Port 8080)    │
│  - BlogResource (REST Endpoints)    │
│  - BlogService (Business Logic)     │
│  - DataService (Data Access)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         MongoDB Database              │
│  - Database: jaqstack                │
│  - Collection: blogposts            │
└──────────────────────────────────────┘
```

## Backend Implementation with Helidon MP

### Setting Up Helidon MP

Helidon MP makes it incredibly easy to create RESTful services. The setup is straightforward:

```xml
<parent>
    <groupId>io.helidon.applications</groupId>
    <artifactId>helidon-mp</artifactId>
    <version>4.3.1</version>
</parent>
```

With just this parent POM, you get a complete MicroProfile implementation including:
- JAX-RS for REST APIs
- CDI for dependency injection
- Config for configuration management
- Health checks and metrics

### Creating REST Endpoints

The blog API is implemented using JAX-RS resources. Here's a simplified version of our `BlogResource`:

```java
@Path("/blog")
@RequestScoped
public class BlogResource {
    
    private final BlogService blogService;
    
    @Inject
    public BlogResource(BlogService blogService) {
        this.blogService = blogService;
    }
    
    @GET
    @Path("/posts")
    public Response getAllBlogPosts() {
        List<BlogPost> blogPosts = blogService.getAllBlogPosts();
        return addCorsHeaders(Response.ok(blogPosts));
    }
    
    @POST
    @Path("/post")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBlogPost(BlogPost blogPost) {
        String message = blogService.addBlogPost(blogPost);
        Message responseMessage = new Message(message);
        return addCorsHeaders(Response.ok(responseMessage));
    }
}
```

### Handling CORS

One challenge when building full-stack applications is Cross-Origin Resource Sharing (CORS). Since our Angular frontend runs on port 4200 and the backend on port 8080, we need to handle CORS properly.

I implemented a helper method to add CORS headers to all responses:

```java
private Response addCorsHeaders(Response.ResponseBuilder response) {
    return response
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        .header("Access-Control-Max-Age", "3600")
        .build();
}
```

Additionally, I added OPTIONS handlers for preflight requests, which are essential for browsers to make cross-origin requests.

### MongoDB Integration

The MongoDB integration is clean and straightforward. Using the MongoDB Java Driver 3.9.1, we can easily perform CRUD operations:

```java
@ApplicationScoped
public class DataService {
    
    public List<BlogPost> getAllBlogPosts() {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase database = mongoClient.getDatabase("jaqstack");
        MongoCollection<Document> collection = database.getCollection("blogposts");
        
        List<Document> documents = collection.find().into(new ArrayList<>());
        // Convert documents to BlogPost objects
        // ...
        
        mongoClient.close();
        return blogPostsList;
    }
}
```

The document-based nature of MongoDB makes it perfect for blog posts, where each post can have varying structures without schema migrations.

## Frontend Implementation with Angular 20

### Why Angular 20?

Angular 20 represents a significant leap forward in the framework's evolution. Key improvements include:

- **Better Performance**: Improved change detection and rendering
- **Enhanced Type Safety**: Stricter type checking and better IDE support
- **Modern JavaScript**: Support for ES2022 features
- **Improved Developer Experience**: Better error messages and debugging tools

### Component Architecture

The Angular application follows a simple but effective component structure:

```
app/
├── app.component.*          # Root component with footer
├── home/                    # Home page with blog list
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.css
├── blog-detail/            # Individual blog post view
│   ├── blog-detail.component.ts
│   ├── blog-detail.component.html
│   └── blog-detail.component.css
└── blog.service.ts         # API communication service
```

### Service Layer

The `BlogService` handles all communication with the backend:

```typescript
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl: string = environment.BACKEND_URL + "/blog";

  constructor(private http: HttpClient) { }

  getAllBlogPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  getBlogPostById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/post/${id}`);
  }

  createBlogPost(blogPost: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, blogPost);
  }
}
```

Using RxJS Observables provides a reactive approach to handling asynchronous operations, making the code more maintainable and testable.

### Routing

Angular's router makes navigation seamless:

```typescript
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/:id', component: BlogDetailComponent }
];
```

The route parameters allow us to easily pass blog post IDs to the detail component.

## Development Experience

### Hot Reloading

One of the best parts of this stack is the development experience. Both Angular and Helidon support hot reloading:

- **Angular**: `ng serve` provides instant feedback on code changes
- **Helidon**: With proper IDE configuration, you can debug and see changes immediately

### Build Process

The build process is streamlined:

1. **Backend**: `mvn package` creates an executable JAR with all dependencies
2. **Frontend**: `ng build` creates optimized production bundles
3. **Integration**: Maven automatically copies the Angular build into the JAR

This means you can deploy a single JAR file that contains both the backend and frontend!

## Performance Considerations

### Backend Performance

Helidon MP is known for its excellent performance characteristics:

- **Fast Startup**: The server starts in under 3 seconds
- **Low Memory Footprint**: Minimal overhead compared to traditional application servers
- **High Throughput**: Efficient handling of concurrent requests

### Frontend Performance

Angular 20's improvements shine in production:

- **Tree Shaking**: Unused code is eliminated during build
- **Lazy Loading**: Components can be loaded on demand
- **AOT Compilation**: Templates are compiled ahead of time for better performance

## Lessons Learned

### What Worked Well

1. **Helidon's Simplicity**: The framework gets out of your way and lets you focus on business logic
2. **Angular's Type Safety**: TypeScript caught many errors at compile time
3. **MongoDB's Flexibility**: No schema migrations needed when adding new fields
4. **CORS Handling**: Once properly configured, cross-origin requests work seamlessly

### Challenges Overcome

1. **CORS Preflight Requests**: Initially struggled with OPTIONS requests, but adding explicit handlers solved it
2. **Angular Version Compatibility**: Upgraded from Angular 5 to Angular 20 for Node.js v22 compatibility
3. **Build Integration**: Ensuring the Angular build is properly included in the JAR required careful Maven configuration

## Best Practices Applied

1. **Separation of Concerns**: Clear separation between presentation, business logic, and data access
2. **Dependency Injection**: Using CDI in the backend and Angular's DI in the frontend
3. **Error Handling**: Proper error responses and user-friendly error messages
4. **Code Organization**: Logical package structure and component organization

## Future Enhancements

While the current implementation is functional, there are several enhancements I'm considering:

1. **Authentication**: Add user authentication and authorization
2. **Comments**: Allow users to comment on blog posts
3. **Search**: Implement full-text search for blog posts
4. **Categories/Tags**: Add categorization and tagging functionality
5. **Rich Text Editor**: Integrate a WYSIWYG editor for content creation
6. **Image Upload**: Support for image uploads and management
7. **Pagination**: Implement pagination for the blog post list
8. **Caching**: Add Redis for caching frequently accessed posts

## Conclusion

Building the Simple Blog application with the JAQ Stack has been an enlightening experience. The combination of Java 21, Helidon MP, Angular 20, and MongoDB provides a modern, efficient, and developer-friendly stack for building web applications.

The stack offers:
- **Performance**: Fast startup and efficient runtime
- **Developer Experience**: Great tooling and hot reloading
- **Scalability**: Can easily scale both horizontally and vertically
- **Maintainability**: Clean architecture and separation of concerns

Whether you're building a simple blog or a complex enterprise application, the JAQ Stack provides a solid foundation that balances modern best practices with proven technologies.

## Resources

- [Helidon Documentation](https://helidon.io/docs/latest/)
- [Angular Documentation](https://angular.io/docs)
- [MongoDB Java Driver](https://www.mongodb.com/docs/drivers/java/)
- [MicroProfile Specification](https://microprofile.io/)

---

*This blog post was written as part of the Simple Blog application demonstration. The complete source code is available in the repository.*

**Built with JAQ Stack - Java 21, Helidon MP 4.3.1, Angular 20.0.0, MongoDB 3.9.1**

## References

- [Simple Blog Example - GitHub Repository](https://github.com/JAQStack/jaqstack-examples/tree/main/examples/simpleblog)

