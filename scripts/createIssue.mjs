import { execSync } from "child_process";
import { getChangesList } from "./getChangesList.mjs";

const RELEASE_VERSION = process.env.RELEASE_VERSION;
const AUTHOR = process.env.AUTHOR;
const DOCKER_REGISTRY_ID = process.env.DOCKER_REGISTRY_ID;

const createLabel = () => {
  try {
    const command = [
      'gh label create',
      `release_${RELEASE_VERSION}`,
      '--color 0366d6',
      `--description "Label for release ${RELEASE_VERSION}"`,
    ];
  
    execSync(command.join(' '));
  } catch (e) {
    console.log(e);
  }
};

const createIssue = () => {
  const body = Object
    .entries({
      Date: new Date().toLocaleDateString('ru'),
      Author: `@${AUTHOR}`,
      Version: RELEASE_VERSION,
      'Docker Image': `cr.yandex/${DOCKER_REGISTRY_ID}/app:${RELEASE_VERSION}`,
      'Latest Docker Image': `cr.yandex/${DOCKER_REGISTRY_ID}/app:${RELEASE_VERSION}_latest`,
      Commits: '<br>' + getChangesList().replaceAll('\n', '<br>'),
    })
    .map(([key, value]) => `**${key}**: ${value}`)
    .join('<br>');

  const command = [
    'gh issue create',
    `--title "Release ${RELEASE_VERSION}"`,
    `--body "${body}"`,
    `--label "release_${RELEASE_VERSION}"`,
  ];

  execSync(command.join(' '));
};

createLabel();
createIssue();