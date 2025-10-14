import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type SponsorItem = {
  name: string;
  logo: string;
  url?: string;
  description?: string;
};

const SponsorList: SponsorItem[] = [
  {
    name: 'Docker',
    logo: '/img/sponsors/docker-logo-blue.svg',
    url: 'https://hub.docker.com/search?q=jaqstack',
    description: 'Sponsored OSS Program'
  },  
  {
    name: 'OpenJDK',
    logo: '/img/sponsors/openjdk-logo.svg',
    url: 'https://openjdk.org',
    description: 'OpenJDK Community'
  },
  {
    name: 'Java',
    logo: '/img/sponsors/java-logo.svg',
    url: 'https://oracle.com/java',
    description: 'Java Programming Language'
  },
  {
    name: 'Helidon',
    logo: '/img/sponsors/helidon-logo.svg',
    url: 'https://helidon.io',
    description: 'Java Framework'
  },
  {
    name: 'Angular',
    logo: '/img/sponsors/angular-logo.svg',
    url: 'https://https://angular.dev',
    description: 'Frontend Framework'
  },
  {
    name: 'MongoDB',
    logo: '/img/sponsors/mongodb_green.svg',
    url: 'https://mongodb.com',
    description: 'NoSQL Database'
  }
];

function SponsorLogo({name, logo, url, description}: SponsorItem) {
  const logoElement = (
    <div className={styles.sponsorLogo}>
      <img 
        src={logo} 
        alt={`${name} logo`}
        className={styles.logoImage}
        loading="lazy"
      />
      {description && (
        <div className={styles.sponsorDescription}>
          {description}
        </div>
      )}
    </div>
  );

  return url ? (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.sponsorLink}
    >
      {logoElement}
    </a>
  ) : logoElement;
}

export default function SponsorLogos(): JSX.Element {
  return (
    <section className={styles.sponsors}>
      <div className="container">
        <div className="text--center">
          <h2 className={styles.sponsorsTitle}>Powered By</h2>
        </div>
        <div className={styles.sponsorsList}>
          {SponsorList.map((sponsor, idx) => (
            <SponsorLogo key={idx} {...sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}
