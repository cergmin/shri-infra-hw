import { execSync } from "child_process";
import { getChangesList } from "./getChangesList.mjs";

const RELEASE_VERSION = process.env.RELEASE_VERSION;
const DOCKER_REGISTRY_ID = process.env.DOCKER_REGISTRY_ID;
const AUTHOR = process.env.AUTHOR;

const getIssueNumber = () => {
  const issuesJSON = execSync(`gh issue list --json number --label release_${RELEASE_VERSION}`).toString();
  const issues = JSON.parse(issuesJSON);
  return issues[0]?.number;
};

const addFixReleaseComment = (issueNumber) => {
  const body = Object
    .entries({
      Date: new Date().toLocaleDateString('ru'),
      Author: `@${AUTHOR}`,
      'Docker Image': `cr.yandex/${DOCKER_REGISTRY_ID}/app:${RELEASE_VERSION}`,
      Commits: '<br>' + getChangesList({betweenLastTagAndHead: true}).replaceAll('\n', '<br>'),
    })
    .map(([key, value]) => `**${key}**: ${value}`)
    .join('<br>');

  const command = [
    `gh issue comment ${issueNumber}`,
    `--body "**Fix Release** <br><br> ${body}"`,
  ];

  execSync(command.join(' '));
};

addFixReleaseComment(getIssueNumber());