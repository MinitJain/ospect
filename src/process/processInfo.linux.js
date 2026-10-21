const { execFileSync } = require("child_process");
const path = require("path");

function getProcessName(command) {
  if (!command) {
    return "Unknown";
  }

  const executable = command.split(/\s+/)[0];

  return path.basename(executable);
}

function getProcessInfo() {
  const output = execFileSync(
    "ps",
    ["-eo", "pid=,%cpu=,%mem=,rss=,args="],
    {
      encoding: "utf8",
    },
  );

  const lines = output.trim().split("\n");

  const processes = lines.map((line) => {
    const parts = line.trim().split(/\s+/);

    const pid = Number(parts[0]);
    const cpu = Number(parts[1]);
    const memory = Number(parts[2]);
    const rss = Number(parts[3]);

    // args must be the last column: macOS ps truncates it otherwise.
    const command = parts.slice(4).join(" ");

    return {
      pid,
      command: getProcessName(command),
      cpu,
      memory,
      rss,
    };
  });

  const topCPUProcesses = [...processes]
    .sort((a, b) => b.cpu - a.cpu)
    .slice(0, 5);

  const topMemoryProcesses = [...processes]
    .sort((a, b) => b.memory - a.memory)
    .slice(0, 5);

  return {
    topCPUProcesses,
    topMemoryProcesses,
  };
}

module.exports = getProcessInfo;
