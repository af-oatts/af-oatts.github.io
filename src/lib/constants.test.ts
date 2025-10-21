import { describe, it, expect } from "vitest";
import {
  GITHUB_OWNER,
  GITHUB_REPO,
  BUILD_TARGETS,
  FILE_REGEX,
  OS_LABELS,
} from "./constants";

describe("constants", () => {
  describe("GITHUB_OWNER and GITHUB_REPO", () => {
    it("should have correct GitHub owner", () => {
      expect(GITHUB_OWNER).toBe("af-oatts");
    });

    it("should have correct GitHub repository name", () => {
      expect(GITHUB_REPO).toBe("oatts");
    });
  });

  describe("BUILD_TARGETS", () => {
    it("should contain all expected build targets", () => {
      expect(BUILD_TARGETS).toEqual({
        MAC_OS_ARM: "macos_arm",
        MAC_OS_INTEL: "macos_intel",
        LINUX: "linux_appimage",
        WINDOWS_EXE: "windows_exe",
        WINDOWS_MSI: "windows_msi",
      });
    });

    it("should have unique values for all build targets", () => {
      const values = Object.values(BUILD_TARGETS);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it("should have all string values", () => {
      Object.values(BUILD_TARGETS).forEach((value) => {
        expect(typeof value).toBe("string");
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe("FILE_REGEX", () => {
    it("should contain regex patterns for all build targets", () => {
      expect(FILE_REGEX).toHaveProperty("MAC_OS_ARM");
      expect(FILE_REGEX).toHaveProperty("MAC_OS_INTEL");
      expect(FILE_REGEX).toHaveProperty("LINUX");
      expect(FILE_REGEX).toHaveProperty("WINDOWS_EXE");
      expect(FILE_REGEX).toHaveProperty("WINDOWS_MSI");
    });

    it("should have RegExp objects as values", () => {
      Object.values(FILE_REGEX).forEach((regex) => {
        expect(regex).toBeInstanceOf(RegExp);
      });
    });

    describe("MAC_OS_ARM regex", () => {
      it("should match ARM macOS files", () => {
        expect("oatts-1.0.0-arm.app.tar.gz").toMatch(FILE_REGEX.MAC_OS_ARM);
        expect("myapp-arm.app.tar.gz").toMatch(FILE_REGEX.MAC_OS_ARM);
      });

      it("should not match non-ARM files", () => {
        expect("oatts-1.0.0-intel.app.tar.gz").not.toMatch(
          FILE_REGEX.MAC_OS_ARM
        );
        expect("oatts-1.0.0.exe").not.toMatch(FILE_REGEX.MAC_OS_ARM);
      });
    });

    describe("MAC_OS_INTEL regex", () => {
      it("should match Intel macOS files", () => {
        expect("oatts-1.0.0-intel.app.tar.gz").toMatch(FILE_REGEX.MAC_OS_INTEL);
        expect("myapp-intel.app.tar.gz").toMatch(FILE_REGEX.MAC_OS_INTEL);
      });

      it("should not match non-Intel files", () => {
        expect("oatts-1.0.0-arm.app.tar.gz").not.toMatch(
          FILE_REGEX.MAC_OS_INTEL
        );
        expect("oatts-1.0.0.exe").not.toMatch(FILE_REGEX.MAC_OS_INTEL);
      });
    });

    describe("LINUX regex", () => {
      it("should match Linux AppImage files", () => {
        expect("oatts-1.0.0-linux.AppImage").toMatch(FILE_REGEX.LINUX);
        expect("myapp-linux.AppImage").toMatch(FILE_REGEX.LINUX);
      });

      it("should not match non-Linux files", () => {
        expect("oatts-1.0.0.exe").not.toMatch(FILE_REGEX.LINUX);
        expect("oatts-1.0.0-arm.app.tar.gz").not.toMatch(FILE_REGEX.LINUX);
      });
    });

    describe("WINDOWS_EXE regex", () => {
      it("should match Windows EXE files", () => {
        expect("oatts-1.0.0-windows.exe").toMatch(FILE_REGEX.WINDOWS_EXE);
        expect("myapp-windows.exe").toMatch(FILE_REGEX.WINDOWS_EXE);
      });

      it("should not match non-EXE files", () => {
        expect("oatts-1.0.0.msi").not.toMatch(FILE_REGEX.WINDOWS_EXE);
        expect("oatts-1.0.0-linux.AppImage").not.toMatch(
          FILE_REGEX.WINDOWS_EXE
        );
      });
    });

    describe("WINDOWS_MSI regex", () => {
      it("should match Windows MSI files", () => {
        expect("oatts-1.0.0-windows.msi").toMatch(FILE_REGEX.WINDOWS_MSI);
        expect("myapp-windows.msi").toMatch(FILE_REGEX.WINDOWS_MSI);
      });

      it("should not match non-MSI files", () => {
        expect("oatts-1.0.0.exe").not.toMatch(FILE_REGEX.WINDOWS_MSI);
        expect("oatts-1.0.0-linux.AppImage").not.toMatch(
          FILE_REGEX.WINDOWS_MSI
        );
      });
    });
  });

  describe("OS_LABELS", () => {
    it("should contain labels for all build targets", () => {
      expect(OS_LABELS).toHaveProperty("WINDOWS_EXE");
      expect(OS_LABELS).toHaveProperty("WINDOWS_MSI");
      expect(OS_LABELS).toHaveProperty("MAC_OS_ARM");
      expect(OS_LABELS).toHaveProperty("MAC_OS_INTEL");
      expect(OS_LABELS).toHaveProperty("LINUX");
    });

    it("should have correct OS labels", () => {
      expect(OS_LABELS).toEqual({
        WINDOWS_EXE: "Windows",
        WINDOWS_MSI: "Windows",
        MAC_OS_ARM: "MacOS (Apple Silicon)",
        MAC_OS_INTEL: "MacOS (Intel)",
        LINUX: "Linux",
      });
    });

    it("should have all string values", () => {
      Object.values(OS_LABELS).forEach((label) => {
        expect(typeof label).toBe("string");
        expect(label.length).toBeGreaterThan(0);
      });
    });

    it("should have descriptive labels for macOS variants", () => {
      expect(OS_LABELS.MAC_OS_ARM).toContain("Apple Silicon");
      expect(OS_LABELS.MAC_OS_INTEL).toContain("Intel");
      expect(OS_LABELS.MAC_OS_ARM).toContain("MacOS");
      expect(OS_LABELS.MAC_OS_INTEL).toContain("MacOS");
    });

    it("should have same label for both Windows variants", () => {
      expect(OS_LABELS.WINDOWS_EXE).toBe(OS_LABELS.WINDOWS_MSI);
      expect(OS_LABELS.WINDOWS_EXE).toBe("Windows");
    });

    it("should have simple label for Linux", () => {
      expect(OS_LABELS.LINUX).toBe("Linux");
    });
  });

  describe("constants consistency", () => {
    it("should have matching keys between BUILD_TARGETS and FILE_REGEX", () => {
      const buildTargetKeys = Object.keys(BUILD_TARGETS);
      const fileRegexKeys = Object.keys(FILE_REGEX);

      expect(buildTargetKeys.sort()).toEqual(fileRegexKeys.sort());
    });

    it("should have matching keys between BUILD_TARGETS and OS_LABELS", () => {
      const buildTargetKeys = Object.keys(BUILD_TARGETS);
      const osLabelKeys = Object.keys(OS_LABELS);

      expect(buildTargetKeys.sort()).toEqual(osLabelKeys.sort());
    });

    it("should have matching keys across all constant objects", () => {
      const buildTargetKeys = Object.keys(BUILD_TARGETS);
      const fileRegexKeys = Object.keys(FILE_REGEX);
      const osLabelKeys = Object.keys(OS_LABELS);

      expect(buildTargetKeys.sort()).toEqual(fileRegexKeys.sort());
      expect(buildTargetKeys.sort()).toEqual(osLabelKeys.sort());
      expect(fileRegexKeys.sort()).toEqual(osLabelKeys.sort());
    });
  });
});
