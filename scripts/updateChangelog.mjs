import { readFileSync, writeFileSync } from "fs";
import { getChangesList } from "./getChangesList.mjs";

const CHANGELOG_PATH = "./CHANGELOG.md";
const RELEASE_VERSION = process.env.RELEASE_VERSION;

const changes = getChangesList();

const changelogContent = readFileSync(CHANGELOG_PATH, { encoding: "utf-8" });
const changelogBlocks = changelogContent.split('\n\n');
const changelogFirstLine = changelogContent.split('\n')[0];

const RELEASE_BLOCK_FIRST_LINE = `## Release ${RELEASE_VERSION}`;

let newBlockContent = `${RELEASE_BLOCK_FIRST_LINE}\n`
newBlockContent += changes.replaceAll('\n', '\\\n');
newBlockContent = newBlockContent.trim();

const newChangelogBlocks = [
  newBlockContent,
  ...(changelogFirstLine === RELEASE_BLOCK_FIRST_LINE ? changelogBlocks.splice(1) : changelogBlocks),
];

writeFileSync(CHANGELOG_PATH, newChangelogBlocks.join('\n\n'), { flag: "w" });