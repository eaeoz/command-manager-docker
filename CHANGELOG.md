# Changelog

## [1.0.5] - 2026-05-06

### Added
- **Persistent AI Authentication**: Solved the Electron Puter authentication loop. App securely stores and reads Puter auth cookies from local `config/` directory.
- **Modernized Navigation Menu**: Restyled top-left navigation drawer with frosted glassmorphism, staggered spring animations, dynamic hover scaling, and official brand colors.

### Changed
- **Compact Modal Design**: Optimized layout of Style Command and Manage Profiles modals. Reduced padding and input heights for compact laptop-friendly layout.
- **UI & Flow Improvements**: Replaced jarring native OS dialogs (`alert()`, `confirm()`) with smooth non-blocking UI notifications. Profile/Command deletion uses fast 2-step button confirmation.

### Fixed
- **Input Focus Lockout**: Fixed bug where "Add Command" textboxes became unresponsive after adding/editing/deleting profiles. Resolved by replacing native dialogs, explicitly closing background overlays, and adding 500ms stabilization delay before reloads.
- **Scrollbar Issues**: Fixed layout glitch where opening navigation menu or modals forced scrollbars to appear.

### Downloads
- **Installer**: [Command Manager Setup 1.0.5.exe](https://github.com/eaeoz/command-manager-docker/releases/download/1.0.5/Command.Manager.Setup.1.0.5.exe)
- **Portable**: [Command Manager Portable 1.0.5.exe](https://github.com/eaeoz/command-manager-docker/releases/download/1.0.5/Command.Manager_portable_1.0.5.exe)
- **Docker**: `docker pull eaeoz/command-manager-docker:3`

---

## [1.0.4] - 2026-05-05

### Added
- Setup and Portable builds properly generated using Electron Builder
- Packaged app ensures robust background Express server execution

### Added
- **AI Feature Integration** - Added AI-powered functionality to enhance command management experience
  - Intelligent command suggestions based on usage patterns
  - AI-assisted command optimization for better SSH workflow
  - Smart recommendations for command execution

### Changed
- **UI Enhancements** - Redesigned add command section with improved user interface
- **Docker Image** - Updated to `eaeoz/command-manager-docker:3`
- **Version Bump** - Updated from 1.0.2 to 1.0.3

### Downloads
- **Installer**: [Command Manager Setup 1.0.3.exe](https://github.com/eaeoz/command-manager-docker/releases/download/1.0.3/Command.Manager.Setup.1.0.3.exe)
- **Portable**: [Command Manager Portable 1.0.3.exe](https://github.com/eaeoz/command-manager-docker/releases/download/1.0.3/Command.Manager_portable_1.0.3.exe)
- **Docker**: `docker pull eaeoz/command-manager-docker:3`

---

## [1.0.2] - Previous Release

Previous stable release with core SSH command management features.
