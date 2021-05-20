import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Why?',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
       There are tons of frameworks but plugging them all togethe becomes complicated. Either we get a frontend or backend only stacks. For example Angular, React do not have a backend, while Java Spring, Helidon do not have frontends.
      </>
    ),
  },
  {
    title: 'What?',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        JAQ Stack is not a Framework, instead is a tech stack built on top of robust / sophisticated frameworks, technologies and programming languages. To start with we have a JAQ Stack with Angular, Java/Helidon and MongoDB.        
      </>
    ),
  },
  {
    title: 'How?',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Clone any stack you like from our Github repos and start building your site. Our stacks are pre-built with web applications including all the basic wiring (frontend, bacend, api's), common features, including calls to a data store.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
