const os = require("os");

function getCPUInfo() {
  const cpus = os.cpus();
  const cpuModel = cpus[0].model;
  const logicalCPUs = cpus.length;

  return {
    cpuModel: cpuModel,
    logicalCPUs: logicalCPUs,
  };
}

module.exports = getCPUInfo;
