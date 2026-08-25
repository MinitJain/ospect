# Server Doctor Architecture

## Goal

Server Doctor is a cross platform CLI system monitoring tool.

It collects system information, analyzes resource usage,
runs health checks, and provides recommendations.

## Architecture

CLI
↓
server-doctor.js
↓
Collectors
├── System
├── Memory
├── CPU
└── Processes
↓
Health Checks
↓
Recommendations
↓
Report

## Current Modules

### System

Collects:

- OS
- Hostname
- Architecture
- Uptime

### Memory

Collects:

- Total memory
- Free memory
- Used memory
- Memory usage %

### CPU

Collects:

- CPU model
- Logical CPU count

### Process

Collects:

- PID
- Command
- CPU usage
- Memory usage
- RSS
- Top CPU processes
- Top memory processes

### Health

Analyzes collected metrics and determines:

- Healthy
- Warning
- Critical

### Recommendations

Converts health information into actionable suggestions.

### Report

Displays the final information in the CLI.

## Platform Support

Server Doctor is designed to support:

- macOS
- Linux
- Windows

Platform specific implementations will live inside:

src/platform/

We only introduce platform specific code when
the operating system actually requires different behavior.

## Design Principle

Keep the project simple.

Do not introduce abstractions, frameworks, or modules
unless they solve a real problem.

The goal is a useful, complete CLI tool, not an
over engineered monitoring platform.

## Current Data Flow

System Information
↓
Memory Information
↓
CPU Information
↓
Process Information
↓
Health Checks
↓
Recommendations
↓
CLI Report

## Future

Potential future improvements:

- CLI arguments
- Better process name detection
- Cross platform process collection
- More health checks
- Cleaner CLI output

These should only be added if they improve the actual tool.
