// CPU% above this for a single process is worth calling out.
const HIGH_CPU = 50;

function getRecommendations(report) {
  const recommendations = [];
  const { status, value } = report.healthStatus;
  // Only suggest quitting things the user can actually quit.
  const topMemoryProcess = report.processInfo.topMemoryProcesses.find(
    (p) => !p.system,
  );
  const topCPUProcess = report.processInfo.topCPUProcesses.find(
    (p) => !p.system,
  );

  if (status !== "healthy") {
    const usage = `Memory is at ${value.toFixed(1)}%.`;

    if (topMemoryProcess) {
      const freedMB = Math.round(topMemoryProcess.rss / 1024);

      recommendations.push(
        `${usage} Quitting ${topMemoryProcess.command} would free about ${freedMB} MB.`,
      );
    } else {
      recommendations.push(`${usage} Close apps you are not using.`);
    }
  }

  if (topCPUProcess && topCPUProcess.cpu >= HIGH_CPU) {
    recommendations.push(
      `${topCPUProcess.command} is using ${topCPUProcess.cpu.toFixed(1)}% CPU. Quit or restart it if you are not using it.`,
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("Nothing needs attention.");
  }

  return recommendations;
}

module.exports = getRecommendations;
