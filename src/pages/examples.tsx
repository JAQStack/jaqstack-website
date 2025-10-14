import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './examples.module.css';

export default function Examples(): JSX.Element {
  return (
    <Layout
      title="Examples Stacks"
      description="Explore real-world examples and use cases of JAQ Stack implementations">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            Examples Stacks
          </Heading>
          <p className="hero__subtitle">
            Real-world implementations and use cases of JAQ Stack
          </p>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col col--12">
                            
{/*               <section className={styles.section}>
                <Heading as="h2">E-Commerce Platform</Heading>
                <p>
                  A complete e-commerce solution built with JAQ Stack, featuring user authentication, 
                  product catalog, shopping cart, and payment processing.
                </p>
                <div className={styles.stackInfo}>
                  <div className={styles.techStack}>
                    <h4>Tech Stack:</h4>
                    <ul>
                      <li><strong>Backend:</strong> Java Spring Boot with REST APIs</li>
                      <li><strong>Frontend:</strong> Angular with TypeScript</li>
                      <li><strong>Database:</strong> MongoDB for product catalog and user data</li>
                      <li><strong>Authentication:</strong> JWT tokens with Spring Security</li>
                    </ul>
                  </div>
                  <div className={styles.features}>
                    <h4>Key Features:</h4>
                    <ul>
                      <li>User registration and login</li>
                      <li>Product search and filtering</li>
                      <li>Shopping cart management</li>
                      <li>Order processing and tracking</li>
                      <li>Admin dashboard for inventory</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <Heading as="h2">Content Management System</Heading>
                <p>
                  A modern CMS built for content creators, with rich text editing, media management, 
                  and multi-user collaboration features.
                </p>
                <div className={styles.stackInfo}>
                  <div className={styles.techStack}>
                    <h4>Tech Stack:</h4>
                    <ul>
                      <li><strong>Backend:</strong> Java Spring Boot with GraphQL</li>
                      <li><strong>Frontend:</strong> Angular with Material Design</li>
                      <li><strong>Database:</strong> PostgreSQL for structured content</li>
                      <li><strong>Storage:</strong> MongoDB for media metadata</li>
                    </ul>
                  </div>
                  <div className={styles.features}>
                    <h4>Key Features:</h4>
                    <ul>
                      <li>Rich text editor with WYSIWYG</li>
                      <li>Media library with drag-and-drop</li>
                      <li>User roles and permissions</li>
                      <li>Content versioning and history</li>
                      <li>SEO optimization tools</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <Heading as="h2">Analytics Dashboard</Heading>
                <p>
                  A real-time analytics platform for monitoring business metrics, with interactive 
                  charts, custom reports, and automated alerts.
                </p>
                <div className={styles.stackInfo}>
                  <div className={styles.techStack}>
                    <h4>Tech Stack:</h4>
                    <ul>
                      <li><strong>Backend:</strong> Java Spring Boot with WebSocket</li>
                      <li><strong>Frontend:</strong> Angular with Chart.js</li>
                      <li><strong>Database:</strong> MongoDB for time-series data</li>
                      <li><strong>Cache:</strong> Redis for real-time data</li>
                    </ul>
                  </div>
                  <div className={styles.features}>
                    <h4>Key Features:</h4>
                    <ul>
                      <li>Real-time data visualization</li>
                      <li>Custom dashboard creation</li>
                      <li>Automated report generation</li>
                      <li>Alert system with notifications</li>
                      <li>Data export in multiple formats</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <Heading as="h2">Social Media Platform</Heading>
                <p>
                  A social networking application with user profiles, posts, comments, likes, 
                  and real-time messaging capabilities.
                </p>
                <div className={styles.stackInfo}>
                  <div className={styles.techStack}>
                    <h4>Tech Stack:</h4>
                    <ul>
                      <li><strong>Backend:</strong> Java Spring Boot with WebSocket</li>
                      <li><strong>Frontend:</strong> Angular with PWA support</li>
                      <li><strong>Database:</strong> MongoDB for social data</li>
                      <li><strong>Real-time:</strong> WebSocket for messaging</li>
                    </ul>
                  </div>
                  <div className={styles.features}>
                    <h4>Key Features:</h4>
                    <ul>
                      <li>User profiles and connections</li>
                      <li>Post creation with media</li>
                      <li>Real-time messaging</li>
                      <li>Content moderation tools</li>
                      <li>Mobile-responsive design</li>
                    </ul>
                  </div>
                </div>
              </section> */}

              <section className={styles.section}>
                <Heading as="h2">Get Started with Your Own Stack</Heading>
                <p>
                  Ready to build your own application? JAQ Stack provides the foundation you need 
                  to get started quickly with any of these patterns.
                </p>
                
                <div className={styles.actionGrid}>

                  <div className={styles.actionCard}>
                    <Heading as="h3">Basic Authentication</Heading>
                    <p>Complete authentication system with user management, JWT tokens, and MongoDB integration. Features:
                      User registration and login, 
                      JWT token-based authentication,
                      MongoDB integration,
                      Angular authentication, 
                      RESTful API endpoints.
                    </p>                      
                    <a href="https://github.com/JAQStack/jaqstack-examples/tree/main/examples/basicauthentication" target="_blank" rel="noopener noreferrer" className="button button--primary">View Code</a>
                  </div>

                  <div className={styles.actionCard}>
                    <Heading as="h3">Docker Ready Examples</Heading>
                    <p>Explore examples that are ready to run with Docker.</p>
                    <a href="https://hub.docker.com/r/jaqstack/jaqstack-examples" target="_blank" rel="noopener noreferrer" className="button button--primary">Examples on Docker Hub</a>
                  </div>

                  <div className={styles.actionCard}>
                    <Heading as="h3">More Community Examples</Heading>
                    <p>Explore examples shared by the JAQ Stack community.</p>
                    <a href="https://github.com/JAQStack/jaqstack-examples" target="_blank" rel="noopener noreferrer" className="button button--primary">Examples on Github</a>
                  </div>

{/*                      
                   <div className={styles.actionCard}>
                    <Heading as="h3">Custom Implementation</Heading>
                    <p>Build from scratch using JAQ Stack components.</p>
                    <a href="/docs/intro" className="button button--secondary">View Documentation</a>
                  </div>                  
 */}                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
