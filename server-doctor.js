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

function getMemoryInfo() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = (usedMemory / totalMemory) * 100;

  return {
    totalMemory,
    freeMemory,
    usedMemory,
    memoryUsage,
  };
}

function getCPUInfo() {
  const cpus = os.cpus();
  const cpuModel = cpus[0].model;
  const logicalCPUs = cpus.length;

  return {
    cpuModel: cpuModel,
    logicalCPUs: logicalCPUs,
  };
}

const systemInfo = getSystemInfo();
const memoryInfo = getMemoryInfo();
const cpuInfo = getCPUInfo();

const serverDoctorReport = {
  systemInfo,
  memoryInfo,
  cpuInfo,
};

function runHealthChecks(report) {
  if (report.memoryInfo.memoryUsage > 90) {
    return "Memory usage is critical";
  }

  if (report.memoryInfo.memoryUsage > 80) {
    return "Memory usage is high";
  }

  return "Memory usage is healthy";
}

function printReport(report) {
  const BYTES_PER_GB = 1024 * 1024 * 1024;

  console.log("============SERVER DOCTOR REPORT================");
  console.log("OS:", report.systemInfo.platform);
  console.log("Hostname:", report.systemInfo.hostname);
  console.log("Architecture:", report.systemInfo.arch);
  console.log("Uptime:", report.systemInfo.uptime);
  console.log("Memory Usage:", report.memoryInfo.memoryUsage.toFixed(2) + "%");
  console.log("CPU Model:", report.cpuInfo.cpuModel);
  console.log("Logical CPUs:", report.cpuInfo.logicalCPUs);
  console.log("Health:", report.healthStatus);

  console.log(
    "Total Memory:",
    (report.memoryInfo.totalMemory / BYTES_PER_GB).toFixed(2) + " GB",
  );

  console.log(
    "Free Memory:",
    (report.memoryInfo.freeMemory / BYTES_PER_GB).toFixed(2) + " GB",
  );

  console.log(
    "Used Memory:",
    (report.memoryInfo.usedMemory / BYTES_PER_GB).toFixed(2) + " GB",
  );
}

const healthStatus = runHealthChecks(serverDoctorReport);

const finalReport = {
  systemInfo,
  memoryInfo,
  cpuInfo,
  healthStatus,
};

printReport(finalReport);
