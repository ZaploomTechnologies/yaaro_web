const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { applyNextNodeEnv, loadProjectEnv } = require("./load-env.cjs");

const args = process.argv.slice(2);

loadProjectEnv(process.cwd());
applyNextNodeEnv(args[0]);

const isWindows = process.platform === "win32";
const nextBin = path.join(process.cwd(), "node_modules", ".bin", isWindows ? "next.cmd" : "next");

const result = spawnSync(nextBin, args, {
  stdio: "inherit",
  env: process.env,
  // Node >=18.20.2/20.12.2 refuses to spawn .cmd/.bat files without a shell.
  shell: isWindows,
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
