import {
  BUILD_TARGETS,
  FILE_REGEX,
  GITHUB_OWNER,
  GITHUB_REPO,
} from "../lib/constants";
import type { Endpoints } from "@octokit/types";

export const LATEST_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;

export type Release =
  Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"];

export async function getLatestRelease() {
  return fetch(LATEST_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response body as JSON
    })
    .catch((error) => console.error(error));
}

export function findRelease(release: Release, target: RegExp) {
  return release?.assets?.find((x) => x.name.match(target))?.name || "";
}

export function getDownload(release: Release, target: string) {
  let filename: string = "";

  switch (target) {
    case BUILD_TARGETS.MAC_OS_ARM:
      filename = findRelease(release, FILE_REGEX.MAC_OS_ARM);
      break;
    case BUILD_TARGETS.MAC_OS_INTEL:
      filename = findRelease(release, FILE_REGEX.MAC_OS_INTEL);
      break;
    case BUILD_TARGETS.LINUX:
      filename = findRelease(release, FILE_REGEX.LINUX);
      break;
    case BUILD_TARGETS.WINDOWS_MSI:
      filename = findRelease(release, FILE_REGEX.WINDOWS_MSI);
      break;
    case BUILD_TARGETS.WINDOWS_EXE:
      filename = findRelease(release, FILE_REGEX.WINDOWS_EXE);
      break;
    default:
  }
  if (!filename) {
    console.error("Couldn't find target release");
    return "";
  }
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${release.tag_name}/${filename}`;
}

export function getDownloads(release: Release) {
  return Object.values(BUILD_TARGETS).reduce((acc, key: string) => {
    acc[key] = getDownload(release, key as keyof typeof BUILD_TARGETS);
    return acc;
  }, {} as Record<string, string>);
}
