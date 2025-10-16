export const GITHUB_OWNER = "af-oatts";
export const GITHUB_REPO = "oatts";

export const BUILD_TARGETS = {
  MAC_OS_ARM: "macos_arm",
  MAC_OS_INTEL: "macos_intel",
  LINUX: "linux_appimage",
  WINDOWS_EXE: "windows_exe",
  WINDOWS_MSI: "windows_msi",
};

export const FILE_REGEX = {
  MAC_OS_ARM: /arm\.app\.tar\.gz/,
  MAC_OS_INTEL: /intel\.app\.tar\.gz/,
  LINUX: /linux\.AppImage/,
  WINDOWS_EXE: /windows\.exe/,
  WINDOWS_MSI: /windows\.msi/,
};

export const OS_LABELS = {
  WINDOWS_EXE: "Windows",
  WINDOWS_MSI: "Windows",
  MAC_OS_ARM: "MacOS (Apple Silicon)",
  MAC_OS_INTEL: "MacOS (Intel)",
  LINUX: "Linux"
}