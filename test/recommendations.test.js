const test = require("node:test");
const assert = require("node:assert");

const getRecommendations = require("../src/recommendations/recommendations");

test("recommends action when memory usage is critical", () => {
  const report = {
    healthStatus: {
      status: "critical",
    },
    processInfo: {
      topMemoryProcesses: [],
      topCPUProcesses: [],
    },
  };

  const result = getRecommendations(report);

  assert.ok(
    result.includes(
      "Memory usage is critically high. Consider closing memory intensive applications.",
    ),
  );
});

test("recommends the process using the most memory", () => {
  const report = {
    healthStatus: {
      status: "healthy",
    },
    processInfo: {
      topMemoryProcesses: [
        {
          command: "VS Code",
          memory: 12.5,
        },
      ],
      topCPUProcesses: [],
    },
  };

  const result = getRecommendations(report);

  assert.ok(result.includes("Highest memory usage: VS Code (12.5%)."));
});

test("recommends the process using the most CPU", () => {
  const report = {
    healthStatus: {
      status: "healthy",
    },
    processInfo: {
      topMemoryProcesses: [],
      topCPUProcesses: [
        {
          command: "node",
          cpu: 45.5,
        },
      ],
    },
  };

  const result = getRecommendations(report);

  assert.ok(result.includes("Highest CPU usage: node (45.5%)."));
});
