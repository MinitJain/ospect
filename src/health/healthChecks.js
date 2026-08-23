function runHealthChecks(report) {
  if (report.memoryInfo.memoryUsage > 90) {
    return {
      status: "critical",
      message: "Memory usage is critical",
      value: report.memoryInfo.memoryUsage,
    };
  }

  if (report.memoryInfo.memoryUsage > 80) {
    return {
      status: "warning",
      message: "Memory usage is high",
      value: report.memoryInfo.memoryUsage,
    };
  }

  return {
    status: "healthy",
    message: "Memory usage is healthy",
    value: report.memoryInfo.memoryUsage,
  };
}

module.exports = runHealthChecks;
