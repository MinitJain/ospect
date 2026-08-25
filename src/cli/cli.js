function runCLI() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Server Doctor

Usage:
  server-doctor
  server-doctor --help

Options:
  -h, --help    Show this help message
`);
    return true;
  }

  return false;
}

module.exports = runCLI;
