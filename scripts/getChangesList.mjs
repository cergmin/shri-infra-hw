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

export const getChangesList = ({betweenLastTagAndHead} = {betweenLastTagAndHead: false}) => {
  const [lastTag, prevTag] = getTagsList();

  return execSync(
    betweenLastTagAndHead
      ? `git log v${lastTag}..HEAD --oneline`
      : `git log v${prevTag}..v${lastTag} --oneline`
  )
    .toString()
    .split('\n')
    .filter((line) => !line.includes('Update CHANGELOG'))
    .join('\n');
};