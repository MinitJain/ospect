const os = require("os");

function getSystemInfo() {
  const uptime = os.uptime();

  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMinutes = Math.floor((uptime % 3600) / 60);
  const uptimeSeconds = Math.floor(uptime % 60);

  return {
    platform: os.platform(),
    hostname: os.hostname(),
    arch: os.arch(),
    uptime: `${uptimeHours} hours ${uptimeMinutes} minutes ${uptimeSeconds} seconds`,
  };
}

module.exports = getSystemInfo;
