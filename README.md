# 🖥️ Command Manager

> Modern SSH Command Manager with an intuitive graphical interface. Create SSH host profiles, design custom GUI components with personalized styling, and execute commands on remote servers with a single click.

[![GitHub Release](https://img.shields.io/github/v/release/eaeoz/command-manager-docker?style=flat-square)](https://github.com/eaeoz/command-manager-docker/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/eaeoz/command-manager-docker?style=flat-square)](https://hub.docker.com/r/eaeoz/command-manager-docker)

---

## 📥 Downloads

| Type | Platform | Download |
|------|----------|----------|
| **Installer** | Windows x64 | [Command Manager Setup 1.0.3.exe](https://github.com/eaeoz/command-manager-docker/releases/download/1.0.3/Command.Manager.Setup.1.0.3.exe) |
| **Portable** | Windows x64 | [Command Manager Portable 1.0.3.exe](https://github.com/eaeoz/command-manager-docker/releases/download/1.0.3/Command.Manager_portable_1.0.3.exe) |
| **Docker** | Cross-platform | `docker pull eaeoz/command-manager-docker:3` |

---

## ✨ Features

- **🔐 SSH Profile Management** - Create and manage multiple SSH host profiles
- **🤖 AI-Powered Assistance** - Leverage AI to optimize command execution and get intelligent suggestions for your SSH workflows
- **🎨 Custom GUI Components** - Design command buttons with personalized styling
- **🖱️ Right-Click Styling** - Edit component style, colors, fonts, and appearance with a simple right-click
- **💾 Backup & Restore** - Export and import your configuration to keep your setup safe
- **⚡ One-Click Execution** - Run commands on remote servers instantly
- **📊 Live Results** - View command output directly in the interface
- **🎯 Component Customization** - Set text color, background color, gradient, font size, and font type per component
- **📦 Portable & Installer** - Choose between portable (no install) or full installation

---

## 🚀 Quick Start

### Windows (Recommended)

**Option 1: Installer**
1. Download `Command Manager Setup 1.0.3.exe`
2. Run the installer and follow the setup wizard
3. Launch from Start Menu

**Option 2: Portable**
1. Download `Command Manager_portable_1.0.3.exe`
2. Place in any folder
3. Run directly - no installation needed

> 💡 On first run, configuration files are automatically created in `%APPDATA%\command-manager\config\`

---

### Docker

#### Using Docker Compose (Recommended)

```yaml
version: "3"
services:
  app:
    image: eaeoz/command-manager-docker:3
    ports:
      - "3000:3000"
    volumes:
      - ./config:/app/config
    restart: unless-stopped
```

```bash
docker compose up -d
```

#### Using Docker Run

```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/config:/app/config \
  --name command-manager \
  eaeoz/command-manager-docker:3
```

Access at: `http://localhost:3000`

---

## 🎨 Component Styling

Right-click any command component to customize:
- **Text Color** - Choose any color for the command text
- **Background** - Solid colors or gradient backgrounds
- **Font Settings** - Size and typeface selection
- **Component Size** - Adjust to fit your preference

---

## 💾 Backup & Restore

### Backup Configuration
1. Navigate to your config directory:
   - **Windows**: `%APPDATA%\command-manager\config\`
   - **Docker**: `./config/` volume mount
2. Copy these files:
   - `.env` - Environment settings
   - `commands.json` - Your command components
   - `profiles.json` - SSH host profiles

### Restore Configuration
Simply copy your backed-up files back to the config directory and restart the application.

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for Windows
npm run build
```

---

## 📋 Requirements

**Windows App:**
- Windows 10/11 (x64)

**Docker:**
- Docker Desktop or Docker Engine
- Docker Compose (optional)

---

## 📝 Configuration

The app uses a `config/` directory with three files:

| File | Purpose |
|------|---------|
| `.env` | Environment variables (PORT, timeouts, file paths) |
| `commands.json` | Your command components and their settings |
| `profiles.json` | SSH host profiles and credentials |

---

## 📄 License

ISC License - Copyright © 2024 Sedat Ergoz

---

## 🔗 Links

- **GitHub**: [eaeoz/command-manager-docker](https://github.com/eaeoz/command-manager-docker)
- **Docker Hub**: [eaeoz/command-manager-docker](https://hub.docker.com/r/eaeoz/command-manager-docker)
- **Issues**: [Report a bug](https://github.com/eaeoz/command-manager-docker/issues)

