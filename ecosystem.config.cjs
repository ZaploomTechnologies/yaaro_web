const path = require("path");
const { getResolvedEnv } = require("./scripts/load-env.cjs");

const rootDir = __dirname;
const devEnv = getResolvedEnv(rootDir, "dev");
const prodEnv = getResolvedEnv(rootDir, "production");

module.exports = {
  apps: [
    {
      name: `${devEnv.APP_ENV}-yaaro-web`,
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
      env: devEnv,
      env_production: prodEnv,
      autorestart: true,
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
