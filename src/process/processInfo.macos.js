const { execFileSync } = require("child_process");
const path = require("path");

function getProcessName(command) {
  if (!command) {
    return "Unknown";
  }

  const appMatch = command.match(/\/([^/]+)\.app\//);

  if (appMatch) {
    return appMatch[1];
  }

  return path.basename(command);
}

// Apple's own processes; users can't (and shouldn't) quit these.
function isSystemProcess(command) {
  return (
    command === "kernel_task" ||
    /^\/(System|sbin|bin|Library\/Apple)\//.test(command) ||
    /^\/usr\/(?!local\/)/.test(command)
  );
}

function getProcessInfo() {
  const output = execFileSync(
    "ps",
    ["-ww", "-axo", "pid=,%cpu=,%mem=,rss=,comm="],
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

    // comm is the full executable path (no arguments). It must be the
    // last column: macOS ps truncates it otherwise.
    const command = parts.slice(4).join(" ");

    return {
      pid,
      command: getProcessName(command),
      system: isSystemProcess(command),
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
module.exports.getProcessName = getProcessName;
module.exports.isSystemProcess = isSystemProcess;
