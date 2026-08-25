function runHealthChecks(report) {
  const memoryUsage = report.memoryInfo.memoryUsage;

  const topMemoryProcess = report.processInfo.topMemoryProcesses[0];

  if (memoryUsage > 90) {
    return {
      status: "critical",
      message: "Memory usage is critical",
      value: memoryUsage,
      topMemoryProcess,
    };
  }

  if (memoryUsage > 80) {
    return {
      status: "warning",
      message: "Memory usage is high",
      value: memoryUsage,
      topMemoryProcess,
    };
  }

  return {
    status: "healthy",
    message: "Memory usage is healthy",
    value: memoryUsage,
    topMemoryProcess,
  };
}

module.exports = runHealthChecks;
