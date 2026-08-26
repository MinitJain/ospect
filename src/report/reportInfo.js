const chalk = require("chalk");

const BYTES_PER_GB = 1024 * 1024 * 1024;
const BAR_WIDTH = 30;

function pad(str, len) {
  return String(str).padEnd(len);
}

function progressBar(percent) {
  const filled = Math.round((percent / 100) * BAR_WIDTH);
  const empty = BAR_WIDTH - filled;
  return chalk.cyan("█".repeat(filled)) + chalk.dim("░".repeat(empty));
}

function healthColor(status) {
  if (status === "critical") return chalk.red;
  if (status === "warning") return chalk.yellow;
  return chalk.green;
}

function formatBytes(bytes) {
  return (bytes / BYTES_PER_GB).toFixed(2) + " GB";
}

function sectionHeader(title) {
  console.log();
  console.log(chalk.bold.underline(title));
}

function printReport(report) {
  const color = healthColor(report.healthStatus.status);

  // Title
  console.log();
  console.log(chalk.bold.cyan("  OSPECT REPORT"));
  console.log(chalk.dim("  " + "─".repeat(44)));

  // System
  sectionHeader("SYSTEM");
  console.log("  " + chalk.dim(pad("OS", 16)) + report.systemInfo.platform);
  console.log("  " + chalk.dim(pad("Hostname", 16)) + report.systemInfo.hostname);
  console.log("  " + chalk.dim(pad("Architecture", 16)) + report.systemInfo.arch);
  console.log("  " + chalk.dim(pad("Uptime", 16)) + report.systemInfo.uptime);

  // CPU
  sectionHeader("CPU");
  console.log("  " + chalk.dim(pad("Model", 16)) + report.cpuInfo.cpuModel);
  console.log("  " + chalk.dim(pad("Logical CPUs", 16)) + report.cpuInfo.logicalCPUs);

  // Memory
  sectionHeader("MEMORY");
  const memPct = report.memoryInfo.memoryUsage.toFixed(2);
  const usedGB = formatBytes(report.memoryInfo.usedMemory);
  const totalGB = formatBytes(report.memoryInfo.totalMemory);
  const freeGB = formatBytes(report.memoryInfo.freeMemory);
  console.log("  " + chalk.dim(pad("Usage", 16)) + color(memPct + "%") + "  " + progressBar(report.memoryInfo.memoryUsage) + "  " + usedGB + " / " + totalGB);
  console.log("  " + chalk.dim(pad("Total", 16)) + totalGB);
  console.log("  " + chalk.dim(pad("Free", 16)) + freeGB);

  // Health
  sectionHeader("HEALTH");
  const statusLabel =
    report.healthStatus.status === "critical"
      ? chalk.red("● Critical")
      : report.healthStatus.status === "warning"
        ? chalk.yellow("● Warning")
        : chalk.green("● Healthy");
  console.log("  " + chalk.dim(pad("Status", 16)) + statusLabel);
  console.log("  " + chalk.dim(pad("Message", 16)) + report.healthStatus.message);
  console.log("  " + chalk.dim(pad("Value", 16)) + color(report.healthStatus.value.toFixed(2) + "%"));
  const top = report.healthStatus.topMemoryProcess;
  if (top) {
    console.log("  " + chalk.dim(pad("Top Process", 16)) + top.command + " (PID " + top.pid + ", " + top.memory + "% mem)");
  }

  // Top Processes by Memory
  sectionHeader("TOP PROCESSES BY MEMORY");
  printProcessTable(report.processInfo.topMemoryProcesses);

  // Top Processes by CPU
  sectionHeader("TOP PROCESSES BY CPU");
  printProcessTable(report.processInfo.topCPUProcesses);

  // Recommendations
  sectionHeader("RECOMMENDATIONS");
  if (report.recommendations.length === 0) {
    console.log("  " + chalk.dim("No recommendations."));
  } else {
    report.recommendations.forEach((rec, i) => {
      console.log("  " + chalk.cyan((i + 1) + ".") + " " + rec);
    });
  }

  console.log();
}

function printProcessTable(processes) {
  const header =
    "  " +
    chalk.bold(pad("PID", 8)) +
    chalk.bold(pad("CPU%", 8)) +
    chalk.bold(pad("MEM%", 8)) +
    chalk.bold(pad("RSS", 12)) +
    chalk.bold("COMMAND");

  console.log(header);
  console.log("  " + chalk.dim("─".repeat(56)));

  processes.forEach((p) => {
    const rss = p.rss >= 1024 ? (p.rss / 1024).toFixed(1) + " MB" : p.rss + " KB";
    console.log(
      "  " +
        pad(p.pid, 8) +
        pad(p.cpu + "%", 8) +
        pad(p.memory + "%", 8) +
        pad(rss, 12) +
        p.command,
    );
  });
}

module.exports = printReport;
