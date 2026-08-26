function runCLI() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Ospect

Usage:
  ospect
  ospect --help
  ospect --version

Options:
  -h, --help       Show this help message
  -v, --version    Show version
`);

    return true;
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log("Ospect v0.0.1");
    return true;
  }

  return false;
}

module.exports = runCLI;
