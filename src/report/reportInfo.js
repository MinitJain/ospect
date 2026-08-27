const chalk = require("chalk");

const BYTES_PER_GB = 1024 * 1024 * 1024;
const MAX_BAR_WIDTH = 30;
const MIN_BAR_WIDTH = 8;
const COMMAND_MAX_WIDTH = 32;

function pad(str, len) {
  return String(str).padEnd(len);
}

function truncate(str, maxLength) {
  const value = String(str);

  if (value.length <= maxLength) {
    return value;
  }

  if (maxLength <= 3) {
    return value.slice(0, maxLength);
  }

  return value.slice(0, maxLength - 3) + "...";
}

function terminalWidth() {
  return process.stdout.columns || 80;
}

function progressBar(percent, width) {
  const safePercent = Math.max(0, Math.min(100, percent));
  const filled = Math.round((safePercent / 100) * width);
  const empty = width - filled;

  return chalk.cyan("█".repeat(filled)) + chalk.dim("░".repeat(empty));
}

function getMemoryBarWidth(valueLength) {
  const columns = terminalWidth();

  // 2 indent + 16 label + percent + spacing + value
  const fixedWidth = 2 + 16 + 6 + 4 + valueLength;

  return Math.max(MIN_BAR_WIDTH, Math.min(MAX_BAR_WIDTH, columns - fixedWidth));
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

  console.log();
  console.log(chalk.bold.cyan("  OSPECT REPORT"));
  console.log(chalk.dim("  " + "─".repeat(Math.min(44, terminalWidth() - 2))));

  // System

  sectionHeader("SYSTEM");

  console.log("  " + chalk.dim(pad("OS", 16)) + report.systemInfo.platform);

  console.log(
    "  " + chalk.dim(pad("Hostname", 16)) + report.systemInfo.hostname,
  );

  console.log(
    "  " + chalk.dim(pad("Architecture", 16)) + report.systemInfo.arch,
  );

  console.log("  " + chalk.dim(pad("Uptime", 16)) + report.systemInfo.uptime);

  // CPU

  sectionHeader("CPU");

  console.log("  " + chalk.dim(pad("Model", 16)) + report.cpuInfo.cpuModel);

  console.log(
    "  " + chalk.dim(pad("Logical CPUs", 16)) + report.cpuInfo.logicalCPUs,
  );

  // Memory

  sectionHeader("MEMORY");

  const memPct = report.memoryInfo.memoryUsage.toFixed(2);
  const usedGB = formatBytes(report.memoryInfo.usedMemory);
  const totalGB = formatBytes(report.memoryInfo.totalMemory);
  const freeGB = formatBytes(report.memoryInfo.freeMemory);
  const memoryValue = usedGB + " / " + totalGB;

  const barWidth = getMemoryBarWidth(memoryValue.length);

  console.log(
    "  " +
      chalk.dim(pad("Usage", 16)) +
      color(memPct + "%") +
      "  " +
      progressBar(report.memoryInfo.memoryUsage, barWidth) +
      "  " +
      memoryValue,
  );

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

  console.log(
    "  " + chalk.dim(pad("Message", 16)) + report.healthStatus.message,
  );

  console.log(
    "  " +
      chalk.dim(pad("Value", 16)) +
      color(report.healthStatus.value.toFixed(2) + "%"),
  );

  const top = report.healthStatus.topMemoryProcess;

  if (top) {
    console.log(
      "  " +
        chalk.dim(pad("Top Process", 16)) +
        truncate(top.command, 32) +
        " (PID " +
        top.pid +
        ", " +
        top.memory +
        "% mem)",
    );
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
      console.log("  " + chalk.cyan(i + 1 + ".") + " " + rec);
    });
  }

  console.log();
}

function printProcessTable(processes) {
  const columns = terminalWidth();

  const fixedColumns = 8 + 8 + 8 + 12;
  const commandWidth = Math.max(
    12,
    Math.min(COMMAND_MAX_WIDTH, columns - fixedColumns - 2),
  );

  const header =
    "  " +
    chalk.bold(pad("PID", 8)) +
    chalk.bold(pad("CPU%", 8)) +
    chalk.bold(pad("MEM%", 8)) +
    chalk.bold(pad("RSS", 12)) +
    chalk.bold("COMMAND");

  console.log(header);

  console.log("  " + chalk.dim("─".repeat(fixedColumns + commandWidth)));

  processes.forEach((p) => {
    const rss =
      p.rss >= 1024 ? (p.rss / 1024).toFixed(1) + " MB" : p.rss + " KB";

    const command = truncate(p.command, commandWidth);

    console.log(
      "  " +
        pad(p.pid, 8) +
        pad(p.cpu + "%", 8) +
        pad(p.memory + "%", 8) +
        pad(rss, 12) +
        command,
    );
  });
}

module.exports = printReport;
