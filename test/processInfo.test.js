const test = require("node:test");
const assert = require("node:assert");

const macos = require("../src/process/processInfo.macos");
const linux = require("../src/process/processInfo.linux");

test("macOS: names an app bundle by its .app folder", () => {
  assert.strictEqual(
    macos.getProcessName(
      "/Applications/Discord.app/Contents/Frameworks/Discord Helper (Renderer).app/Contents/MacOS/Discord Helper (Renderer)",
    ),
    "Discord",
  );
});

test("macOS: keeps folder names that contain spaces", () => {
  assert.strictEqual(
    macos.getProcessName("/System/Library/Image Capture/Support/icdd"),
    "icdd",
  );
  assert.strictEqual(
    macos.getProcessName(
      "/Users/me/Library/Application Support/BraveSoftware/Brave-Browser/updater",
    ),
    "updater",
  );
});

test("macOS: flags Apple's own processes as system", () => {
  for (const command of [
    "/System/Library/PrivateFrameworks/SkyLight.framework/Resources/WindowServer",
    "/usr/libexec/mediaanalysisd",
    "/sbin/launchd",
    "kernel_task",
  ]) {
    assert.strictEqual(macos.isSystemProcess(command), true, command);
  }
});

test("macOS: does not flag user programs as system", () => {
  for (const command of [
    "/Applications/Discord.app/Contents/MacOS/Discord",
    "/usr/local/bin/node",
    "/opt/homebrew/bin/node",
  ]) {
    assert.strictEqual(macos.isSystemProcess(command), false, command);
  }
});

test("Linux: flags kernel threads and system daemons as system", () => {
  assert.strictEqual(linux.isSystemProcess("[kworker/0:1-events]"), true);
  assert.strictEqual(linux.isSystemProcess("/usr/sbin/sshd -D"), true);
  assert.strictEqual(linux.isSystemProcess("/usr/lib/systemd/systemd-journald"), true);
  assert.strictEqual(linux.isSystemProcess("/usr/bin/node server.js"), false);
});
