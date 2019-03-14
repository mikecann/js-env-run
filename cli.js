console.log("HELLOoo");

require("ts-node").register({
  //skipIgnore: true,
  compilerOptions: {
    target: "ES6",
    module: "commonjs",
    esModuleInterop: true
  }
});

require("./runme.ts");
