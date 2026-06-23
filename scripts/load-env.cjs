const fs = require("node:fs");
const path = require("node:path");

const PRESERVE_KEYS = new Set(["NODE_ENV", "APP_ENV"]);

const PUBLIC_ENV_MAP = [
  ["NEXT_PUBLIC_API_URL", "NEXT_PUBLIC_API_URL"],
  ["NEXT_PUBLIC_IMAGE_URL", "NEXT_PUBLIC_IMAGE_URL"],
  ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_SITE_URL"],
  ["BACKEND_ORIGIN", "BACKEND_ORIGIN"],
  ["NEXT_PUBLIC_BACKEND_ORIGIN", "BACKEND_ORIGIN"],
];

function resolveAppEnv() {
  if (process.env.APP_ENV) {
    return process.env.APP_ENV.trim();
  }

  const nodeEnv = (process.env.NODE_ENV || "").trim();
  if (nodeEnv === "dev" || nodeEnv === "development") {
    return "dev";
  }
  if (nodeEnv === "production") {
    return "production";
  }

  return "dev";
}

function isDevDeployEnv() {
  const appEnv = resolveAppEnv();
  return appEnv === "dev" || appEnv === "development";
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Env file not found: ${filePath}`);
    return false;
  }

  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (PRESERVE_KEYS.has(key) && process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = value;
  }

  return true;
}

function applyResolvedPublicEnv() {
  process.env.APP_ENV = resolveAppEnv();
  const prefix = isDevDeployEnv() ? "DEV_" : "LIVE_";

  for (const [targetKey, sourceSuffix] of PUBLIC_ENV_MAP) {
    const prefixedKey = `${prefix}${sourceSuffix}`;
    const value = process.env[prefixedKey] || process.env[targetKey];
    if (value) {
      process.env[targetKey] = value;
    }
  }

  return isDevDeployEnv() ? "DEV" : "LIVE";
}

function applyNextNodeEnv(command) {
  if (command === "dev") {
    process.env.NODE_ENV = "development";
  } else if (command === "build" || command === "start") {
    process.env.NODE_ENV = "production";
  }
}

function loadProjectEnv(rootDir = process.cwd()) {
  loadEnvFile(path.join(rootDir, ".env"));
  const label = applyResolvedPublicEnv();
  console.log(
    `[env] APP_ENV=${process.env.APP_ENV} → ${label} | API=${process.env.NEXT_PUBLIC_API_URL || "(unset)"}`
  );
  return label;
}

function getResolvedEnv(rootDir = process.cwd(), appEnv = "dev") {
  loadEnvFile(path.join(rootDir, ".env"));
  process.env.APP_ENV = appEnv;
  applyResolvedPublicEnv();

  return {
    NODE_ENV: "production",
    APP_ENV: appEnv,
    PORT: process.env.PORT || "3001",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL || "",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
    BACKEND_ORIGIN: process.env.BACKEND_ORIGIN || "",
  };
}

module.exports = {
  loadEnvFile,
  applyResolvedPublicEnv,
  applyNextNodeEnv,
  loadProjectEnv,
  getResolvedEnv,
  isDevDeployEnv,
  isDevNodeEnv: isDevDeployEnv,
};
