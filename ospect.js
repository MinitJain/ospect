#!/usr/bin/env node

const getSystemInfo = require("./src/system/systemInfo");
const getMemoryInfo = require("./src/memory/memoryInfo");
const getCPUInfo = require("./src/cpu/cpuInfo");
const runHealthChecks = require("./src/health/healthChecks");
const printReport = require("./src/report/reportInfo");
const getProcessInfo = require("./src/process/processInfo");
const getRecommendations = require("./src/recommendations/recommendations");
const runCLI = require("./src/cli/cli");

const cliResult = runCLI();

if (cliResult === true) {
  process.exit(0);
}

const systemInfo = getSystemInfo();
const memoryInfo = getMemoryInfo();
const cpuInfo = getCPUInfo();
const processInfo = getProcessInfo();

const ospectReport = {
  systemInfo,
  memoryInfo,
  cpuInfo,
  processInfo,
};

const healthStatus = runHealthChecks(ospectReport);

const finalReport = {
  systemInfo,
  memoryInfo,
  cpuInfo,
  processInfo,
  healthStatus,
};

const recommendations = getRecommendations(finalReport);

const completeReport = {
  ...finalReport,
  recommendations,
};

printReport(completeReport);
