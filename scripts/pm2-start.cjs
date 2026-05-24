const fs = require("node:fs");
const { spawn, spawnSync } = require("node:child_process");
const path = require("node:path");
const { loadProjectEnv } = require("./load-env.cjs");

const rootDir = process.cwd();
loadProjectEnv(rootDir);
process.env.NODE_ENV = "production";

const nextBin = path.join(
  rootDir,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next"
);
const buildIdPath = path.join(rootDir, ".next", "BUILD_ID");

if (!fs.existsSync(buildIdPath)) {
  console.log("[pm2-start] No production build found, running next build...");
  const buildResult = spawnSync(nextBin, ["build"], {
    cwd: rootDir,
    stdio: "inherit",
    env: process.env,
  });

  if (buildResult.status !== 0) {
    process.exit(buildResult.status ?? 1);
  }

  console.log("[pm2-start] Build complete, starting server...");
}

const child = spawn(nextBin, ["start"], {
  cwd: rootDir,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
