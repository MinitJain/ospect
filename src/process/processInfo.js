const { execFileSync } = require("child_process");

function getProcessInfo() {
  const output = execFileSync("ps", ["-axo", "pid,comm,%cpu,%mem,rss"], {
    encoding: "utf8",
  });

  const lines = output.trim().split("\n");

  const processes = lines.slice(1).map((line) => {
    const parts = line.trim().split(/\s+/);

    return {
      pid: Number(parts[0]),
      command: parts[1],
      cpu: Number(parts[2]),
      memory: Number(parts[3]),
      rss: Number(parts[4]),
    };
  });

  processes.sort((a, b) => b.memory - a.memory);

  return processes.slice(0, 5);
}

module.exports = getProcessInfo;
