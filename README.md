<p align="center">
  <img src="https://raw.githubusercontent.com/MinitJain/ospect/main/assets/logo-256.png" alt="ospect logo" width="96">
</p>

# Ospect

![total downloads](https://img.shields.io/npm/dt/@minitjain/ospect)
![monthly downloads](https://img.shields.io/npm/dm/@minitjain/ospect)
![weekly downloads](https://img.shields.io/npm/dw/@minitjain/ospect)

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

**Recommendations** — what to quit when memory is high or an app is using a lot of CPU, and how much memory it would free

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
  Usage           82.63%  █████████████████████████░░░░░  13.22 GB / 16.00 GB
  Total           16.00 GB
  Free            2.78 GB

HEALTH
  Status          ● Warning
  Message         Memory usage is high
  Value           82.63%
  Top Process     Discord (PID 389, 3.2% mem)

TOP PROCESSES BY MEMORY
  PID     CPU%    MEM%    RSS         COMMAND
  ────────────────────────────────────────────────────────────────────
  389     34.1%   3.2%    519.2 MB    Discord
  43636   64.0%   2.5%    407.0 MB    OrbStack
  98936   0.1%    2.0%    325.9 MB    Visual Studio Code
  89983   26.5%   1.9%    304.6 MB    Brave Browser
  11223   1.0%    1.5%    245.7 MB    Spotify

TOP PROCESSES BY CPU
  PID     CPU%    MEM%    RSS         COMMAND
  ────────────────────────────────────────────────────────────────────
  90359   87.6%   0.1%    20.0 MB     mobileassetd
  43636   64.0%   2.5%    407.0 MB    OrbStack
  395     43.5%   0.3%    52.5 MB     WindowServer
  389     34.1%   3.2%    519.2 MB    Discord
  89983   26.5%   1.9%    304.6 MB    Brave Browser

RECOMMENDATIONS
  1. Memory is at 82.6%. Quitting Discord would free about 519 MB.
  2. OrbStack is using 64.0% CPU. Quit or restart it if you are not using it.
```

System processes (like `mobileassetd` above) are never suggested for quitting.

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
