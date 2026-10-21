const os = require("os");

function getCPUInfo() {
  const cpus = os.cpus();
  const cpuModel = cpus.length > 0 ? cpus[0].model : "Unknown";
  const logicalCPUs = cpus.length;

  return {
    cpuModel: cpuModel,
    logicalCPUs: logicalCPUs,
  };
}

module.exports = getCPUInfo;
