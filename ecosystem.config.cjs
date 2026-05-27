const path = require("path");
const { getResolvedEnv } = require("./scripts/load-env.cjs");

const rootDir = __dirname;
function normalizeAppEnv(value) {
  const env = String(value || "")
    .trim()
    .toLowerCase();
  if (env === "live" || env === "production" || env === "prod") return "production";
  return "dev";
}

const selectedAppEnv = normalizeAppEnv(process.env.APP_ENV);
const selectedLabel = selectedAppEnv === "production" ? "live" : "dev";

const devEnv = getResolvedEnv(rootDir, "dev");
const prodEnv = getResolvedEnv(rootDir, "production");
const selectedEnv = selectedAppEnv === "production" ? prodEnv : devEnv;

module.exports = {
  apps: [
    {
      name: `${selectedLabel}-yaaro-web`,
      script: path.join(rootDir, "scripts/pm2-start.cjs"),
      cwd: rootDir,
      interpreter: "node",
      exec_mode: "fork",
      instances: 1,
      watch: false,
      max_memory_restart: "512M",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      env: selectedEnv,
      env_production: prodEnv,
      env_development: devEnv,
      autorestart: true,
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
