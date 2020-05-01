import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const Content = ({ buildTime }) => (
  <>
    <p>
      Last built {buildTime}
    </p>
    <p>
      Framework created and devloped by <strong><a hre="https://twitter.com/surenkonathala" target="_blank">Suren</a></strong>.
    </p>    
  </>
);

const links = {
  firstCol: [
    { href: 'https://ibm.com/design', linkText: 'Docs' },
    { href: 'https://ibm.com/design', linkText: 'Examples' },
    { href: 'https://ibm.com/design', linkText: 'Sites built with JAQ Stack' },
    { href: 'https://ibm.com/design', linkText: 'Disclaimer' },
  ],
  secondCol: [
    { href: 'https://ibm.com/design', linkText: 'Twitter' },
    { href: 'https://ibm.com/design', linkText: 'LinkedIn' },
    { href: 'https://ibm.com/design', linkText: 'Github' },
  ],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;
