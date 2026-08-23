function printReport(report) {
  const BYTES_PER_GB = 1024 * 1024 * 1024;

  console.log("============SERVER DOCTOR REPORT================\n");

  console.log("OS:", report.systemInfo.platform);
  console.log("Hostname:", report.systemInfo.hostname);
  console.log("Architecture:", report.systemInfo.arch);
  console.log("Uptime:", report.systemInfo.uptime);

  console.log("Memory Usage:", report.memoryInfo.memoryUsage.toFixed(2) + "%");

  console.log("CPU Model:", report.cpuInfo.cpuModel);
  console.log("Logical CPUs:", report.cpuInfo.logicalCPUs + "\n");

  console.log("Health Status:", report.healthStatus.status);
  console.log("Health Message:", report.healthStatus.message);

  console.log("Health Value:", report.healthStatus.value.toFixed(2) + "%\n");

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
    (report.memoryInfo.usedMemory / BYTES_PER_GB).toFixed(2) + " GB\n",
  );
}

module.exports = printReport;
