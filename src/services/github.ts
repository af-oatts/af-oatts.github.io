/*
 * Copyright © 2026 DCS Corporation, 6909 Metro Park Drive Suite 500, Alexandria, VA 22310.
 * See the LICENSE file for rights & permissions.
 */
import {
    BuildTarget,
    GITHUB_OWNER,
    GITHUB_REPO,
} from "../lib/constants";
import type { Endpoints } from "@octokit/types";

export type Release = Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"];
export type Asset = Release['assets'][0];

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


function findAssets(assets: Asset[], pattern: RegExp) {
    return assets.filter((asset: any) => pattern.test(asset.name));
}

export function getMacosArmAssets(assets: Asset[]) {
    return [
        ...findAssets(assets, /aarch64\.app\.tar\.gz$/i),
        ...findAssets(assets, /_(aarch64|arm)\.dmg$/i),
        ...findAssets(
            assets,
            /(macos|darwin).*(arm64|aarch64|arm)[^/]*\.(dmg|app\.tar\.gz)/i,
        ),
    ];
}
export function getMacosIntelAssets(assets: Asset[]) {
    return [
        ...findAssets(assets, /x64\.app\.tar\.gz$/i),
        ...findAssets(assets, /_x64\.dmg$/i),
        ...findAssets(
            assets,
            /(macos|darwin).*(x64|x86[_-]64|intel).*\.(dmg|app\.tar\.gz)/i,
        )
    ]
}
export function getDebAssets(assets: Asset[]) {
    return [
        ...findAssets(
            assets,
            /(amd64|x86[_-]64).*\.deb$/i,
        ),
        ...findAssets(assets, /_x64\.deb$/i),
        ...findAssets(assets, /\.deb$/i)
    ]
}

export function getAppimageAssets(assets: Asset[]) {
    return [
        ...findAssets(assets, /\.appimage$/i),
        ...findAssets(
            assets,
            /(x86[_-]64|amd64).*\.AppImage$/i,
        )
    ]

}

export function getMSIWindowsAssets(assets: Asset[]) {
    return findAssets(assets, /(?=.*(?:win|windows))(?=.*(?:x64|x86[_-]64|amd64)).*\.msi$/i);
}

export function getExeWindowsAssets(assets: Asset[]) {
    return [
        ...findAssets(
            assets,
            /(win|windows).*(x64|x86[_-]64|amd64).*\.exe$/i,
        ),
        ...findAssets(assets, /x64.*\.exe$/i),
        ...findAssets(assets, /_x64\.exe$/i),
    ];
}