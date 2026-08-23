const os = require("os");

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

module.exports = getMemoryInfo;
