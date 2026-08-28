# Ospect

A terminal system report for macOS and Linux. Collects system info, memory, CPU, and process data, runs health checks, and gives recommendations.

## Install

```sh
npm install -g @minitjain/ospect
```

## Usage

```sh
ospect
```

That's it. Run `ospect` and get a full system report.

### Options

```
ospect --help       Show help
ospect --version    Show version
```

## What it checks

**System** — OS, hostname, architecture, uptime

**CPU** — model, logical core count

**Memory** — total, used, free, usage percentage with a progress bar

**Processes** — top 5 by CPU usage, top 5 by memory usage, with PID, CPU%, MEM%, and RSS

**Health** — memory status (healthy / warning / critical) based on usage thresholds:
- Below 80%: healthy
- 80–90%: warning
- Above 90%: critical

**Recommendations** — actionable suggestions based on the health status and top processes

## Example output

```
  OSPECT REPORT
  ────────────────────────────────────────────

SYSTEM
  OS              darwin
  Hostname        my-macbook.local
  Architecture    arm64
  Uptime          12 hours 34 minutes 56 seconds

CPU
  Model           Apple M4
  Logical CPUs    10

MEMORY
  Usage           62.40%  ████████████████░░░░░░░░░░░░  9.98 GB / 16.00 GB
  Total           16.00 GB
  Free            6.02 GB

HEALTH
  Status          ● Healthy
  Message         Memory usage is healthy
  Value           62.40%
  Top Process     Node (PID 12345, 3.2% mem)

TOP PROCESSES BY MEMORY
  PID     CPU%    MEM%    RSS         COMMAND
  ────────────────────────────────────────────────────────────────────
  12345   2.1%    3.2%    524.3 MB    Node
  67890   0.5%    2.8%    456.1 MB    Brave Browser
  11223   1.0%    1.5%    245.7 MB    Spotify
  44556   0.3%    1.2%    196.4 MB    Slack
  78901   0.1%    0.9%    147.2 MB    VS Code

TOP PROCESSES BY CPU
  PID     CPU%    MEM%    RSS         COMMAND
  ────────────────────────────────────────────────────────────────────
  12345   2.1%    3.2%    524.3 MB    Node
  11223   1.0%    1.5%    245.7 MB    Spotify
  67890   0.5%    2.8%    456.1 MB    Brave Browser
  44556   0.3%    1.2%    196.4 MB    Slack
  78901   0.1%    0.9%    147.2 MB    VS Code

RECOMMENDATIONS
  1. Highest memory usage: Node (3.2%).
  2. Highest CPU usage: Node (2.1%).
```

## Development

```sh
git clone https://github.com/MinitJain/ospect.git
cd ospect
npm install
node ospect.js
```

## Platform support

Ospect currently works on **macOS** and **Linux**. Process collection uses `ps` flags that are not available on Windows.

## Project status

Early stage (v0.0.x). Functional but evolving.

## License

ISC

## Repository

[github.com/MinitJain/ospect](https://github.com/MinitJain/ospect)
