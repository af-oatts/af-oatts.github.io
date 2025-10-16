import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { BUILD_TARGETS, FILE_REGEX } from "../lib/constants";
import { findRelease, getDownload } from "./getDownloads";
import type { Release } from "./getDownloads";

describe("getDownloads component functions", () => {
  describe("findRelease", () => {
    const mockRelease = {
      assets: [
        { name: "oatts-1.0.0-arm.app.tar.gz" },
        { name: "oatts-1.0.0-intel.app.tar.gz" },
        { name: "oatts-1.0.0-linux.AppImage" },
        { name: "oatts-1.0.0-windows.exe" },
        { name: "oatts-1.0.0-windows.msi" },
      ],
    } as Release;

    it("should find ARM macOS release", () => {
      const result = findRelease(mockRelease, FILE_REGEX.MAC_OS_ARM);
      expect(result).toBe("oatts-1.0.0-arm.app.tar.gz");
    });

    it("should find Intel macOS release", () => {
      const result = findRelease(mockRelease, FILE_REGEX.MAC_OS_INTEL);
      expect(result).toBe("oatts-1.0.0-intel.app.tar.gz");
    });

    it("should find Linux release", () => {
      const result = findRelease(mockRelease, FILE_REGEX.LINUX);
      expect(result).toBe("oatts-1.0.0-linux.AppImage");
    });

    it("should find Windows EXE release", () => {
      const result = findRelease(mockRelease, FILE_REGEX.WINDOWS_EXE);
      expect(result).toBe("oatts-1.0.0-windows.exe");
    });

    it("should find Windows MSI release", () => {
      const result = findRelease(mockRelease, FILE_REGEX.WINDOWS_MSI);
      expect(result).toBe("oatts-1.0.0-windows.msi");
    });

    it("should return empty string when no match found", () => {
      const result = findRelease(mockRelease, /nonexistent/);
      expect(result).toBe("");
    });

    it("should handle null/undefined release", () => {
      // @ts-expect-error
      expect(findRelease(null, FILE_REGEX.MAC_OS_ARM)).toBe("");
      // @ts-expect-error
      expect(findRelease(undefined, FILE_REGEX.MAC_OS_ARM)).toBe("");
    });

    it("should handle release without assets", () => {
      const releaseWithoutAssets = {} as Release;
      expect(findRelease(releaseWithoutAssets, FILE_REGEX.MAC_OS_ARM)).toBe("");
    });
  });

  describe("getDownload", () => {
    const mockRelease = {
      tag_name: "v1.0.0",
      assets: [
        { name: "oatts-1.0.0-arm.app.tar.gz" },
        { name: "oatts-1.0.0-intel.app.tar.gz" },
        { name: "oatts-1.0.0-linux.AppImage" },
        { name: "oatts-1.0.0-windows.exe" },
        { name: "oatts-1.0.0-windows.msi" },
      ],
    } as Release;
    const consoleMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    beforeEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      consoleMock.mockReset();
    });

    it("should generate correct download URL for ARM macOS", () => {
      const result = getDownload(mockRelease, BUILD_TARGETS.MAC_OS_ARM);
      console.log(result);
      expect(result).toBe(
        "https://github.com/af-oatts/oatts/releases/download/v1.0.0/oatts-1.0.0-arm.app.tar.gz"
      );
    });

    it("should generate correct download URL for Intel macOS", () => {
      const result = getDownload(mockRelease, BUILD_TARGETS.MAC_OS_INTEL);
      expect(result).toBe(
        "https://github.com/af-oatts/oatts/releases/download/v1.0.0/oatts-1.0.0-intel.app.tar.gz"
      );
    });

    it("should generate correct download URL for Linux", () => {
      const result = getDownload(mockRelease, BUILD_TARGETS.LINUX);
      expect(result).toBe(
        "https://github.com/af-oatts/oatts/releases/download/v1.0.0/oatts-1.0.0-linux.AppImage"
      );
    });

    it("should generate correct download URL for Windows EXE", () => {
      const result = getDownload(mockRelease, BUILD_TARGETS.WINDOWS_EXE);
      expect(result).toBe(
        "https://github.com/af-oatts/oatts/releases/download/v1.0.0/oatts-1.0.0-windows.exe"
      );
    });

    it("should generate correct download URL for Windows MSI", () => {
      const result = getDownload(mockRelease, BUILD_TARGETS.WINDOWS_MSI);
      expect(result).toBe(
        "https://github.com/af-oatts/oatts/releases/download/v1.0.0/oatts-1.0.0-windows.msi"
      );
    });

    it("should return empty string when asset not found", () => {
      // @ts-expect-error
      const releaseWithoutAssets = {
        tag_name: "v1.0.0",
        assets: [],
      } as Release;
      const result = getDownload(
        releaseWithoutAssets,
        BUILD_TARGETS.MAC_OS_ARM
      );
      expect(result).toBe("");
      expect(console.error).toHaveBeenCalledWith(
        "Couldn't find target release"
      );
    });

    it("should handle invalid target gracefully", () => {
      const result = getDownload(mockRelease, "invalid_target" as any);
      expect(result).toBe("");
      expect(console.error).toHaveBeenCalledWith(
        "Couldn't find target release"
      );
    });
  });
});
