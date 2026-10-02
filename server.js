import express from "express";
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
// Mount API router
app.use("/api", apiRouter);
// Frontend Vite integration
if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
        configFile: path.resolve(__dirname, "artifacts/melo/vite.config.ts"),
        server: {
            middlewareMode: true,
            host,
            port,
            allowedHosts: true,
        },
        appType: "spa",
    });
    app.use(vite.middlewares);
}
else {
    const distDir = path.resolve(__dirname, "artifacts/melo/dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
        res.sendFile(path.resolve(distDir, "index.html"));
    });
}
app.listen(port, host, () => {
    console.log(`[Melo] Server listening on http://${host}:${port}`);
});
