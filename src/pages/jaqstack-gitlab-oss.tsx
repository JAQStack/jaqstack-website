import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

export default function JaqstackGitLabSupported() {
  return (
    <Layout
      title="JAQ Stack × GitLab Supported Open Source"
      description="JAQ Stack is officially recognized as a GitLab Supported Open Source project, gaining access to GitLab Ultimate and enhanced DevSecOps capabilities."
    >
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <Heading as="h1">🦊 JAQ Stack × GitLab Supported Open Source</Heading>
              <p>
                We’re proud to announce that <strong>JAQ Stack</strong> has been officially accepted into the{" "}
                <a
                  href="https://about.gitlab.com/solutions/open-source/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitLab Supported Open Source Program
                </a>
                !
              </p>
              <p>
                This recognition reinforces our mission to build open, transparent, and
                community-driven software. GitLab’s support helps us strengthen our development,
                testing, and security workflows across all JAQ Stack projects.
              </p>

              <Heading as="h2">🎉 What This Means</Heading>
              <ul>
                <li>✅ Free access to <strong>GitLab Ultimate</strong> for the JAQ Stack organization</li>
                <li>🧩 Advanced <strong>DevSecOps</strong> and CI/CD pipeline capabilities</li>
                <li>🔐 Built-in <strong>security and compliance scanning</strong></li>
                <li>📈 Project analytics, insights, and team collaboration tools</li>
                <li>🌍 Official listing on GitLab’s open-source project directory</li>
              </ul>

              <p>
                Explore our official project listing here:{" "}
                <a
                  href="https://gitlab.com/explore/projects?name=jaqstack&archived=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View JAQ Stack on GitLab
                </a>
                .
              </p>

              <Heading as="h2">💡 Why It Matters</Heading>
              <p>
                Being part of GitLab’s program gives JAQ Stack access to enterprise grade CI/CD and
                DevSecOps tooling for free. This means:
              </p>
              <ul>
                <li>Faster continuous integration and automated builds for our examples</li>
                <li>Improved code quality and security with vulnerability analysis</li>
                <li>Scalable workflows for contributors and maintainers</li>
                <li>Recognition within the global GitLab open-source ecosystem</li>
              </ul>

              <p>
                Together with our{" "}
                <a
                  href="/announcements/jaqstack-docker-sponsored"
                  target="_self"
                >
                  Docker-Sponsored Open Source partnership
                </a>
                , this milestone further expands JAQ Stack’s open infrastructure for the community.
              </p>

              <Heading as="h2">🧭 Our Commitment</Heading>
              <p>
                JAQ Stack will always remain:
              </p>
              <ul>
                <li>🆓 <strong>Open Source</strong> MIT-licensed and freely available</li>
                <li>🤝 <strong>Community-Driven</strong> guided by your ideas and contributions</li>
                <li>🔍 <strong>Transparent</strong> pen roadmap, discussions, and public progress</li>
              </ul>

              <Heading as="h2">🙌 Thank You</Heading>
              <p>
                Huge thanks to the <strong>GitLab Open Source team</strong> for recognizing JAQ Stack, and to
                every contributor who helped make this possible. Your support keeps our open-source
                mission alive.
              </p>

              <p>
                <a
                  href="https://github.com/jaqstack/jaqstack/discussions"
                  className="button button--primary margin-top--md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Discussion on GitHub
                </a>
              </p>

              <hr />

              <p style={{ textAlign: "center", marginTop: "2rem", fontWeight: 500 }}>
                ⏱️ Build Fast. Scale Smart. Proudly part of the{" "}
                <a
                  href="https://about.gitlab.com/solutions/open-source/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitLab Supported Open Source Program
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
