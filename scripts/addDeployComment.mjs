import { execSync } from "child_process";

const RELEASE_VERSION = process.env.RELEASE_VERSION;

const getIssueNumber = () => {
  const issuesJSON = execSync(`gh issue list --json number --label release_${RELEASE_VERSION}`).toString();
  const issues = JSON.parse(issuesJSON);
  return issues[0]?.number;
};

const addDeployComment = (issueNumber) => {
  const command = [
    `gh issue comment ${issueNumber}`,
    `--body "**Deployed to production**"`,
  ];

  execSync(command.join(' '));
};

addDeployComment(getIssueNumber());