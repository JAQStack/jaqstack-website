import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rapid by Design',
    Svg: require('@site/static/img/discovery.svg').default,
    description: (
      <>
        Pre-built archetypes slash boilerplate setup time.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/focus.svg').default,
    description: (
      <>
        Focus on your features, and we&apos;ll do the chores.
      </>
    ),
  },
  {
    title: 'Modular & Extensible',
    Svg: require('@site/static/img/system.svg').default,
    description: (
      <>
        Swap DBs, frontends, or cloud targets.
      </>
    ),
  },
  {
    title: 'AI-Ready',
    Svg: require('@site/static/img/ai-ready3.svg').default,
    description: (
      <>
        drop-in LLM connectors, retrieval layers, and prompt versioning via Helidon MCP.
      </>
    ),
  },
  {
    title: 'Community Driven',
    Svg: require('@site/static/img/people.svg').default,
    description: (
      <>
        maintained by developers for developers.
      </>
    ),
  },
  {
    title: 'Open Source Forever',
    Svg: require('@site/static/img/community.svg').default,
    description: (
      <>
        transparent code, MIT license, no black boxes.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.featuresTitle}>
            Not Another Framework!
          </Heading>
          <p className={styles.featuresSubtitle}>
          It removes the pain of wiring up the frontend, backend, and databases, giving you a ready-to-run foundation. Focus on building features, not boilerplate. JAQ Stack handles the integration so your team can move from idea to prototype in days, not weeks..
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
