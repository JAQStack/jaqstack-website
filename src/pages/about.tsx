import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SponsorLogos from '../components/SponsorLogos';
import styles from './about.module.css';

export default function About(): JSX.Element {
  return (
    <Layout
      title="About"
      description="Learn about the story behind JAQ Stack and our commitment to open-source development">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            About JAQ Stack
          </Heading>
          <p className="hero__subtitle">
            The story behind our unified tech stack
          </p>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2">
              
              <section className={styles.section}>
                <Heading as="h2">The Story Behind JAQ Stack</Heading>
                <p>
                  JAQ Stack was born out of frustration. As a developer, I found myself repeatedly 
                  setting up three separate tech stacks and boilerplate code for every new project. 
                  The tedious process was slowing me down and taking away from the excitement of 
                  building something new.
                </p>
              </section>

              <section className={styles.section}>
                <Heading as="h2">A Solution Born of Necessity</Heading>
                <p>
                  I decided to take matters into my own hands and create a unified tech stack that 
                  combined the best of Java, JavaScript, and NoSQL. After countless hours of 
                  experimentation and iteration, JAQ Stack was born.
                </p>
              </section>

              <section className={styles.section}>
                <Heading as="h2">Our Commitment</Heading>
                <p>JAQ Stack will always remain:</p>
                <ul className={styles.commitmentList}>
                  <li>
                    <strong>Open-Source</strong> - Free for anyone to use, modify, and distribute.
                  </li>
                  <li>
                    <strong>Community-Driven</strong> - Guided by your feedback, contributions, and needs.
                  </li>
                  <li>
                    <strong>Transparent</strong> - Open development process, transparent decision-making.
                  </li>
                </ul>
              </section>

              <section className={styles.section}>
                <Heading as="h2">Join the Movement</Heading>
                <p>
                  Today, JAQ Stack is more than just a side project. Join me in 
                  revolutionizing web development and making it faster, easier, and more enjoyable 
                  for everyone.
                </p>
                
                <div className={styles.actionGrid}>
                  <div className={styles.actionCard}>
                    <Heading as="h3">Contribute</Heading>
                    <p>Fork our repo, submit pull requests, and shape the future.</p>
                  </div>
                  
                  <div className={styles.actionCard}>
                    <Heading as="h3">Discuss</Heading>
                    <p>Share ideas, ask questions, and collaborate.</p>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <Heading as="h2">Technology Stack</Heading>
                <p>
                  JAQ Stack is built on a modern, proven technology foundation that combines 
                  the best of enterprise Java development with cutting-edge web technologies. 
                  Our stack is designed for scalability, performance, and developer productivity.
                </p>
                <p>
                  From containerization with Docker to our Java backend with Helidon, 
                  Angular frontend, and MongoDB database - every technology choice is 
                  made with the developer experience in mind.
                </p>
                
                <div className={styles.techLogos}>
                  <div className={styles.techLogo}>
                    <img src="/img/sponsors/docker-logo-blue.svg" alt="Docker" />
                    <span>Docker</span>
                  </div>
                  <div className={styles.techLogo}>
                    <img src="/img/sponsors/openjdk-logo.svg" alt="OpenJDK" />
                    <span>OpenJDK</span>
                  </div>
                  <div className={styles.techLogo}>
                    <img src="/img/sponsors/java-logo.svg" alt="Java" />
                    <span>Java</span>
                  </div>
                  <div className={styles.techLogo}>
                    <img src="/img/sponsors/helidon-logo.svg" alt="Helidon" />
                    <span>Helidon</span>
                  </div>
                  <div className={styles.techLogo}>
                    <img src="/img/sponsors/angular-logo.svg" alt="Angular" />
                    <span>Angular</span>
                  </div>
                  <div className={styles.techLogo}>
                    <img src="/img/sponsors/mongodb_green.svg" alt="MongoDB" />
                    <span>MongoDB</span>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <Heading as="h2">License</Heading>
                <p>
                  JAQ Stack is licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>
                </p>
              </section>

              <section className={styles.section}>
                <Heading as="h2">GitHub</Heading>
                <p>
                  <a 
                    href="https://github.com/jaqstack" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button button--primary button--lg"
                  >
                    View on GitHub
                  </a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>
      
    </Layout>
  );
}
