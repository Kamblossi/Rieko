# Rieko

Rieko is a privacy-first AI desktop assistant from PrismTechCo for meetings, interviews, and focused workflows.

## Identity

- Product: Rieko
- Company: PrismTechCo
- Developer: Newton Ochieng
- Website: https://www.rieko.prismtechco.com
- Repository: https://github.com/Kamblossi/Rieko.git
- Bundle identifier: com.prismtechco.rieko

## Stack

- Frontend: React + TypeScript + Vite
- Desktop shell: Tauri 2
- Native layer: Rust
- Local data: SQLite via Tauri SQL plugin

## Core Capabilities

- Overlay and dashboard workflows for chat, screenshots, and audio
- Local settings, prompt management, and conversation history
- Rieko Cloud license activation and model selection
- Native packaging for macOS, Windows, and Linux

## Development

```bash
git clone https://github.com/Kamblossi/Rieko.git
cd rieko-desktop-app
npm install
npm run tauri dev
```

## Production Build

```bash
npm run tauri build
```

Release artifacts are created under `src-tauri/target/release/bundle/`.

## Releases And Support

- Product site: https://www.rieko.prismtechco.com
- Releases: https://github.com/Kamblossi/Rieko/releases
- Issues: https://github.com/Kamblossi/Rieko/issues
- Contact: contact@prismtechco.com

## Security

Report vulnerabilities privately through the repository security tab or by email at contact@prismtechco.com.

## Licensing

Package and bundle metadata now point to `EULA.txt`. Review that agreement before publishing production builds.