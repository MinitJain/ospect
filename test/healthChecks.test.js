const test = require("node:test");
const assert = require("node:assert");

const runHealthChecks = require("../src/health/healthChecks");

test("returns critical when memory usage is above 90%", () => {
  const report = {
    memoryInfo: {
      memoryUsage: 95,
    },
    processInfo: {
      topMemoryProcesses: [],
    },
  };

  const result = runHealthChecks(report);

  assert.strictEqual(result.status, "critical");
});

test("returns warning when memory usage is above 80%", () => {
  const report = {
    memoryInfo: {
      memoryUsage: 85,
    },
    processInfo: {
      topMemoryProcesses: [],
    },
  };

  const result = runHealthChecks(report);

  assert.strictEqual(result.status, "warning");
});

test("returns healthy when memory usage is 80% or below", () => {
  const report = {
    memoryInfo: {
      memoryUsage: 80,
    },
    processInfo: {
      topMemoryProcesses: [],
    },
  };

  const result = runHealthChecks(report);

  assert.strictEqual(result.status, "healthy");
});
