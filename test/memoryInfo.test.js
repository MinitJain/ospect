const test = require("node:test");
const assert = require("node:assert");

const { parseVmStat } = require("../src/memory/memoryInfo");

const sample = `Mach Virtual Memory Statistics: (page size of 16384 bytes)
Pages free:                                    10413.
Pages active:                                 223536.
Pages inactive:                               221467.
Pages wired down:                             205066.
Pages purgeable:                                3166.
Anonymous pages:                              311258.
Pages occupied by compressor:                 346675.
`;

test("computes used memory like Activity Monitor", () => {
  const expected = (311258 - 3166 + 205066 + 346675) * 16384;

  assert.strictEqual(parseVmStat(sample), expected);
});

test("returns null when vm_stat output is missing fields", () => {
  assert.strictEqual(parseVmStat("Pages free: 10."), null);
});
