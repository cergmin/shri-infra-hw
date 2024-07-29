import { execSync } from "child_process";

const getTagsList = () => {
  const getVersionVersionData = (tag) =>
    tag.slice(1);

  const compareVersions = (a, b) =>
    Number(b) - Number(a);

  return execSync("git tag -l v*")
    .toString()
    .split('\n')
    .filter(Boolean)
    .map(getVersionVersionData)
    .sort(compareVersions);
};

export const getChangesList = () => {
  const lastTag = getTagsList()[0];

  return execSync(`git log v${lastTag}..HEAD --oneline`)
    .toString();
};