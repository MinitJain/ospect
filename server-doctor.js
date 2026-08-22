const os = require("os");

console.log(os.platform());
console.log(os.hostname());
console.log(os.arch());
console.log(os.uptime());

const uptime = os.uptime();

console.log(
  Math.floor(uptime / 3600) +
    " hours" +
    " " +
    Math.floor((uptime % 3600) / 60) +
    " minutes" +
    " " +
    (uptime % 60) +
    " seconds",
);
