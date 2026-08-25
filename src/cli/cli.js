function runCLI() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Server Doctor

Usage:
  server-doctor
  server-doctor --help
  server-doctor --version

Options:
  -h, --help       Show this help message
  -v, --version    Show version
`);

    return true;
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log("Server Doctor v0.0.1");
    return true;
  }

  return false;
}

module.exports = runCLI;
