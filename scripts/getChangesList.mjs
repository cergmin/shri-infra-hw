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

  console.log(`git log v${lastTag}..HEAD --oneline`);

  const changesList = execSync(`git log v${lastTag}..HEAD --oneline`).toString();

  console.log(`Changes list:\n${changesList}`)

  return changesList;
};
