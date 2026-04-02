/*
 * Copyright © 2026 DCS Corporation, 6909 Metro Park Drive Suite 500, Alexandria, VA 22310.
 * See the LICENSE file for rights & permissions.
 */
import {
    GITHUB_OWNER,
    GITHUB_REPO,
} from "../lib/constants";
import type { Endpoints } from "@octokit/types";

export type Release = Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"];
const BASE_GITHUB_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

export async function getReleases(): Promise<Release[]> {
    const response = await fetch(`${BASE_GITHUB_URL}/releases`,
        {
            headers: {
                Accept: "application/vnd.github+json",
            },
        },
    );

    let releases = await response.json();
    // Handle API errors
    if (!Array.isArray(releases)) {
        throw new Error("Github API error.")
    }
    return releases as Release[];
}

export function identifyOS(assetName: string) {

}