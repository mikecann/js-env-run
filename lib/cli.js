"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = __importDefault(require("execa"));
const path = __importStar(require("path"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const tsEnvDir = path.join(__dirname, "..");
        const cwdDir = process.cwd();
        const envFilePath = process.argv[2];
        if (!envFilePath)
            throw new Error(`Env file path required, e.g. js-env-run ./myenv.js <my command>`);
        const importedEnv = require(path.join(cwdDir, envFilePath));
        if (!importedEnv || typeof importedEnv != "object")
            throw new Error(`Env file '${envFilePath}' must default export an object, e.g. module.exports = { MYVAR: "foo" }`);
        const env = importedEnv.default || importedEnv;
        const fullCommand = process.argv.slice(3).join(" ");
        console.log();
        console.log(chalk_1.default.green("---------------------------"));
        console.log("cmd:", chalk_1.default.cyan(fullCommand));
        console.log();
        console.log(`env from '${envFilePath}':`);
        console.log(env);
        console.log(chalk_1.default.green("---------------------------"));
        const command = process.argv[3];
        const args = process.argv.slice(4);
        try {
            console.log();
            yield execa_1.default(command, args, { stdio: "inherit", env });
            console.log("");
        }
        catch (err) {
            console.log("");
            console.log(chalk_1.default.red("---------------------------"));
            console.log("Erro Output:");
            console.log(err.toString());
            console.log(chalk_1.default.red("---------------------------"));
            console.log("");
            process.exit(1);
        }
    });
}
init();
