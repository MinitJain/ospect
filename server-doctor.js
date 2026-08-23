const getSystemInfo = require("./src/system/systemInfo");
const getMemoryInfo = require("./src/memory/memoryInfo");
const getCPUInfo = require("./src/cpu/cpuInfo");
const runHealthChecks = require("./src/health/healthChecks");
const printReport = require("./src/report/reportInfo");
const getProcessInfo = require("./src/process/processInfo");

const systemInfo = getSystemInfo();
const memoryInfo = getMemoryInfo();
const cpuInfo = getCPUInfo();
const processInfo = getProcessInfo();

const serverDoctorReport = {
  systemInfo,
  memoryInfo,
  cpuInfo,
  processInfo,
};

const healthStatus = runHealthChecks(serverDoctorReport);

const finalReport = {
  systemInfo,
  memoryInfo,
  cpuInfo,
  healthStatus,
};

printReport(finalReport);
console.log(processInfo);
