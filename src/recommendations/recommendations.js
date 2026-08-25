function getRecommendations(report) {
  const recommendations = [];

  if (report.healthStatus.status === "critical") {
    recommendations.push(
      "Memory usage is critically high. Consider closing memory intensive applications.",
    );
  }

  if (report.processInfo.topMemoryProcesses.length > 0) {
    const topMemoryProcess = report.processInfo.topMemoryProcesses[0];

    recommendations.push(
      `Highest memory usage: ${topMemoryProcess.command} (${topMemoryProcess.memory}%).`,
    );
  }

  if (report.processInfo.topCPUProcesses.length > 0) {
    const topCPUProcess = report.processInfo.topCPUProcesses[0];

    recommendations.push(
      `Highest CPU usage: ${topCPUProcess.command} (${topCPUProcess.cpu}%).`,
    );
  }

  return recommendations;
}

module.exports = getRecommendations;
