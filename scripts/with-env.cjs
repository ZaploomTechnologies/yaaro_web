const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { applyNextNodeEnv, loadProjectEnv } = require("./load-env.cjs");

const args = process.argv.slice(2);

loadProjectEnv(process.cwd());
applyNextNodeEnv(args[0]);

const nextBin = path.join(process.cwd(), "node_modules", ".bin", process.platform === "win32" ? "next.cmd" : "next");

const result = spawnSync(nextBin, args, {
  stdio: "inherit",
  env: process.env,
});

process.exit(result.status ?? 1);
