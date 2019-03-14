import chalk from "chalk";
import execa from "execa";
import * as path from "path";

async function init() {
  const tsEnvDir = path.join(__dirname, "..");
  const cwdDir = process.cwd();

  const envFilePath = process.argv[2];
  if (!envFilePath)
    throw new Error(
      `Env file path required, e.g. ts-env-cmd ./myenv.ts <my command>`
    );

  const importedEnv = require(path.join(cwdDir, envFilePath));
  if (!importedEnv || typeof importedEnv != "object")
    throw new Error(
      `Env file '${envFilePath}' must default export an object, e.g. export default { MYVAR: "foo" }`
    );

  const env = importedEnv.default || importedEnv;

  const fullCommand = process.argv.slice(3).join(" ");

  console.log();
  console.log(chalk.green("---------------------------"));
  console.log("cmd:", chalk.cyan(fullCommand));
  console.log();
  console.log(`env from '${envFilePath}':`);
  console.log(env);
  console.log(chalk.green("---------------------------"));

  const command = process.argv[3];
  const args = process.argv.slice(4);

  try {
    console.log();
    await execa(command, args, { stdio: "inherit", env });
    console.log("");
  } catch (err) {
    console.log("");
    console.log(chalk.red("---------------------------"));
    console.log("Erro Output:");
    console.log(err.toString());
    console.log(chalk.red("---------------------------"));
    console.log("");
    process.exit(1);
  }
}

init();