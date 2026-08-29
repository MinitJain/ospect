const platform = process.platform;

if (platform === "darwin") {
  module.exports = require("./processInfo.macos");
} else if (platform === "linux") {
  module.exports = require("./processInfo.linux");
} else {
  throw new Error(`Unsupported platform: ${platform}`);
}
