#!/usr/bin/env node

console.log("HELLO");

require("ts-node").register({
  project: "tsconfig.json"
});

require("./index.ts").run();
