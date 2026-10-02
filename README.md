# Melo — Next-Generation Media Downloader & Video Converter Platform

**Melo** is a modern, fast, SEO-focused online media utility platform. It empowers users to download permitted direct media files, convert video and audio formats, extract pristine sound tracks, and compress large media files directly in their browser.

Inspired by the extreme simplicity of utilities like MP3Juice, Melo provides a clean, modern, ad-free international experience for users worldwide—from Kenya and across Africa to Europe, the Americas, and Asia.

---

## 🚀 Key Capabilities

### 1. Direct Media Downloader
- Download direct media files via HTTP/HTTPS URLs.
- Select target format: **Original**, **MP4**, **MP3**, **WAV**, **WebM**, or **M4A**.
- Built-in SSRF protection blocking private IPs, localhost, and cloud metadata endpoints (`169.254.169.254`).

### 2. Online Video Converter
- Convert between **MP4**, **MOV**, **WEBM**, **MKV**, and **AVI**.
- Automatic codec mapping with lossless resolution preservation.
- Zero watermarks, zero quality penalties.

### 3. MP3 & Audio Extractor
- Extract crystal-clear stereo audio from any video.
- High-fidelity **320kbps** MP3 encoding, broadcast-grade **WAV**, and Apple **M4A**.

### 4. Smart Video Compressor
- Reduce video file sizes by up to 50%–70% for WhatsApp, email attachments (Gmail 25MB limit), and Discord.
- Intelligent variable bitrate control preserving facial details and text clarity.

### 5. Media Resource Hub & SEO Architecture
- 20+ keyword-targeted landing pages with custom Schema.org (`WebApplication`, `FAQPage`, `BreadcrumbList`) JSON-LD structured data.
- Complete `/sitemap.xml` and `/robots.txt` configuration.
- 10 in-depth media engineering guides and tutorials.

---

## 🛠️ Architecture & Tech Stack

```
├── artifacts/
│   ├── api-server/         # Express 5 backend with media engine & SSRF defenses
│   │   ├── src/routes/     # /api/media/* and /api/healthz routes
│   │   └── src/lib/        # SSRF validator & filename sanitizer
│   └── melo/               # React 19 + Vite 7 + Tailwind CSS frontend
│       ├── src/components/ # Shadcn UI, MediaUtility & layout components
│       ├── src/pages/      # Home, Blog, Static & Landing pages
│       └── src/data/       # Keyword landing page data & blog articles
├── lib/
│   ├── api-spec/           # OpenAPI 3.1 specification (openapi.yaml)
│   ├── api-zod/            # Zod validation schemas
│   ├── api-client-react/   # TanStack Query React hooks
│   └── db/                 # Drizzle ORM schema with graceful offline mock
├── server.ts               # Unified fullstack entry point (Express + Vite)
├── metadata.json           # Application manifest
└── .env.example            # Environment configuration template
```

- **Frontend**: React 19, Tailwind CSS v4, Wouter, Radix UI / Shadcn, Lucide Icons, TanStack Query v5.
- **Backend**: Node.js 22, Express 5, Multer, Pino logging, ipaddr.js, native DNS resolution.
- **Contract & Validation**: OpenAPI 3.1, Zod v3.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 22+
- npm (Node Package Manager)

### Installation
```bash
npm install
```

### Development
Start the unified fullstack development server (Express API + Vite Dev Server on port 3000):
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Type Check & Lint
```bash
npm run lint
```

### Production Build
```bash
npm run build
npm start
```

---

## 🔒 Security & Privacy Implementation

1. **SSRF Defense (`validateSafeUrl`)**:
   - Blocks `localhost`, `127.0.0.1`, `::1`, `0.0.0.0`, and AWS/GCP metadata (`169.254.169.254`).
   - Resolves hostnames via DNS and rejects private RFC1918 subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `linkLocal`).
   - Restricts protocols strictly to `http:` and `https:`.

2. **Isolated Ephemeral Storage**:
   - Uploads and processed files are staged in isolated memory/temporary files.
   - An automated reaper script clears expired jobs every 5 minutes (files expire after 60 minutes).
   - No user media is stored permanently.

3. **Input Sanitization**:
   - Filenames are stripped of null bytes, directory traversal patterns (`../`), and forbidden characters.

4. **Rate & Size Limits**:
   - Maximum upload limit of 100MB per file.
   - Strict HTTP request timeouts prevent hanging connections.

---

## 📈 Search Console & SEO Configuration

1. **Google Search Console**:
   - Submit your verified domain in Google Search Console.
   - Submit the sitemap at `https://your-domain.com/sitemap.xml`.
2. **Canonical URLs & Social Cards**:
   - Each page sets its own canonical link, OpenGraph metadata, and Twitter Card.
3. **Structured Data**:
   - Embedded Schema.org JSON-LD scripts provide rich snippet qualification for Google search results.

---

## 📜 Legal & Permitted Use Disclaimer
Melo is built exclusively for downloading and converting direct, publicly accessible media files that users own or have explicit authorization to process. Melo does not bypass DRM, access controls, or platform terms of service.
