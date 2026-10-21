const test = require("node:test");
const assert = require("node:assert");

const getRecommendations = require("../src/recommendations/recommendations");

function makeReport({ status = "healthy", value = 50, memory = [], cpu = [] }) {
  return {
    healthStatus: { status, value },
    processInfo: { topMemoryProcesses: memory, topCPUProcesses: cpu },
  };
}

test("suggests quitting the top memory process when memory is high", () => {
  const result = getRecommendations(
    makeReport({
      status: "warning",
      value: 82.94,
      memory: [{ command: "OrbStack", memory: 5.4, rss: 902042 }],
    }),
  );

  assert.deepStrictEqual(result, [
    "Memory is at 82.9%. Quitting OrbStack would free about 881 MB.",
  ]);
});

test("asks to close apps when memory is high and no process is known", () => {
  const result = getRecommendations(
    makeReport({ status: "critical", value: 95 }),
  );

  assert.deepStrictEqual(result, [
    "Memory is at 95.0%. Close apps you are not using.",
  ]);
});

test("calls out a process using a lot of CPU", () => {
  const result = getRecommendations(
    makeReport({ cpu: [{ command: "Discord", cpu: 64.25 }] }),
  );

  assert.deepStrictEqual(result, [
    "Discord is using 64.3% CPU. Quit or restart it if you are not using it.",
  ]);
});

test("says nothing needs attention when all is well", () => {
  const result = getRecommendations(
    makeReport({ cpu: [{ command: "node", cpu: 12 }] }),
  );

  assert.deepStrictEqual(result, ["Nothing needs attention."]);
});

test("skips system processes when suggesting what to quit", () => {
  const result = getRecommendations(
    makeReport({
      status: "warning",
      value: 85,
      memory: [
        { command: "WindowServer", rss: 500000, system: true },
        { command: "Discord", rss: 824000 },
      ],
      cpu: [
        { command: "mediaanalysisd", cpu: 90, system: true },
        { command: "OrbStack", cpu: 68.4 },
      ],
    }),
  );

  assert.deepStrictEqual(result, [
    "Memory is at 85.0%. Quitting Discord would free about 805 MB.",
    "OrbStack is using 68.4% CPU. Quit or restart it if you are not using it.",
  ]);
});
