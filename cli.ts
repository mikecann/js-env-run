#!/usr/bin/env ts-node

import * as path from 'path';

type Command = (...args: string[]) => Promise<void>;

const CLIFILE = path.relative(process.cwd(), process.argv[1]);

const commandUsage = (subcmd: string, details: string) => {
  console.log(`Usage: ${CLIFILE} ${subcmd} ${details}`);
  process.exit(2);
};

const commands: { [s: string]: Command } = {
  async help() {
    usage();
  },
  async echo(...args: string[]) {
    if (args.length < 1) {
      commandUsage('echo', '<string>');
    }
    console.log(args.join(' '));
  },
};

const usage = () => {
  const commandKeys = Object.keys(commands);
  console.log(`Demo TypeScript CLI

Usage: ./${CLIFILE} ${commandKeys.join('|')}
`);
};

const key = process.argv[2];
const handler = commands[key];
if (typeof handler !== 'function') {
  usage();
  process.exit(2);
}

commands[key](...process.argv.slice(3));