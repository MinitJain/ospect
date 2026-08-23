const os = require("os");

console.log(os.platform());
console.log(os.hostname());
console.log(os.arch());

const uptime = os.uptime();

console.log(
  "UPTIME:",
  Math.floor(uptime / 3600) +
    " hours" +
    " " +
    Math.floor((uptime % 3600) / 60) +
    " minutes" +
    " " +
    (uptime % 60) +
    " seconds",
);

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;
const memoryUsage = (usedMemory / totalMemory) * 100;

const BYTES_PER_KB = 1024;
const BYTES_PER_MB = 1024 * 1024;
const BYTES_PER_GB = 1024 * 1024 * 1024;

console.log(
  "Total Memory:",
  (totalMemory / BYTES_PER_GB).toFixed(2) +
    " GB, " +
    (totalMemory / BYTES_PER_MB).toFixed(2) +
    " MB, " +
    (totalMemory / BYTES_PER_KB).toFixed(2) +
    " KB",
);

console.log("Used Memory:", (usedMemory / BYTES_PER_GB).toFixed(2) + " GB");

console.log("Free Memory:", (freeMemory / BYTES_PER_GB).toFixed(2) + " GB");

console.log("Memory Usage:", memoryUsage.toFixed(2) + "%");

console.log("CPU Model:", os.cpus()[0].model);
console.log("Logical CPUs:", os.cpus().length);
