const os = require("os");
const { execFileSync } = require("child_process");

// Parse `vm_stat` output into Activity Monitor's "Memory Used":
// app memory (anonymous - purgeable) + wired + compressed.
// os.freemem() on macOS only counts completely free pages, so cached
// and inactive memory looked "used" and usage was always ~95%+.
function parseVmStat(output) {
  const pageSizeMatch = output.match(/page size of (\d+) bytes/);

  if (!pageSizeMatch) {
    return null;
  }

  const pageSize = Number(pageSizeMatch[1]);

  function pages(label) {
    const match = output.match(new RegExp(label + ":\\s+(\\d+)"));

    return match ? Number(match[1]) : null;
  }

  const anonymous = pages("Anonymous pages");
  const purgeable = pages("Pages purgeable");
  const wired = pages("Pages wired down");
  const compressed = pages("Pages occupied by compressor");

  if ([anonymous, purgeable, wired, compressed].includes(null)) {
    return null;
  }

  return (anonymous - purgeable + wired + compressed) * pageSize;
}

function getMacUsedMemory() {
  try {
    return parseVmStat(execFileSync("vm_stat", { encoding: "utf8" }));
  } catch {
    return null;
  }
}

function getMemoryInfo() {
  const totalMemory = os.totalmem();
  let usedMemory = totalMemory - os.freemem();

  if (process.platform === "darwin") {
    const macUsedMemory = getMacUsedMemory();

    if (macUsedMemory !== null) {
      usedMemory = Math.min(macUsedMemory, totalMemory);
    }
  }

  const freeMemory = totalMemory - usedMemory;
  const memoryUsage = (usedMemory / totalMemory) * 100;

  return {
    totalMemory,
    freeMemory,
    usedMemory,
    memoryUsage,
  };
}

module.exports = getMemoryInfo;
module.exports.parseVmStat = parseVmStat;
