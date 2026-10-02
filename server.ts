import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import apiRouter from "./artifacts/api-server/src/routes/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const meloDir = path.resolve(__dirname, "artifacts/melo");

// SEO Robots & Sitemap endpoints
app.get("/sitemap.xml", (_req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.sendFile(path.resolve(meloDir, "public/sitemap.xml"));
});

app.get("/robots.txt", (_req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.sendFile(path.resolve(meloDir, "public/robots.txt"));
});

// Mount API router
app.use("/api", apiRouter);

if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    root: meloDir,
    configFile: path.resolve(meloDir, "vite.config.ts"),
    server: {
      middlewareMode: true,
      host,
      allowedHosts: true,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Express 5 catch-all for SPA HTML rendering
  app.use(async (req, res, next) => {
    if (req.method !== "GET" || req.originalUrl.startsWith("/api")) {
      return next();
    }
    try {
      const url = req.originalUrl;
      const indexHtmlPath = path.resolve(meloDir, "index.html");
      let template = await fs.promises.readFile(indexHtmlPath, "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace?.(e as Error);
      next(e);
    }
  });
} else {
  const distDir = path.resolve(meloDir, "dist");
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.originalUrl.startsWith("/api")) {
      res.sendFile(path.resolve(distDir, "index.html"));
    } else {
      next();
    }
  });
}

app.listen(port, host, () => {
  console.log(`[Melo] Platform active on http://${host}:${port}`);
});
