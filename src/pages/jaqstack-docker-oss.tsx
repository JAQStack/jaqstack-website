import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function JaqstackDockerOss(): JSX.Element {
  return (
    <Layout
      title="JAQ Stack × Docker Sponsored OSS"
      description="JAQ Stack has been officially accepted into Docker's Sponsored Open Source Program."
    >
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <Heading as="h1">🐳 JAQ Stack × Docker Sponsored OSS</Heading>
              <p>
                We’re thrilled to announce that <strong>JAQ Stack</strong> has been officially
                accepted into the{" "}
                <a
                  href="https://www.docker.com/community/open-source/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker-Sponsored Open Source Program
                </a>
                !
              </p>
              <p>
                This recognition highlights JAQ Stack’s commitment to open-source development and
                ensures that developers worldwide can easily access ready-to-run images and
                examples.
              </p>

              <Heading as="h2">🚀 What This Means</Heading>
              <ul>
                <li>✅ Free Docker Team subscription for the JAQ Stack organization</li>
                <li>🧩 Docker Scout insights for image security and dependencies</li>
                <li>⚙️ Free autobuilds for image publishing</li>
                <li>📦 Rate-limit removal for all users pulling public images</li>
                <li>🏷️ Official open-source badging on Docker Hub</li>
              </ul>

              <Heading as="h2">🐳 Docker Hub</Heading>
              <p>
                You can find our published and example images here:
              </p>
              <ul>
                <li>
                  Main Organization:{" "}
                  <a
                    href="https://hub.docker.com/u/jaqstack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    hub.docker.com/u/jaqstack
                  </a>
                </li>
                <li>
                  Examples Repository:{" "}
                  <a
                    href="https://hub.docker.com/r/jaqstack/jaqstack-examples"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    jaqstack/jaqstack-examples
                  </a>
                </li>
              </ul>
              <p>
                These images are designed for quick starts, demos, and workshops — giving developers
                a frictionless way to explore JAQ Stack in action.
              </p>

              <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <img
                  src="/img/sponsors/jaqstak-docker-sponsored-oss.png"
                  alt="JAQ Stack is part of the Docker Sponsored OSS Program"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                  loading="lazy"
                />
              </div>

              <Heading as="h2">💡 Why It Matters</Heading>
              <p>
                Docker’s support allows us to build and share our stack more efficiently, keeping it
                <strong> free, secure, and accessible</strong> to everyone. With automated builds and
                rate-limit-free pulls, the community can now use JAQ Stack containers without
                interruption.
              </p>
              <p>
                This sponsorship helps maintain the vision:{" "}
                <em>
                  “Build once, extend forever — making web development faster, simpler, and open to
                  all.”
                </em>
              </p>

              <Heading as="h2">🙌 Thank You</Heading>
              <p>
                Huge thanks to <strong>Docker</strong> for recognizing JAQ Stack as part of its
                open-source ecosystem, and to our community for the continuous contributions and
                feedback that make this project thrive.
              </p>

              <p>
                <a
                  href="https://github.com/orgs/JAQStack/discussions"
                  className="button button--primary margin-top--md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Discussion on GitHub
                </a>
              </p>

              <hr />

              <p style={{ textAlign: "center", marginTop: "2rem", fontWeight: 500 }}>
                ⏱️ Build Fast. Scale Smart. — Proudly part of the{" "}
                <a
                  href="https://www.docker.com/community/open-source/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker-Sponsored Open Source Program
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
